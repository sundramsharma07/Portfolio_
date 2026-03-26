"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink } from "lucide-react";

import { cn } from "@/lib/cn";

export default function ProjectCard({
  title,
  description,
  stack,
  onOpen,
  index,
}: {
  title: string;
  description: string;
  stack: string[];
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className={cn(
        "group relative text-left rounded-[2.4rem] overflow-hidden border border-white/10 glass",
        "shadow-sm hover:shadow-2xl transition-all duration-500",
      )}
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      whileHover={{ scale: 1.015, boxShadow: "0 0 50px rgba(34,211,238,0.14)" }}
      whileTap={{ scale: 0.995 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <span
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_60%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.12),transparent_55%)]"
        aria-hidden
      />

      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-hidden
      >
        <span className="absolute -left-20 top-0 h-28 w-28 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.35),transparent_60%)] blur-xl" />
        <span className="absolute -bottom-20 right-0 h-28 w-28 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.25),transparent_60%)] blur-xl" />
      </span>

      <span
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        aria-hidden
      >
        <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.18)_35%,transparent_70%)] translate-x-[-130%] group-hover:translate-x-[130%] transition-transform duration-700 rotate-6" />
      </span>

      <span className="relative block p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-semibold tracking-wide text-white/60">
              0{index + 1}
            </div>
            <div className="mt-2 text-lg sm:text-xl font-semibold text-white/95">
              {title}
            </div>
          </div>
          <div className="mt-1 h-10 w-10 rounded-2xl border border-white/10 bg-white/5 grid place-items-center ring-glow group-hover:bg-cyan-500/15 transition-all duration-300">
            <Code2 size={18} className="text-cyan-200 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        <div className="mt-3 text-sm leading-relaxed text-white/65">
          {description}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {stack.map((t) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + 0.04 * stack.indexOf(t) }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(34,211,238,0.1)" }}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold text-white/70 tracking-wider uppercase"
            >
              {t}
            </motion.span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs font-semibold text-cyan-200/80">
            Click to expand
          </span>
          <motion.span
            className="text-xs font-bold text-cyan-200 inline-flex items-center gap-1.5"
            whileHover={{ x: 5 }}
          >
            Details <ExternalLink size={12} />
          </motion.span>
        </div>
      </span>
    </motion.button>
  );
}

