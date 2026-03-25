"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [mode, setMode] = useState<"normal" | "magnify">("normal");
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 520, damping: 34 });
  const sy = useSpring(y, { stiffness: 520, damping: 34 });
  const transform = useMotionTemplate`translate3d(${sx}px, ${sy}px, 0) translate(-50%, -50%)`;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("cursor-none");

    const onCursorMode = (e: Event) => {
      const ce = e as CustomEvent<string>;
      const next = ce.detail === "magnify" ? "magnify" : "normal";
      setMode(next);
    };
    window.addEventListener("cursor-mode", onCursorMode as EventListener);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener(
        "cursor-mode",
        onCursorMode as EventListener,
      );
      root.classList.remove("cursor-none");
      window.removeEventListener("mousemove", onMove);
    };
  }, [x, y]);

  if (reducedMotion) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] h-12 w-12 rounded-full border border-cyan-200/40"
        style={{ transform }}
        animate={reducedMotion ? undefined : mode === "magnify" ? { scale: 1.12 } : { scale: 1 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[201] h-4 w-4 rounded-full bg-cyan-200/55 blur-[0.2px]"
        style={{ transform }}
        animate={reducedMotion ? undefined : mode === "magnify" ? { scale: 0.85 } : { scale: 1 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[199] h-16 w-16 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.16),transparent_60%)] blur-[0.4px]"
        style={{ transform }}
        animate={reducedMotion ? undefined : mode === "magnify" ? { opacity: 1, scale: 1.05 } : { opacity: 0.9, scale: 1 }}
      />

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[202] h-14 w-14 rounded-full flex items-center justify-center"
        style={{ transform }}
        initial={false}
        animate={
          reducedMotion
            ? { opacity: 0 }
            : mode === "magnify"
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.9 }
        }
        transition={{ duration: 0.15 }}
      >
        <svg
          viewBox="0 0 64 64"
          width="34"
          height="34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="28"
            cy="28"
            r="16"
            stroke="rgba(34,211,238,0.85)"
            strokeWidth="3"
          />
          <path
            d="M42 42 L56 56"
            stroke="rgba(99,102,241,0.75)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle
            cx="28"
            cy="28"
            r="7"
            stroke="rgba(168,85,247,0.55)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.9"
          />
        </svg>
      </motion.div>
    </>
  );
}

