"use client";

import { useEffect, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function AnimatedBackground() {
  const reducedMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sMx = useSpring(mx, { stiffness: 150, damping: 20, mass: 0.35 });
  const sMy = useSpring(my, { stiffness: 150, damping: 20, mass: 0.35 });

  const blob1X = useTransform(sMx, (v) => v * 14);
  const blob1Y = useTransform(sMy, (v) => v * 10);
  const blob2X = useTransform(sMx, (v) => v * -18);
  const blob2Y = useTransform(sMy, (v) => v * -12);

  const particles = useMemo(() => {
    const rnd = mulberry32(1337);
    const count = reducedMotion ? 5 : 6;
    return Array.from({ length: count }).map((_, i) => {
      const x = rnd() * 100;
      const y = rnd() * 100;
      const size = 2 + rnd() * 3.2;
      const dur = 9 + rnd() * 8;
      const delay = rnd() * 2;
      const opacity = 0.3 + rnd() * 0.4;
      return { i, x, y, size, dur, delay, opacity };
    });
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    let raf = 0;
    let lx = 0;
    let ly = 0;

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    const onMove = (e: MouseEvent) => {
      lx = e.clientX;
      ly = e.clientY;
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const nx = (lx - cx) / cx; // [-1..1]
        const ny = (ly - cy) / cy;
        mx.set(nx);
        my.set(ny);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [mx, my, reducedMotion]);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 star-overlay star-overlay-anim" />

      <div
        className="absolute inset-0 opacity-55"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage:
            "radial-gradient(900px 500px at 50% 15%, black 40%, transparent 70%)",
        }}
      />

      <div className="absolute inset-0 opacity-70">
        <div className="absolute -left-20 top-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25),transparent_60%)] blur-2xl" />
        <div className="absolute right-0 top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.22),transparent_60%)] blur-2xl" />
      </div>

      <motion.div
        className="absolute left-[-10%] top-[12%] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.22),transparent_62%)] blur-3xl ring-glow"
        style={{ x: blob1X, y: blob1Y }}
        animate={reducedMotion ? undefined : { opacity: [0.85, 1, 0.85] }}
        transition={
          reducedMotion
            ? undefined
            : { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <motion.div
        className="absolute right-[-12%] top-[55%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_60%)] blur-3xl ring-glow"
        style={{ x: blob2X, y: blob2Y }}
        animate={reducedMotion ? undefined : { opacity: [0.8, 1, 0.8] }}
        transition={
          reducedMotion
            ? undefined
            : { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {particles.map((p) => (
        <motion.div
          key={p.i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(34,211,238,0.55) 45%, rgba(99,102,241,0.0) 70%)",
            opacity: p.opacity,
            filter: "blur(0.2px)",
          }}
          animate={{
            opacity: reducedMotion
              ? p.opacity
              : [p.opacity * 0.65, Math.min(1, p.opacity + 0.18), p.opacity * 0.65],
          }}
          transition={
            reducedMotion
              ? undefined
              : {
                  duration: p.dur,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "easeInOut",
                }
          }
        />
      ))}

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.14),transparent_60%)]"
        animate={
          reducedMotion ? undefined : { opacity: [0.35, 0.65, 0.35] }
        }
        transition={
          reducedMotion ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }
      />
    </div>
  );
}

