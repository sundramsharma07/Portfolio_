"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Download } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import Image from "next/image";

import { HERO_STRINGS, SOCIAL_LINKS } from "@/data/portfolio";
import useTypewriter from "@/hooks/useTypewriter";

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const typed = useTypewriter({ words: [...HERO_STRINGS], typingMs: 28, deletingMs: 16, pauseMs: 820 });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const [isTouch, setIsTouch] = useState(false);

  const sMx = useSpring(mx, { stiffness: 160, damping: 18, mass: 0.3 });
  const sMy = useSpring(my, { stiffness: 160, damping: 18, mass: 0.3 });

  const parX = useTransform(sMx, (v) => v * 10);
  const parY = useTransform(sMy, (v) => v * 6);

  useEffect(() => {
    if (reducedMotion || isTouch) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set((e.clientX - cx) / cx);
      my.set((e.clientY - cy) / cy);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reducedMotion, isTouch]);

  useEffect(() => {
    setIsTouch(
      typeof window !== 'undefined' && (
        'ontouchstart' in window ||
        (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0)
      )
    );
  }, []);

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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/75 relative overflow-hidden group">
                <motion.span 
                  className="absolute inset-0 bg-yellow-400/5 blur-xl"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <span className="relative inline-block h-2 w-2 rounded-full bg-yellow-300 shadow-[0_0_18px_rgba(255,215,0,0.8)]" />
                <span className="relative">Available for Internships</span>
              </div>

              {/* Name with large cursive font and typing effect – no extra space */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="mt-0"
              >
                {/* Name rendered in cursive - static */}
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight">
                  <span
                    className="bg-gradient-to-r from-pink-200 via-orange-200 to-purple-200 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    style={{ fontFamily: "var(--font-cursive)" }}
                  >
                    Sundram Kumar
                  </span>
                </h1>
              </motion.div>

              <div className="mt-4 text-xs sm:text-sm text-white/70">
                <motion.span
                  className="text-white/80 inline"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4,
                    type: "spring",
                    stiffness: 200,
                    damping: 10
                  }}
                >
                  I craft
                </motion.span>{" "}
                <span
                  className="relative inline-flex items-center font-semibold text-transparent bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text"
                  style={{ fontFamily: "var(--font-typewriter)" }}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.6,
                      type: "spring",
                      stiffness: 150,
                      damping: 12
                    }}
                  >
                    {typed}
                  </motion.span>
                  <motion.span
                    className="ml-1 inline-block h-[0.8em] w-[2px] bg-pink-300 align-middle shadow-[0_0_8px_rgba(244,114,182,0.8)]"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                </span>{" "}
                <motion.span
                  className="text-white/60 inline"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.8,
                    type: "spring",
                    stiffness: 180,
                    damping: 15
                  }}
                >
                  Empowering users and businesses alike.
                </motion.span>
              </div>

              <p className="mt-5 max-w-xl text-sm sm:text-base text-white/60 leading-relaxed">
                Passionate Computer Science student crafting innovative full-stack solutions, integrating AI for smarter applications, and building secure, scalable systems that drive real-world impact.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollToId("projects")}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition-all hover:bg-white/10"
                >
                  <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,20,147,0.18)_45%,transparent_70%)] translate-x-[-120%] hover:translate-x-[120%] transition-transform duration-700" />
                  View Projects
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(244,114,182,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollToId("contact")}
                  className="rounded-2xl bg-gradient-to-r from-pink-400 via-orange-400 to-purple-400 px-5 py-3 text-sm font-semibold text-black transition-all hover:-translate-y-0.5"
                >
                  Contact Me
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.98 }}
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl border border-white/10 bg-white/5 p-3.5 text-white/90 transition-all flex items-center justify-center"
                  title="GitHub Profile"
                >
                  <FaGithub size={20} className="group-hover:text-cyan-400 transition-colors" />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.98 }}
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-2xl border border-white/10 bg-white/5 p-3.5 text-white/90 transition-all flex items-center justify-center"
                  title="LinkedIn Profile"
                >
                  <FaLinkedinIn size={20} className="group-hover:text-blue-400 transition-colors" />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  href="https://drive.google.com/uc?export=download&id=1jEJWUePewgBO3dtvGOqcFwFdIfeYb8KG"
                  download
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-bold text-white/90 transition-all flex items-center gap-2"
                >
                  <Download size={18} />
                  Resume
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
              className="absolute -inset-8 rounded-[3rem] bg-[radial-gradient(circle_at_top,rgba(255,20,147,0.22),transparent_60%),radial-gradient(circle_at_bottom,rgba(157,78,221,0.2),transparent_55%)] blur-[2px]"
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
              className="glass-strong relative overflow-hidden rounded-[2.3rem] p-0 group ring-1 ring-white/10 shadow-[0_0_30px_rgba(255,20,147,0.1)]"
              whileHover={{ scale: 1.02, boxShadow: "0 0 50px rgba(255,20,147,0.25)", borderColor: "rgba(255,20,147,0.3)" }}
            >
              <Image
                src="/school-kid.avif"
                alt="School kid studying"
                width={400}
                height={400}
                loading="eager"
                className="w-full h-full object-cover rounded-[2.3rem] transition-transform duration-500 group-hover:scale-105"
              />
              <motion.div
                className="absolute inset-0 rounded-[2.3rem] bg-gradient-to-br from-pink-500/20 via-orange-500/15 to-purple-500/25 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute inset-0 rounded-[2.3rem] shadow-[inset_0_0_60px_rgba(255,20,147,0.35)] pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
              
              {/* Animated glow edge */}
              <motion.div 
                className="absolute -inset-[500%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,20,147,0.2)_90deg,transparent_180deg)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-gradient-to-br from-pink-500/50 to-purple-500/30 blur-3xl animate-floating"
              aria-hidden
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -top-8 -left-8 h-28 w-28 rounded-full bg-gradient-to-br from-orange-500/40 to-pink-500/30 blur-3xl animate-floating"
              aria-hidden
              animate={{
                y: [0, 15, 0],
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2]
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