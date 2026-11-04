"use client";

import React from "react";
import { PROFILE } from "@/data/profile";

export function StatStrip() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-3">
      {PROFILE.stats.map((stat) => (
        <div
          key={stat.label}
          className="group relative min-w-0 overflow-hidden rounded-2xl border border-white/5 bg-surface/50 p-3 sm:p-4 transition-all duration-300 hover:border-accent/30 hover:bg-surface-subtle"
        >
          <div className="font-mono text-2xl sm:text-3xl font-extrabold tracking-tight text-white group-hover:text-accent transition-colors break-words">
            {stat.value}
          </div>
          <div className="mt-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-accent/90 break-words">
            {stat.label}
          </div>
          <div className="mt-0.5 text-[10px] sm:text-[11px] leading-tight text-slate-400 break-words">
            {stat.description}
          </div>
        </div>
      ))}
    </div>
  );
}
