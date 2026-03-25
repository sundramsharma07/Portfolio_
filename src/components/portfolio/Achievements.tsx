"use client";

import { motion } from "framer-motion";

import { ACHIEVEMENTS } from "@/data/portfolio";
import Reveal from "@/components/portfolio/Reveal";
import SectionHeading from "@/components/portfolio/SectionHeading";
import AnimatedCounter from "@/components/portfolio/AnimatedCounter";

export default function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="relative py-16 sm:py-20 scroll-mt-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading kicker="Impact" title="Achievements" />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {ACHIEVEMENTS.map((a, idx) => {
            const suffix = a.suffix ?? "+";
            return (
              <Reveal key={a.label} delayMs={idx * 90}>
                <motion.div
                  className="glass-strong rounded-[2.2rem] p-6 sm:p-7 relative overflow-hidden"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_0%,rgba(34,211,238,0.14),transparent_55%),radial-gradient(650px_circle_at_100%_40%,rgba(99,102,241,0.14),transparent_55%)]" />
                  <div className="relative">
                    <div className="text-xs font-semibold text-white/60">
                      {idx === 0 ? "Coding" : idx === 1 ? "Rating" : "Practice"}
                    </div>
                    <div className="mt-2">
                      <AnimatedCounter value={a.value} suffix={suffix} />
                    </div>
                    <div className="mt-3 text-sm text-white/65 leading-relaxed">
                      {a.label}
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        <motion.div
          className="mt-10 rounded-3xl glass-strong p-6 sm:p-7 relative overflow-hidden"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(1100px_circle_at_0%_0%,rgba(34,211,238,0.16),transparent_55%),radial-gradient(900px_circle_at_100%_30%,rgba(168,85,247,0.15),transparent_55%)]" />
          <div className="relative">
            <div className="text-sm font-semibold text-white/90">
              Consistency over shortcuts
            </div>
            <div className="mt-2 text-sm text-white/65 leading-relaxed max-w-2xl">
              Recruiters love measurable skills—my training focuses on writing clear solutions, optimizing for edge cases, and communicating trade-offs.
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Clean Code", "Complexity", "Test Cases", "Speed + Accuracy"].map(
                (x) => (
                  <span
                    key={x}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80"
                  >
                    {x}
                  </span>
                ),
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

