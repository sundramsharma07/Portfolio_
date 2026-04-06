"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home, User, Code2, Briefcase, GraduationCap, Award,
  FileCheck, ShieldCheck, Mail, FileText, Menu,
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTouch] = useState(() => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0));
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const getIcon = (id: string) => {
    switch (id) {
      case "home": return <Home size={16} />;
      case "about": return <User size={16} />;
      case "techstack": return <Code2 size={16} />;
      case "projects": return <Briefcase size={16} />;
      case "training": return <GraduationCap size={16} />;
      case "certificates": return <FileCheck size={16} />;
      case "achievements": return <Award size={16} />;
      case "education": return <ShieldCheck size={16} />;
      case "contact": return <Mail size={16} />;
      case "resume": return <FileText size={16} />;
      default: return <Menu size={16} />;
    }
  };

  return (
    <aside className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-[60] select-none">
      <div className="relative">
        {/* Center SK Button - Transparent with glowing text */}
        <motion.button
          className="relative flex h-12 w-12 items-center justify-center rounded-full bg-transparent border border-cyan-500/20 shadow-2xl backdrop-blur-sm"
          onMouseEnter={() => !isTouch && setIsMenuOpen(true)}
          onMouseLeave={() => !isTouch && setIsMenuOpen(false)}
          onClick={() => isTouch && setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 10px rgba(34,211,238,0.3)",
                "0 0 20px rgba(34,211,238,0.6)",
                "0 0 10px rgba(34,211,238,0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-transparent font-bold text-cyan-400 text-[10px] tracking-tighter"
          >
            SK
          </motion.div>
        </motion.button>

        {/* Semicircular Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="absolute right-0 top-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onMouseEnter={() => !isTouch && setIsMenuOpen(true)}
              onMouseLeave={() => !isTouch && setIsMenuOpen(false)}
            >
              {NAV_ITEMS.slice().reverse().map((item, index) => {
                // Calculate semicircular positions on the left side with distance from corners
                const totalItems = NAV_ITEMS.length;
                const angleRange = Math.PI * 0.8; // 144 degrees (reduced from 180 to add distance from corners)
                const startAngle = Math.PI / 2 + Math.PI * 0.1; // Start 18 degrees from vertical
                const angleStep = angleRange / (totalItems - 1);
                const angle = startAngle + index * angleStep;
                const radius = 140; // Distance from center
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.button
                    key={item.id}
                    className={cn(
                      "absolute flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-200 z-10",
                      activeId === item.id
                        ? "border-cyan-400/50 bg-cyan-500/10 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                        : "border-white/10 bg-white/5 shadow-lg hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    )}
                    style={{
                      left: x,
                      top: y,
                      transform: `translate(-50%, -50%)`, // Center the button on calculated position
                    }}
                    initial={{
                      opacity: 0,
                      scale: 0,
                      rotate: angle * (180 / Math.PI) // Start with rotation matching the angle
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: 0
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0,
                      rotate: angle * (180 / Math.PI)
                    }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1, // Staggered animation
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }}
                    whileHover={{
                      scale: 1.15,
                      boxShadow: activeId === item.id
                        ? "0 0 25px rgba(34,211,238,0.5)"
                        : "0 0 20px rgba(255,255,255,0.2)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => {
                      if (isTouch) setIsMenuOpen(false);
                      const el = document.getElementById(item.id);
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }}
                    title={item.label}
                    aria-label={`Navigate to ${item.label}`}
                  >
                    <span className={cn(
                      "transition-colors duration-200",
                      activeId === item.id ? "text-cyan-400" : "text-white/70 group-hover:text-white"
                    )}>
                      {getIcon(item.id)}
                    </span>

                    {/* Tooltip - shows when hovering over the button */}
                    <AnimatePresence>
                      {hoveredItem === item.id && (
                        <motion.div
                          className="absolute left-1/2 top-full mt-2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded-md whitespace-nowrap pointer-events-none z-20"
                          initial={{ opacity: 0, y: -5, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -5, scale: 0.8 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          {item.label}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
