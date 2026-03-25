"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { NAV_ITEMS } from "@/data/portfolio";

export default function SectionRail() {
  const ids = useMemo(
    () => NAV_ITEMS.map((n) => n.id).filter((id) => id !== "home"),
    [],
  );
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
      { threshold: [0.2, 0.35, 0.5, 0.65] },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="hidden lg:block fixed right-4 top-1/2 -translate-y-1/2 z-[52]">
      <div className="rounded-3xl glass-strong p-2">
        <div className="flex flex-col gap-2">
          {ids.map((id) => {
            const isActive = active === id;
            const label =
              NAV_ITEMS.find((n) => n.id === id)?.label ?? id.toUpperCase();
            return (
              <button
                key={id}
                type="button"
                onClick={() => scrollToId(id)}
                className="group relative h-10 w-10 rounded-2xl grid place-items-center border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                aria-label={`Go to ${label}`}
              >
                <motion.span
                  className="h-2 w-2 rounded-full bg-white/50"
                  animate={
                    isActive
                      ? { scale: 1.6, boxShadow: "0 0 0 6px rgba(34,211,238,0.12)" }
                      : { scale: 1 }
                  }
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                />
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="pointer-events-none absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-2xl border border-white/10 bg-black/50 backdrop-blur px-3 py-1.5 text-xs font-semibold text-white/85 opacity-0"
                >
                  {label}
                </motion.span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

