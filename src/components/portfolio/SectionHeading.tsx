"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/cn";

export default function SectionHeading({
  kicker,
  title,
  children,
  className,
}: {
  kicker?: ReactNode;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {kicker ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="mb-3 text-sm tracking-wide text-cyan-300/80"
        >
          {kicker}
        </motion.div>
      ) : null}

      <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">
        <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-blue-300 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      {children ? <div className="mt-3 text-white/70">{children}</div> : null}

      <div className="pointer-events-none absolute -bottom-3 left-0 h-[2px] w-24 bg-gradient-to-r from-cyan-300/0 via-cyan-300/70 to-violet-300/0 blur-[0.2px]" />
    </div>
  );
}

