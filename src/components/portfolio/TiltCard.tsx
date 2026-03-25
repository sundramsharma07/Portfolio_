"use client";

import { PropsWithChildren, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { cn } from "@/lib/cn";

export default function TiltCard({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sRx = useSpring(rx, { stiffness: 260, damping: 18 });
  const sRy = useSpring(ry, { stiffness: 260, damping: 18 });
  const rotateX = useTransform(sRx, (v) => `${v}deg`);
  const rotateY = useTransform(sRy, (v) => `${v}deg`);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const dx = px - 0.5;
    const dy = py - 0.5;
    const max = 10;
    ry.set(dx * max);
    rx.set(-dy * max);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ perspective: 900 }}
      className={cn("relative will-change-transform", className)}
      animate={{}}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
        }}
        className="relative"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

