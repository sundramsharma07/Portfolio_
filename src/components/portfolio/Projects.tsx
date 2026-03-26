"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { PROJECTS } from "@/data/portfolio";
import Reveal from "@/components/portfolio/Reveal";
import SectionHeading from "@/components/portfolio/SectionHeading";
import ProjectCard from "@/components/portfolio/ProjectCard";
import ProjectModal, { type ProjectModalData } from "@/components/portfolio/ProjectModal";

export default function ProjectsSection() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number>(0);

  const modalProject: ProjectModalData | null = useMemo(() => {
    if (selected < 0 || selected >= PROJECTS.length) return null;
    const p = PROJECTS[selected];
    return {
      title: p.title,
      description: p.description,
      stack: [...p.stack],
      highlights: [...p.highlights],
      liveUrl: p.liveUrl,
      repoUrl: p.repoUrl,
      showLivePreview: p.showLivePreview,
    };
  }, [selected]);

  return (
    <section
      id="projects"
      className="relative py-16 sm:py-20 scroll-mt-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading kicker="Selected Work" title="Projects" />
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {PROJECTS.map((p, idx) => (
            <Reveal key={p.title} delayMs={idx * 90}>
              <ProjectCard
                index={idx}
                title={p.title}
                description={p.description}
                stack={[...p.stack]}
                onOpen={() => {
                  setSelected(idx);
                  setOpen(true);
                }}
              />
            </Reveal>
          ))}
        </div>

        <motion.div
          className="mt-10 rounded-3xl glass-strong p-6 sm:p-7 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(700px_circle_at_15%_0%,rgba(34,211,238,0.16),transparent_55%),radial-gradient(650px_circle_at_95%_30%,rgba(99,102,241,0.14),transparent_55%)]" />
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-white/90">
                Click to open detailed project view
              </div>
              <div className="mt-1 text-sm text-white/60">
                This portfolio focuses on performance and clean UX.
              </div>
            </div>
            <motion.a
              whileHover={{ scale: 1.02 }}
              href="https://github.com/sundramsharma07"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-gradient-to-r from-cyan-300 via-violet-300 to-blue-300 px-5 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
            >
              Visit GitHub
            </motion.a>
          </div>
        </motion.div>
      </div>

      <ProjectModal
        open={open}
        project={modalProject}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}

