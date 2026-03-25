"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ExternalLink } from "lucide-react";

import { HERO_STRINGS, SOCIAL_LINKS } from "@/data/portfolio";
import useTypewriter from "@/hooks/useTypewriter";
import { cn } from "@/lib/cn";

function splitLetters(text: string) {
  return text.split("").map((ch, idx) => ({ ch, idx }));
}

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const typed = useTypewriter({ words: [...HERO_STRINGS], typingMs: 28, deletingMs: 16, pauseMs: 820 });

  // Typewriter for name – types once and stops (no deletion)
  const nameTyped = useTypewriter({
    words: ["Sundram Kumar"],
    typingMs: 60,
    deletingMs: 0,
    pauseMs: 0,
  });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sMx = useSpring(mx, { stiffness: 160, damping: 18, mass: 0.3 });
  const sMy = useSpring(my, { stiffness: 160, damping: 18, mass: 0.3 });

  const parX = useTransform(sMx, (v) => v * 10);
  const parY = useTransform(sMy, (v) => v * 6);

  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set((e.clientX - cx) / cx);
      my.set((e.clientY - cy) / cy);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reducedMotion]);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      className="relative pt-20 pb-10 sm:pt-24 sm:pb-14"
      aria-label="Hero"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/75">
                <span className="inline-block h-2 w-2 rounded-full bg-yellow-300 shadow-[0_0_18px_rgba(255,215,0,0.65)]" />
                Available for Internships
              </div>

              {/* Name with large cursive font and typing effect – no extra space */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="mt-0"
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                  <span
                    className="bg-gradient-to-r from-pink-200 via-orange-200 to-purple-200 bg-clip-text text-transparent"
                    style={{ fontFamily: "'Dancing Script', cursive" }}
                  >
                    {nameTyped}
                  </span>
                  <motion.span
                    className="inline-block h-8 w-[3px] bg-gradient-to-b from-pink-300 to-orange-300 align-middle animate-pulse ml-1"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
                <span className="block bg-gradient-to-r from-pink-200 via-orange-200 to-purple-200 bg-clip-text text-transparent drop-shadow-[0_0_22px_rgba(255,20,147,0.18)]">
                  {splitLetters("Sundram Kumar").map(({ ch, idx }) => (
                    <motion.span
                      key={`${ch}-${idx}`}
                      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.45, delay: idx * 0.01 }}
                      className={cn(
                        ch === " " ? "w-4 inline-block" : "inline-block",
                      )}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </span>
              </h1>

              <div className="mt-4 text-base sm:text-lg text-white/70">
                <span className="text-white/80">I craft</span>{" "}
                <span className="relative inline-block font-semibold text-transparent bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text">
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                  >
                    {typed}
                  </motion.span>
                  <span className="ml-1 inline-block h-5 w-[2px] bg-gradient-to-b from-pink-300 to-orange-300 align-middle animate-pulse" />
                </span>{" "}
                <span className="text-white/60">that empower users and businesses alike.</span>
              </div>

              <p className="mt-5 max-w-xl text-sm sm:text-base text-white/60 leading-relaxed">
                Passionate Computer Science student crafting innovative full-stack solutions, integrating AI for smarter applications, and building secure, scalable systems that drive real-world impact.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <motion.button
                  whileHover={{ y: -3, boxShadow: "0 0 45px rgba(255,20,147,0.22)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToId("projects")}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition-all hover:bg-white/10"
                >
                  <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,20,147,0.18)_45%,transparent_70%)] translate-x-[-120%] hover:translate-x-[120%] transition-transform duration-700" />
                  View Projects
                </motion.button>

                <motion.button
                  whileHover={{ y: -3, boxShadow: "0 0 45px rgba(255,69,0,0.25)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToId("contact")}
                  className="rounded-2xl bg-gradient-to-r from-pink-400 via-orange-400 to-purple-400 px-5 py-3 text-sm font-semibold text-black transition-all hover:-translate-y-0.5"
                >
                  Contact Me
                </motion.button>

                <motion.a
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 transition-all hover:bg-white/10 flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  GitHub
                </motion.a>

                {/* LinkedIn button with your exact URL */}
                <motion.a
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://www.linkedin.com/in/sundaram-sharma-108a1b297/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 transition-all hover:bg-white/10 flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  LinkedIn
                </motion.a>

                <motion.a
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://drive.google.com/uc?export=download&id=1jEJWUePewgBO3dtvGOqcFwFdIfeYb8KG"
                  download
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 transition-all hover:bg-white/10"
                >
                  Download Resume
                </motion.a>
              </div>

              <div className="mt-8 flex items-center gap-5 text-xs text-white/55">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_18px_rgba(255,20,147,0.65)]" />
                  Frontend + Backend
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_18px_rgba(157,78,221,0.55)]" />
                  AI-integrated workflows
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div
              className="absolute -inset-8 rounded-[3rem] bg-[radial-gradient(circle_at_top,rgba(255,20,147,0.18),transparent_60%),radial-gradient(circle_at_bottom,rgba(157,78,221,0.16),transparent_55%)] blur-[1px]"
              style={{
                transformStyle: "preserve-3d",
                x: reducedMotion ? 0 : parX,
                y: reducedMotion ? 0 : parY,
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.25 }}
              className="glass-strong relative overflow-hidden rounded-[2.3rem] p-0 group"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src="/school-kid.avif"
                alt="School kid studying"
                className="w-full h-full object-cover rounded-[2.3rem] transition-transform duration-500 group-hover:scale-105"
              />
              <motion.div
                className="absolute inset-0 rounded-[2.3rem] bg-gradient-to-br from-pink-500/20 via-orange-500/15 to-purple-500/20 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-0 rounded-[2.3rem] shadow-[inset_0_0_40px_rgba(255,20,147,0.25)] pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-gradient-to-br from-pink-500/40 to-purple-500/20 blur-2xl animate-floating"
              aria-hidden
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -top-8 -left-8 h-28 w-28 rounded-full bg-gradient-to-br from-orange-500/30 to-pink-500/20 blur-2xl animate-floating"
              aria-hidden
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}