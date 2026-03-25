"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { NAV_ITEMS } from "@/data/portfolio";
import useTheme from "@/hooks/useTheme";
import { Award, BookOpen, GraduationCap } from "lucide-react";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "about");

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          )[0];
        if (!visible?.target?.id) return;
        setActive(visible.target.id);
      },
      { threshold: [0.25, 0.45, 0.65] },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);

  return active;
}

export default function SideNav() {
  const ids = useMemo(
    () => NAV_ITEMS.map((n) => n.id).filter((id) => id !== "home"),
    [],
  );
  const active = useActiveSection(ids);
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { mode, setMode, mounted } = useTheme();

  const previewMap: Record<
    string,
    { title: string; desc: string; icon: ReactNode }
  > = useMemo(
    () => ({
      about: {
        title: "About",
        desc: "My journey: full-stack, AI-integrated apps, and secure system design.",
        icon: <BookOpen size={18} />,
      },
      techstack: {
        title: "Tech Stack",
        desc: "Languages, frameworks, tools, and problem-solving workflows.",
        icon: <GraduationCap size={18} />,
      },
      certificates: {
        title: "Certificates",
        desc: "Proof of focused learning in security, privacy, and development methodologies.",
        icon: <Award size={18} />,
      },
      education: {
        title: "Education",
        desc: "B.Tech CSE timeline and academic milestones.",
        icon: <GraduationCap size={18} />,
      },
      projects: {
        title: "Projects",
        desc: "Recruiter-ready builds with clean UX and technical depth.",
        icon: <BookOpen size={18} />,
      },
      contact: {
        title: "Contact",
        desc: "Let’s connect—email and quick messaging.",
        icon: <Award size={18} />,
      },
      training: {
        title: "Training",
        desc: "Data structures + 100+ practice problems.",
        icon: <Award size={18} />,
      },
      achievements: {
        title: "Achievements",
        desc: "LeetCode practice, C++ rating, and hours of learning.",
        icon: <Award size={18} />,
      },
      resume: {
        title: "Resume",
        desc: "Download + preview the document.",
        icon: <BookOpen size={18} />,
      },
    }),
    [],
  );

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navItems = NAV_ITEMS;

  return (
    <motion.aside
      className="fixed right-4 top-1/2 -translate-y-1/2 z-[60]"
      initial={false}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <motion.div
        className="rounded-[2rem] glass-strong overflow-hidden border border-white/10"
        animate={{ width: expanded ? 240 : 60 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
      >
        <div className="flex flex-col items-center gap-2 py-3">
          <div className="flex w-full items-center justify-center px-3">
            <button
              type="button"
              onClick={() => scrollToId("home")}
              className="group flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Go to home"
            >
              <span className="text-sm font-bold text-cyan-200">S</span>
            </button>

            <AnimatePresence>
              {expanded ? (
                <motion.span
                  className="ml-3 whitespace-nowrap text-sm font-semibold text-white/90"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                >
                  Sundram Kumar
                </motion.span>
              ) : null}
            </AnimatePresence>
          </div>

          <div className="w-full px-2 mt-1">
            <button
              type="button"
              onClick={() => setMode(mode === "dark" ? "light" : "dark")}
              className="w-full flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/90 hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              <span className="h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.45)]" />
              {mounted && <span className="whitespace-nowrap">{mode === "dark" ? "Light" : "Dark"}</span>}
            </button>
          </div>

          <div className="w-full px-2">
            <div className="flex flex-col gap-2">
              {navItems
                .filter((x) => x.id !== "home")
                .map((item) => {
                  const isActive = active === item.id;
                  const letter = item.label.trim().slice(0, 1).toUpperCase();

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToId(item.id)}
                      onMouseEnter={() => setHovered(item.id)}
                      onMouseLeave={() => setHovered((h) => (h === item.id ? null : h))}
                      className="group relative flex items-center justify-center w-full h-11 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                      aria-label={`Go to ${item.label}`}
                    >
                      <motion.span
                        className="absolute left-2 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-white/50"
                        initial={false}
                        animate={
                          expanded && isActive
                            ? {
                                scale: 2.1,
                                opacity: 1,
                                boxShadow:
                                  "0 0 0 6px rgba(34,211,238,0.15), 0 0 30px rgba(34,211,238,0.25)",
                              }
                            : { scale: 1, opacity: 0.8 }
                        }
                        transition={{
                          type: "spring",
                          stiffness: 320,
                          damping: 24,
                        }}
                      />
                      <span className="relative z-10 text-sm font-bold text-white/85">
                        {letter}
                      </span>

                      <AnimatePresence>
                        {expanded ? (
                          <motion.span
                            className="ml-3 relative z-10 whitespace-nowrap text-sm font-semibold text-white/85"
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                          >
                            {item.label}
                          </motion.span>
                        ) : null}
                      </AnimatePresence>
                    </button>
                  );
                })}
            </div>
          </div>

          <AnimatePresence>
            {expanded && hovered && navItems.some((n) => n.id === hovered) ? (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                className="w-[260px] rounded-[2rem] glass-strong border border-white/10 absolute right-[calc(100%+12px)] top-24 p-4 z-[61] overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(850px_circle_at_20%_0%,rgba(34,211,238,0.18),transparent_55%),radial-gradient(700px_circle_at_100%_30%,rgba(168,85,247,0.16),transparent_55%)]" />
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-2xl grid place-items-center bg-white/5 border border-white/10">
                      {previewMap[hovered]?.icon ?? <Award size={18} />}
                    </div>
                    <div className="text-sm font-semibold text-white/90">
                      {previewMap[hovered]?.title ?? hovered}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-white/65 leading-relaxed">
                    {previewMap[hovered]?.desc ?? "Preview"}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80">
                      Hover preview
                    </span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                      className="text-xs font-semibold text-cyan-200/90"
                    >
                      Pop
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.aside>
  );
}

