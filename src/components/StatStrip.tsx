"use client";

import React from "react";
import { PROFILE } from "@/data/profile";

export function StatStrip() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 py-4">
      {PROFILE.stats.map((stat) => (
        <div
          key={stat.label}
          className="group relative min-w-0 rounded-2xl border border-ink-border bg-ink-raised/50 p-4 sm:p-5 transition-all duration-200 hover:border-signal/30 hover:bg-ink-raised/80"
        >
          {/* Genuine metric number in IBM Plex Mono */}
          <div className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-paper group-hover:text-signal transition-colors break-words">
            {stat.value}
          </div>

          {/* Plain sentence-case label in IBM Plex Sans (never mono) */}
          <div className="mt-2 text-xs font-semibold text-signal font-sans break-words">
            {stat.label}
          </div>

          {/* Contextual description in sentence case */}
          <div className="mt-1 text-xs leading-relaxed text-muted font-sans break-words">
            {stat.description}
          </div>
        </div>
      ))}
    </div>
  );
}
