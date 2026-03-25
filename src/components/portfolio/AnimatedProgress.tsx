"use client";

import { motion } from "framer-motion";

export default function AnimatedProgress({
  value,
}: {
  value: number; // 0..100
}) {
  return (
    <div className="h-2 w-full rounded-full bg-white/5 border border-white/10 overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-violet-300 to-blue-300"
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </div>
  );
}

