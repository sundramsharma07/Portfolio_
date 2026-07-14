"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Code2, Globe } from "lucide-react";

import { PROJECTS, type Project } from "@/data/portfolio";
import Reveal from "@/components/portfolio/Reveal";
import SectionHeading from "@/components/portfolio/SectionHeading";
import ProjectCard from "@/components/portfolio/ProjectCard";
import ProjectModal from "@/components/portfolio/ProjectModal";

export default function ProjectsSection() {
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Group projects logically
  const { starProjects, regularLiveProjects, githubOnlyProjects } = useMemo(() => {
    const star = PROJECTS.filter((p) => p.liveUrl && p.isStarProject);
    const regularLive = PROJECTS.filter((p) => p.liveUrl && !p.isStarProject);
    const github = PROJECTS.filter((p) => !p.liveUrl);
    return { starProjects: star, regularLiveProjects: regularLive, githubOnlyProjects: github };
  }, []);

  return (
    <section
      id="projects"
      className="relative py-16 sm:py-24 scroll-mt-28"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-radial-gradient from-cyan-500/5 via-transparent to-transparent blur-3xl opacity-40 pointer-events-none" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading kicker="Selected Work" title="Projects" />
        </Reveal>

        {/* ⭐ Star Projects */}
        {starProjects.length > 0 && (
          <div className="mt-12 space-y-10 lg:space-y-14">
            <Reveal delayMs={80}>
              <div className="relative flex items-center gap-3">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
                <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-xs font-extrabold text-cyan-300 tracking-widest uppercase shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                  <Sparkles size={12} className="text-cyan-400" style={{ animation: "spin 3s linear infinite" }} />
                  Star Projects
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-cyan-500/40 to-transparent" />
              </div>
            </Reveal>

            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } }
              }}
            >
              {starProjects.map((p, idx) => (
                <ProjectCard
                  key={p.title}
                  index={idx}
                  title={p.title}
                  description={p.description}
                  stack={[...p.stack]}
                  liveUrl={p.liveUrl}
                  repoUrl={p.repoUrl}
                  isStarProject={true}
                  onOpen={() => { setSelectedProject(p); setOpen(true); }}
                />
              ))}
            </motion.div>
          </div>
        )}

        {/* 🌐 Live Showcase */}
        {regularLiveProjects.length > 0 && (
          <div className="mt-20 space-y-10 lg:space-y-14">
            <Reveal>
              <div className="flex items-center gap-3">
                <Globe size={14} className="text-cyan-400 shrink-0" />
                <h3 className="text-sm font-mono font-bold tracking-wider text-white/50 uppercase">
                  Live Showcase
                </h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
              </div>
            </Reveal>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-7 lg:gap-9"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {regularLiveProjects.map((p, idx) => (
                <ProjectCard
                  key={p.title}
                  index={starProjects.length + idx}
                  title={p.title}
                  description={p.description}
                  stack={[...p.stack]}
                  liveUrl={p.liveUrl}
                  repoUrl={p.repoUrl}
                  onOpen={() => { setSelectedProject(p); setOpen(true); }}
                />
              ))}
            </motion.div>
          </div>
        )}

        {/* GitHub Directory Links (Beneath Live Projects) */}
        {githubOnlyProjects.length > 0 && (
          <div className="mt-24 space-y-6 border-t border-white/5 pt-16">
            <Reveal>
              <h3 className="text-md font-mono font-bold tracking-wider text-white/50 uppercase flex items-center gap-2">
                <Code2 size={14} className="text-cyan-400" />
                Repositories &amp; Codebases
              </h3>
            </Reveal>

            <motion.div 
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                  }
                }
              }}
            >
              {githubOnlyProjects.map((p, idx) => (
                <ProjectCard
                  key={p.title}
                  index={idx + starProjects.length + regularLiveProjects.length}
                  title={p.title}
                  description={p.description}
                  stack={[...p.stack]}
                  repoUrl={p.repoUrl}
                  onOpen={() => {
                    setSelectedProject(p);
                    setOpen(true);
                  }}
                />
              ))}
            </motion.div>
          </div>
        )}

        {/* Bottom Banner */}
        <motion.div
          className="mt-20 rounded-3xl glass-strong p-6 sm:p-7 relative overflow-hidden ring-1 ring-white/10 shadow-[0_0_30px_rgba(34,211,238,0.1)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          whileHover={{ boxShadow: "0 0 40px rgba(34,211,238,0.2)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_15%_0%,rgba(34,211,238,0.15),transparent_60%),radial-gradient(750px_circle_at_95%_30%,rgba(99,102,241,0.12),transparent_60%)]" />
          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-white/90 group-hover:text-cyan-200 transition-colors">
                Looking for more of my coding work?
              </div>
              <div className="mt-1 text-sm text-white/60">
                Explore all repositories and collaborative works on my official profile.
              </div>
            </div>
            <motion.a
              whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(34,211,238,0.4)" }}
              href="https://github.com/sundramsharma07"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-gradient-to-r from-cyan-300 via-violet-300 to-blue-300 px-5 py-3 text-sm font-semibold text-black transition-all hover:-translate-y-0.5"
            >
              Visit GitHub
            </motion.a>
          </div>
        </motion.div>
      </div>

      <ProjectModal
        open={open}
        project={selectedProject}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}

