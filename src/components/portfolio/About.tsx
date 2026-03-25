"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { ABOUT_TEXT } from "@/data/portfolio";
import SectionHeading from "@/components/portfolio/SectionHeading";
import Reveal from "@/components/portfolio/Reveal";

export default function About() {
  const reducedMotion = useReducedMotion();
  const [magnify, setMagnify] = useState(false);
  const typingText =
    "Driven by quality and impact: coding clean component architecture, building secure backend flows, and crafting interactive UX that users love.";
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!magnify || reducedMotion) {
      return;
    }

    let i = 0;
    let t = 0;
    const tick = () => {
      i += 1;
      setTyped(typingText.slice(0, i));
      if (i < typingText.length) {
        t = window.setTimeout(tick, 18);
      }
    };
    t = window.setTimeout(tick, 250);
    return () => window.clearTimeout(t);
  }, [magnify, reducedMotion, typingText]);

  return (
    <section
      id="about"
      className="relative py-16 sm:py-20 scroll-mt-28"
      onPointerEnter={() => {
        setMagnify(true);
        setTyped("");
        window.dispatchEvent(
          new CustomEvent("cursor-mode", { detail: "magnify" }),
        );
      }}
      onPointerLeave={() => {
        setMagnify(false);
        setTyped("");
        window.dispatchEvent(
          new CustomEvent("cursor-mode", { detail: "normal" }),
        );
      }}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading kicker="Profile" title="About Me" />
        </Reveal>

        <Reveal delayMs={80}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="mt-4"
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-violet-300 to-blue-300">
              Sundram Kumar
            </h2>
            <p className="mt-2 text-sm font-medium text-white/70">Available for internship • Presentation-ready portfolio</p>
          </motion.div>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="glass-strong rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_0%_20%,rgba(34,211,238,0.18),transparent_55%),radial-gradient(700px_circle_at_90%_0%,rgba(99,102,241,0.16),transparent_55%)]" />
              <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.26),transparent_62%)] blur-2xl ring-glow" />
              <div className="absolute -right-20 -bottom-24 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.20),transparent_62%)] blur-2xl" />
              <div className="relative">
                <div className="relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/75 overflow-hidden">
                  <span className="h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.6)]" />
                  Always improving. Always shipping.
                  <motion.span
                    className="absolute inset-0 opacity-0"
                    style={{
                      background:
                        "linear-gradient(120deg, transparent 0%, rgba(34,211,238,0.22) 45%, transparent 70%)",
                    }}
                    animate={
                      reducedMotion ? undefined : { x: ["-120%", "120%"] }
                    }
                    transition={{
                      duration: 1.6,
                      repeat: 0,
                      ease: "easeOut",
                    }}
                  />
                </div>

                <motion.p
                  className="text-white/72 leading-relaxed text-sm sm:text-base"
                  animate={
                    reducedMotion
                      ? undefined
                      : { scale: magnify ? 1.02 : 1, filter: magnify ? "drop-shadow(0 0 18px rgba(34,211,238,0.28))" : "none" }
                  }
                  transition={{ duration: 0.18 }}
                >
                  {ABOUT_TEXT}
                </motion.p>

                <motion.div
                  initial={false}
                  animate={
                    reducedMotion ? undefined : { opacity: magnify ? 1 : 0 }
                  }
                  className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 overflow-hidden"
                >
                  <div className="text-xs text-white/55 font-semibold">
                    Writing effect
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-white/85">
                    <span className="whitespace-pre-wrap leading-relaxed">
                      {typed}
                    </span>
                    <span
                      aria-hidden
                      className="inline-block h-4 w-[2px] rounded bg-cyan-200 animate-pulse"
                      style={{ opacity: magnify ? 1 : 0 }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-6 grid grid-cols-2 gap-4"
                >
                  {[
                    { label: "Focus", value: "Full-Stack + AI" },
                    { label: "Strength", value: "Problem Solving" },
                    { label: "Approach", value: "Clean & Secure" },
                    { label: "Style", value: "Premium UX" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/7 transition-colors"
                    >
                      <div className="text-xs text-white/55">{item.label}</div>
                      <div className="mt-1 text-sm font-semibold text-white/90">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </motion.div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Web Development",
                    "Backend Systems",
                    "AI-integrated Apps",
                    "Secure Design",
                  ].map((chip, idx) => (
                    <motion.span
                      key={chip}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.55, delay: idx * 0.05 }}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/7 transition-colors"
                      whileHover={
                        reducedMotion
                          ? undefined
                          : { y: -2, boxShadow: "0 0 40px rgba(34,211,238,0.16)" }
                      }
                    >
                      {chip}
                    </motion.span>
                  ))}
                </div>

                {/* Removed decorative SVG for stability; writing effect appears on hover instead */}
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delayMs={120}>
            <div className="rounded-3xl glass-strong p-6 sm:p-7">
              <div className="text-xs font-semibold tracking-wide text-white/60">
                What I enjoy building
              </div>
              <div className="mt-4 space-y-3">
                {[
                  {
                    title: "Practical apps",
                    desc: "Tools and systems that solve real problems end-to-end.",
                  },
                  {
                    title: "Backend reliability",
                    desc: "APIs, databases, and secure flows with clear boundaries.",
                  },
                  {
                    title: "AI-integrated workflows",
                    desc: "OCR, enhancement pipelines, and model-powered features.",
                  },
                ].map((x, idx) => (
                  <motion.div
                    key={x.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55, delay: idx * 0.08 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/7 transition-colors"
                  >
                    <div className="text-sm font-semibold text-white/90">
                      {x.title}
                    </div>
                    <div className="mt-1 text-sm text-white/60 leading-relaxed">
                      {x.desc}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs text-white/55">Now</div>
                <div className="mt-1 text-sm font-semibold text-cyan-200">
                  Building recruiter-ready UI with Framer Motion
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

