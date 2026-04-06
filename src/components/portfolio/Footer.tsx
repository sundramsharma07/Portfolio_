"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";

import { SOCIAL_LINKS } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="relative py-10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-6 sm:p-7 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_10%_0%,rgba(34,211,238,0.12),transparent_55%),radial-gradient(650px_circle_at_90%_20%,rgba(99,102,241,0.12),transparent_55%)]" />
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-white/90">
                Designed and Developed by Sundram Kumar
              </div>
              <div className="mt-1 text-xs text-white/55">
                Premium animated portfolio built with Next.js, Tailwind & Framer Motion.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.1)" }}
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 bg-white/5 p-3 hover:text-cyan-400 transition-all"
                aria-label="GitHub"
              >
                <FaGithub size={20} className="text-white/85 group-hover:text-cyan-400" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.1)" }}
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 bg-white/5 p-3 hover:text-blue-400 transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={20} className="text-white/85 group-hover:text-blue-400" />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-white/45">
          © {new Date().getFullYear()} Sundram Kumar. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

