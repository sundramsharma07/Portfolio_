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
    const count = (reducedMotion || isTouch) ? 4 : 15;
    return Array.from({ length: count }).map((_, i) => ({
      i,
      x: rnd() * 100,
      y: rnd() * 100,
      size: 0.8 + rnd() * 1.2,
      dur: 3 + rnd() * 6,
      delay: rnd() * 5,
      opacity: 0.15 + rnd() * 0.4,
    }));
  }, [reducedMotion, isTouch]);

  const meteors = useMemo(() => {
    const rnd = mulberry32(42);
    const count = (reducedMotion || isTouch) ? 0 : 3;
    return Array.from({ length: count }).map((_, i) => ({
      i,
      left: 10 + rnd() * 80,
      delay: rnd() * 10,
      dur: 2 + rnd() * 4,
    }));
  }, [reducedMotion, isTouch]);

  useEffect(() => {
    if (reducedMotion || isTouch) return;

    let raf = 0;
    let lx = 0, ly = 0;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    const onMove = (e: MouseEvent) => {
      lx = e.clientX; ly = e.clientY;
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        mx.set((lx - cx) / cx);
        my.set((ly - cy) / cy);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [mx, my, reducedMotion, isTouch]);

  return (
    <div className="pointer-events-none absolute inset-0 -z-[1] overflow-hidden" style={{ contain: "paint" }}>
      <div className="absolute inset-0 star-overlay star-overlay-anim" style={{ willChange: "transform" }} />

      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(1000px 600px at 50% 15%, black 30%, transparent 80%)",
        }}
      />

      <div className="absolute inset-0 opacity-60">
        <div className="absolute -left-20 top-10 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.2),transparent_60%)] blur-3xl opacity-50" />
        <div className="absolute right-0 top-40 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.18),transparent_60%)] blur-3xl opacity-50" />
      </div>

      <motion.div
        className="absolute left-[-10%] top-[12%] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.2),transparent_62%)] blur-3xl"
        style={{ x: blob1X, y: blob1Y, willChange: "transform" }}
      />

      <motion.div
        className="absolute right-[-12%] top-[55%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.16),transparent_60%)] blur-3xl"
        style={{ x: blob2X, y: blob2Y, willChange: "transform" }}
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
            willChange: "transform, opacity"
          }}
          animate={reducedMotion ? undefined : {
            opacity: [p.opacity * 0.4, p.opacity, p.opacity * 0.4],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear", // Linear is cheaper than easeInOut
          }}
        />
      ))}

      {meteors.map((m) => (
        <motion.div
          key={`meteor-${m.i}`}
          className="absolute h-0.5 w-0.5 rotate-[215deg] bg-gradient-to-r from-cyan-400/60 to-transparent"
          style={{
            left: `${m.left}%`,
            top: "-10%",
            width: "1.5px",
            height: "100px",
            willChange: "transform"
          }}
          animate={{
            transform: ["translate3d(0, 0, 0)", "translate3d(-400px, 800px, 0)"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: m.dur,
            repeat: Infinity,
            delay: m.delay,
            repeatDelay: 12 + Math.random() * 15,
            ease: "linear",
          }}
        />
      ))}

      {/* Optimized Backround Nebula - Use CSS Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute -top-[5%] -left-[5%] h-[40svh] w-[40svw] rounded-full bg-cyan-400/20 blur-[100px] animate-blob-pulse" 
          style={{ animationDelay: "0s" }}
        />
        <div 
          className="absolute -top-[5%] -right-[5%] h-[40svh] w-[40svw] rounded-full bg-purple-500/18 blur-[100px] animate-blob-pulse" 
          style={{ animationDelay: "-4s" }}
        />
        <div 
          className="absolute -bottom-[5%] -left-[5%] h-[40svh] w-[40svw] rounded-full bg-indigo-500/18 blur-[100px] animate-blob-pulse" 
          style={{ animationDelay: "-8s" }}
        />
        <div 
          className="absolute -bottom-[5%] -right-[5%] h-[40svh] w-[40svw] rounded-full bg-blue-500/20 blur-[100px] animate-blob-pulse" 
          style={{ animationDelay: "-12s" }}
        />
      </div>
    </div>
  );
}

