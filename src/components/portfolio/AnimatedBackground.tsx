"use client";

import { useEffect, useMemo, useState } from "react";
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
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const sMx = useSpring(mx, { stiffness: 150, damping: 20, mass: 0.35 });
  const sMy = useSpring(my, { stiffness: 150, damping: 20, mass: 0.35 });

  const blob1X = useTransform(sMx, (v) => v * 14);
  const blob1Y = useTransform(sMy, (v) => v * 10);
  const blob2X = useTransform(sMx, (v) => v * -18);
  const blob2Y = useTransform(sMy, (v) => v * -12);

  const particles = useMemo(() => {
    const rnd = mulberry32(1337);
    const count = (reducedMotion || isTouch) ? 10 : 40;
    return Array.from({ length: count }).map((_, i) => ({
      i,
      x: rnd() * 100,
      y: rnd() * 100,
      size: 0.5 + rnd() * 1.5,
      dur: 2 + rnd() * 4,
      delay: rnd() * 5,
      opacity: 0.2 + rnd() * 0.5,
    }));
  }, [reducedMotion]);

  const meteors = useMemo(() => {
    const rnd = mulberry32(42);
    const count = (reducedMotion || isTouch) ? 2 : 6;
    return Array.from({ length: count }).map((_, i) => ({
      i,
      left: 10 + rnd() * 80,
      delay: rnd() * 10,
      dur: 2 + rnd() * 4,
    }));
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || isTouch) return;

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
  }, [mx, my, reducedMotion, isTouch]);

  return (
    <div className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden">
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
          key={`star-${p.i}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={reducedMotion ? undefined : {
            opacity: [p.opacity * 0.3, p.opacity, p.opacity * 0.3],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {meteors.map((m) => (
        <motion.div
          key={`meteor-${m.i}`}
          className="absolute h-0.5 w-0.5 rotate-[215deg] bg-gradient-to-r from-cyan-400 to-transparent shadow-[0_0_0_1px_rgba(34,211,238,0.1)]"
          style={{
            left: `${m.left}%`,
            top: "-10%",
            width: "1.5px",
            height: "120px",
          }}
          animate={{
            transform: ["translate3d(0, 0, 0)", "translate3d(-400px, 800px, 0)"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: m.dur,
            repeat: Infinity,
            delay: m.delay,
            repeatDelay: 8 + Math.random() * 12,
            ease: "linear",
          }}
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

      {/* Corner Animations - Extreme Fixed Nebula Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          className="absolute -top-[5%] -left-[5%] h-[40svh] w-[40svw] rounded-full bg-cyan-400/40 blur-[80px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -top-[5%] -right-[5%] h-[40svh] w-[40svw] rounded-full bg-purple-500/35 blur-[80px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-[5%] -left-[5%] h-[40svh] w-[40svw] rounded-full bg-indigo-500/35 blur-[80px]"
          animate={{
            scale: [1.1, 1.3, 1.1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-[5%] -right-[5%] h-[40svh] w-[40svw] rounded-full bg-blue-500/40 blur-[80px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

