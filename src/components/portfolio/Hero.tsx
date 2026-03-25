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
export default function Hero() {
  const reducedMotion = useReducedMotion();
  const typed = useTypewriter({ words: [...HERO_STRINGS], typingMs: 32, deletingMs: 18, pauseMs: 900 });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sMx = useSpring(mx, { stiffness: 160, damping: 18, mass: 0.3 });
  const sMy = useSpring(my, { stiffness: 160, damping: 18, mass: 0.3 });

  const parX = useTransform(sMx, (v) => v * 12);
  const parY = useTransform(sMy, (v) => v * 8);

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
      className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 overflow-hidden"
      aria-label="Hero"
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-600/20 to-transparent blur-3xl"
          animate={{
            y: [0, 40, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden
        />
        <motion.div
          className="absolute -bottom-32 -right-40 w-96 h-96 rounded-full bg-gradient-to-tl from-cyan-600/15 via-transparent to-blue-600/10 blur-3xl"
          animate={{
            y: [0, -30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          aria-hidden
        />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="inline-flex items-center gap-2.5 rounded-full border border-blue-500/40 bg-gradient-to-r from-blue-500/15 to-cyan-500/10 backdrop-blur-sm px-4 py-2 text-xs font-semibold text-blue-300"
            >
              <motion.span 
                className="inline-block h-2 w-2 rounded-full bg-green-400"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Available for Opportunities
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-8 text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight tracking-normal text-white"
            >
              Hi, I'm{" "}
              <span className="relative inline-block font-medium">
                <span className="text-blue-300">
                  Sundram Kumar
                </span>
              </span>
            </motion.h1>

            {/* Dynamic Role Tag */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-6"
            >
              <div className="text-base sm:text-lg lg:text-xl font-medium text-gray-300">
                <span>Building</span>{" "}
                <span className="relative inline-block">
                  <motion.span
                    className="relative px-2 py-1 inline-block font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-300 min-w-[180px] text-left"
                    key={typed}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {typed || "solutions"}
                  </motion.span>
                  
                  {/* Glow effect behind text */}
                  <motion.span
                    className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-600/40 via-cyan-600/30 to-blue-600/40 blur-lg -z-10"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  {/* Animated cursor */}
                  <motion.span
                    className="ml-1 inline-block h-6 w-1 bg-gradient-to-b from-blue-400 to-cyan-300 rounded-sm"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </span>{" "}
                <span>for tomorrow</span>
              </div>
            </motion.div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-6 max-w-2xl text-base sm:text-lg text-gray-400 leading-relaxed"
            >
              Full-stack developer passionate about creating scalable, AI-powered applications and designing elegant system architectures. 
              <span className="block mt-2 text-gray-500">Let's transform ideas into innovative solutions.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <motion.button
                whileHover={{ y: -3, boxShadow: "0 20px 40px rgba(59,130,246,0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToId("projects")}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/50 transition-all duration-300 hover:shadow-blue-500/60"
              >
                View My Work
              </motion.button>

              <motion.button
                whileHover={{ y: -3, boxShadow: "0 10px 25px rgba(59,130,246,0.2)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToId("contact")}
                className="rounded-xl border-2 border-blue-500/50 bg-transparent px-8 py-3 text-sm font-semibold text-blue-300 backdrop-blur-sm transition-all duration-300 hover:border-blue-400 hover:bg-blue-500/10 hover:text-blue-200"
              >
                Contact Me
              </motion.button>

              <motion.a
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border-2 border-gray-700 bg-gray-900/50 px-6 py-3 text-sm font-semibold text-gray-300 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500 hover:text-cyan-300 flex items-center gap-2"
              >
                <ExternalLink size={16} />
                GitHub
              </motion.a>
            </motion.div>

            {/* Tech Tags */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-10 flex flex-wrap items-center gap-3 text-xs text-gray-500"
            >
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
                Full-Stack Development
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                AI & Machine Learning
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <span className="h-2 w-2 rounded-full bg-purple-400" />
                System Architecture
              </div>
            </motion.div>
          </div>

          {/* Right Side - Image with Effects */}
          <div className="lg:col-span-5 relative h-[500px] sm:h-[600px]">
            {/* Enhanced Background Glow */}
            <motion.div
              className="absolute -inset-12 rounded-3xl bg-gradient-to-br from-blue-600/20 via-transparent to-cyan-600/10 blur-3xl pointer-events-none"
              style={{
                transformStyle: "preserve-3d",
                x: reducedMotion ? 0 : parX,
                y: reducedMotion ? 0 : parY,
              }}
              animate={{
                opacity: [0.6, 0.9, 0.6],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="relative h-full rounded-3xl overflow-hidden group"
              whileHover={{ scale: 1.02 }}
            >
              {/* Main Image */}
              <img
                src="/school-kid.avif"
                alt="Developer workspace"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Gradient Overlay - Dynamic */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-transparent to-cyan-600/20 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
              
              {/* Inner Glow */}
              <motion.div
                className="absolute inset-0 shadow-[inset_0_0_40px_rgba(59,130,246,0.2)] pointer-events-none rounded-3xl"
                initial={{ opacity: 0.5 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
              
              {/* Border Glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl border-2 border-blue-500/0 pointer-events-none"
                initial={{ borderColor: "rgba(59,130,246,0)" }}
                whileHover={{ borderColor: "rgba(59,130,246,0.5)" }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>

            {/* Floating Glow Orbs */}
            <motion.div
              className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br from-blue-600/25 to-cyan-600/15 blur-3xl pointer-events-none"
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-br from-purple-600/20 to-blue-600/15 blur-3xl pointer-events-none"
              animate={{
                y: [0, 20, 0],
                x: [0, -10, 0],
              }}
              transition={{
                duration: 6,
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

