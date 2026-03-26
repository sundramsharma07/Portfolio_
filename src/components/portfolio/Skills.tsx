"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { SKILLS } from "@/data/portfolio";
import SectionHeading from "@/components/portfolio/SectionHeading";
import Reveal from "@/components/portfolio/Reveal";

function Chip({ children }: { children: ReactNode }) {
  return (
    <motion.span 
      whileHover={{ 
        scale: 1.05, 
        backgroundColor: "rgba(34, 211, 238, 0.2)", 
        borderColor: "rgba(34, 211, 238, 0.4)",
        boxShadow: "0 0 15px rgba(34, 211, 238, 0.3)"
      }}
      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 cursor-default transition-all duration-300"
    >
      {children}
    </motion.span>
  );
}

const MarqueeRow = memo(function MarqueeRow({
  title,
  items,
  speedSeconds,
  delaySeconds = 0,
  direction = "left",
}: {
  title: string;
  items: string[];
  speedSeconds: number;
  delaySeconds?: number;
  direction?: "left" | "right";
}) {
  const reducedMotion = useReducedMotion();
  const chips = items.map((t) => <Chip key={t}>{t}</Chip>);

  return (
    <motion.div
      className="glass-strong rounded-[2.3rem] border border-white/10 p-5 overflow-hidden relative group"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: delaySeconds }}
      whileHover={{ borderColor: "rgba(34, 211, 238, 0.2)" }}
    >
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm font-semibold text-white/90 group-hover:text-cyan-200 transition-colors">{title}</div>
          <div className="text-xs font-semibold text-cyan-200/80 whitespace-nowrap">
            Scroll
          </div>
        </div>

        <div className="mt-4 relative overflow-hidden">
          <motion.div
            className="flex gap-2 whitespace-nowrap"
            animate={
              reducedMotion ? undefined : { x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }
            }
            transition={
              reducedMotion
                ? undefined
                : {
                    duration: speedSeconds,
                    repeat: Infinity,
                    ease: "linear",
                  }
            }
            style={{ willChange: "transform" }}
          >
            {chips}
            {chips}
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(700px_circle_at_20%_0%,rgba(34,211,238,0.14),transparent_55%),radial-gradient(600px_circle_at_100%_30%,rgba(99,102,241,0.12),transparent_55%)]" />
    </motion.div>
  );
});

export default function SkillsSection() {
  const languages = SKILLS.languages.map((x) => x.name);
  const frameworks = SKILLS.frameworks.map((x) => x.name);
  const tools = SKILLS.tools as unknown as string[];
  const softSkills = SKILLS.softSkills as unknown as string[];

  return (
    <section id="techstack" className="relative py-16 sm:py-20 scroll-mt-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading kicker="Tech Stack" title="Skills In Motion" />
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <MarqueeRow
            title="Languages"
            items={languages}
            speedSeconds={20}
            delaySeconds={0}
            direction="left"
          />
          <MarqueeRow
            title="Frameworks"
            items={frameworks}
            speedSeconds={22}
            delaySeconds={0.1}
            direction="right"
          />
          <MarqueeRow
            title="Tools"
            items={tools}
            speedSeconds={24}
            delaySeconds={0.2}
            direction="left"
          />
          <MarqueeRow
            title="Soft Skills"
            items={softSkills}
            speedSeconds={18}
            delaySeconds={0.3}
            direction="right"
          />
        </div>

        <div className="mt-6 text-xs text-white/55 leading-relaxed">
          Hover over the UI for micro feedback. Scroll for section reveals. Built to stay smooth.
        </div>
      </div>
    </section>
  );
}

