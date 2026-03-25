"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /**
   * When `once` is true, the element animates only the first time it enters view.
   */
  once?: boolean;
  /**
   * How much of the element must be visible before it reveals.
   */
  amount?: number;
  delayMs?: number;
};

export default function Reveal({
  children,
  className,
  once = true,
  amount = 0.18,
  delayMs = 0,
}: RevealProps) {
  return (
    <motion.div
      className={cn(className, "will-change-auto")}
      initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, amount }}
      transition={{
        duration: 0.65,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: delayMs / 1000,
      }}
    >
      {children}
    </motion.div>
  );
}

