"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home, User, Code2, Briefcase, GraduationCap, Award,
  FileCheck, ShieldCheck, Mail, FileText, Moon, Sun, Menu,
} from "lucide-react";

import { NAV_ITEMS } from "@/data/portfolio";
import { cn } from "@/lib/cn";

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
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActive(visible.target.id);
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
  const activeId = useActiveSection(ids);
  const [expanded, setExpanded] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const getIcon = (id: string) => {
    switch (id) {
      case "home": return <Home size={18} />;
      case "about": return <User size={18} />;
      case "techstack": return <Code2 size={18} />;
      case "projects": return <Briefcase size={18} />;
      case "training": return <GraduationCap size={18} />;
      case "certificates": return <FileCheck size={18} />;
      case "achievements": return <Award size={18} />;
      case "education": return <ShieldCheck size={18} />;
      case "contact": return <Mail size={18} />;
      case "resume": return <FileText size={18} />;
      default: return <Menu size={18} />;
    }
  };

  const isExpanded = expanded && !isTouch;

  return (
    <aside className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-[60] select-none">
      <motion.div
        className="relative glass-strong border border-white/10 shadow-2xl overflow-hidden"
        animate={{ width: isExpanded ? 200 : 48, height: isExpanded ? "auto" : 48 }}
        style={{ borderRadius: isExpanded ? 24 : 14 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        onMouseEnter={() => !isTouch && setExpanded(true)}
        onMouseLeave={() => !isTouch && setExpanded(false)}
        onClick={() => isTouch && setExpanded(!expanded)}
      >
        <div className="flex flex-col items-stretch h-full">
          {/* Collapsed state placeholder or Header */}
          {!isExpanded && (
            <div className="flex h-12 w-12 items-center justify-center">
              <div className="h-8 w-8 rounded-xl border border-cyan-500/30 bg-cyan-500/5 flex items-center justify-center font-bold text-cyan-400 text-[10px] tracking-tighter shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                SK
              </div>
            </div>
          )}

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col py-3 px-1.5 gap-1"
              >
                <div className="mb-2 px-3 text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                  Navigation
                </div>

          {/* Nav items */}
          {NAV_ITEMS.map((item) => {
            const active = activeId === item.id;
            return (
              <div key={item.id} className="px-1.5">
                <button
                  onClick={() => {
                    const el = document.getElementById(item.id);
                    if (el) {
                      const top = el.getBoundingClientRect().top + window.scrollY - 80;
                      window.scrollTo({ top, behavior: "smooth" });
                    }
                  }}
                  className={cn(
                    "group relative flex w-full items-center gap-3 rounded-2xl px-1.5 py-2.5 transition-colors duration-150",
                    active ? "bg-white/10" : "hover:bg-white/8"
                  )}
                >
                  <span className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center transition-colors duration-150",
                    active ? "text-cyan-400" : "text-white/45 group-hover:text-white"
                  )}>
                    {getIcon(item.id)}
                  </span>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -6 }}
                        transition={{ duration: 0.12 }}
                        className={cn(
                          "text-sm font-semibold whitespace-nowrap",
                          active ? "text-white" : "text-white/50 group-hover:text-white"
                        )}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {active && (
                    <motion.div
                      layoutId="sidenav-active"
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/15 to-violet-500/10 border border-cyan-500/25 -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              </div>
            );
          })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </aside>
  );
}
