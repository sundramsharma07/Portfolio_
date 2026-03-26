"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<"default" | "magnify">("default");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 10);
      mouseY.set(e.clientY - 10);

      // Check if hovering over a button or link
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest('[role="button"]')
      ) {
        setMode("magnify");
      } else {
        setMode("default");
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted || reducedMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[100] hidden lg:block"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      <motion.div
        className="h-5 w-5 rounded-full border-2 border-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
        animate={reducedMotion ? undefined : mode === "magnify" ? { opacity: 1, scale: 1.05 } : { opacity: 0.9, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0 m-auto h-1 w-1 rounded-full bg-cyan-400" />
      </motion.div>
    </motion.div>
  );
}
