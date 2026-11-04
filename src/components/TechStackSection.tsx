"use client";

import React from "react";
import { PROFILE } from "@/data/profile";

export function TechStackSection() {
  return (
    <div className="rounded-2xl border border-white/5 bg-surface/40 p-6 space-y-5">
      {PROFILE.technicalStack.map((group) => (
        <div key={group.category} className="space-y-2">
          <div className="text-xs font-mono font-medium uppercase tracking-wider text-accent/90">
            {group.category}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {group.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-white/5 bg-white/5 px-2.5 py-1 text-xs font-mono text-slate-200 transition-colors hover:border-accent/30 hover:bg-white/10"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
