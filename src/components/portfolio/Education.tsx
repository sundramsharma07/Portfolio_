"use client";

import { motion } from "framer-motion";

import { EDUCATION } from "@/data/portfolio";
import Reveal from "@/components/portfolio/Reveal";
import SectionHeading from "@/components/portfolio/SectionHeading";

export default function EducationSection() {
  return (
    <section
      id="education"
      className="relative py-16 sm:py-20 scroll-mt-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading kicker="Timeline" title="Education" />
        </Reveal>

        <div className="mt-10 glass-strong rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_10%_0%,rgba(34,211,238,0.14),transparent_55%),radial-gradient(700px_circle_at_100%_40%,rgba(99,102,241,0.14),transparent_55%)]" />

          <div className="relative grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="text-xs text-white/55">Current status</div>
                <div className="mt-2 text-sm font-semibold text-white/90">
                  B.Tech CSE student
                </div>
                <div className="mt-2 text-sm text-white/65 leading-relaxed">
                  Focused on building strong engineering fundamentals and recruiter-ready projects.
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative ml-6">
                <div className="absolute left-3 top-1 bottom-1 w-px bg-white/10" />
                <motion.div
                  className="absolute left-3 top-1 w-px bg-gradient-to-b from-cyan-300 via-violet-300 to-blue-300"
                  initial={{ height: 0 }}
                  whileInView={{ height: "calc(100% - 2px)" }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                />

                <ol className="space-y-7">
                  {EDUCATION.map((x, idx) => (
                    <Reveal key={x.title} delayMs={idx * 90}>
                      <li className="relative">
                        <div className="absolute -left-[15px] top-[10px] h-5 w-5 rounded-full bg-white/5 ring-1 ring-white/15 grid place-items-center">
                          <motion.span
                            className="h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_26px_rgba(34,211,238,0.45)]"
                            initial={{ scale: 0.95 }}
                            whileInView={{ scale: 1.15 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{
                              delay: idx * 0.2,
                              duration: 0.9,
                              ease: "easeOut",
                            }}
                          />
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/7 transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                            <div>
                              <div className="text-sm font-semibold text-white/92">
                                {x.title}
                              </div>
                              <div className="mt-1 text-sm text-white/65">
                                {x.subtitle}
                              </div>
                              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/45">
                                <span className="flex items-center gap-1">
                                  {x.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  {x.location}
                                </span>
                              </div>
                            </div>
                            <div className="text-sm font-semibold text-cyan-200 self-start sm:self-auto">
                              {x.meta}
                            </div>
                          </div>
                        </div>
                      </li>
                    </Reveal>
                  ))}
                </ol>

                {/* Static sketch decoration for a study vibe (no infinite animation) */}
                <div className="absolute -right-6 -bottom-10 w-40 h-40 opacity-70 pointer-events-none">
                  <svg
                    viewBox="0 0 200 200"
                    width="160"
                    height="160"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M35 140C55 110 85 98 110 100C140 102 160 120 170 140"
                      stroke="rgba(34,211,238,0.25)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M55 95L70 65C78 50 92 46 105 52L135 65"
                      stroke="rgba(99,102,241,0.25)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M70 60H130"
                      stroke="rgba(168,85,247,0.22)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M60 145V175"
                      stroke="rgba(99,102,241,0.22)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <path
                      d="M140 145V175"
                      stroke="rgba(99,102,241,0.22)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

