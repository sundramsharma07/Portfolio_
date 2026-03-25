"use client";

import { motion } from "framer-motion";

import { TRAINING_STEPS } from "@/data/portfolio";
import SectionHeading from "@/components/portfolio/SectionHeading";
import Reveal from "@/components/portfolio/Reveal";

export default function TrainingSection() {
  return (
    <section
      id="training"
      className="relative py-16 sm:py-20 scroll-mt-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading kicker="Growth" title="Training Timeline" />
        </Reveal>

        <div className="mt-10 glass-strong rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(850px_circle_at_10%_0%,rgba(34,211,238,0.14),transparent_55%),radial-gradient(700px_circle_at_100%_40%,rgba(99,102,241,0.14),transparent_55%)]" />

          <div className="relative grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <div className="text-sm font-semibold text-white/90">
                What shaped my problem-solving
              </div>
              <div className="mt-2 text-sm text-white/65 leading-relaxed">
                A steady training loop: study patterns, solve problems, and iterate until solutions become instinct.
              </div>

              <div className="mt-7 relative">
                <div className="absolute left-3 top-1 bottom-1 w-px bg-white/10" />
                <motion.div
                  className="absolute left-3 top-1 w-px bg-gradient-to-b from-cyan-300 via-violet-300 to-blue-300"
                  initial={{ height: 0 }}
                  whileInView={{ height: "calc(100% - 2px)" }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                />

                <ol className="space-y-7 ml-6">
                  {TRAINING_STEPS.map((step, idx) => (
                    <motion.li
                      key={step.title}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.6, delay: idx * 0.08 }}
                      className="relative"
                    >
                      <div className="absolute -left-[15px] top-[7px] h-5 w-5 rounded-full bg-white/5 ring-1 ring-white/15 grid place-items-center">
                        <motion.span
                          className="h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_26px_rgba(34,211,238,0.45)]"
                          animate={{ scale: [0.9, 1.2, 0.95] }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            delay: idx * 0.2,
                            ease: "easeInOut",
                          }}
                        />
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/7 transition-colors">
                        <div className="text-sm font-semibold text-white/92">
                          {step.title}
                        </div>
                        <div className="mt-2 text-sm text-white/65 leading-relaxed">
                          {step.detail}
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="text-xs text-white/55">Focus areas</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Complexity", "Patterns", "Data Structures", "Optimization"].map(
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

                <motion.div
                  className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-white/90">
                      Training style
                    </div>
                    <div className="text-xs font-semibold text-cyan-200">
                      Iterative
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-white/65 leading-relaxed">
                    Learn → implement → test → refine. Repeat until it’s clean and fast.
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

