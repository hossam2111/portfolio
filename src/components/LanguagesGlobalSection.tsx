"use client";

import React from "react";
import { PROFILE } from "@/data/profile";
import { Globe2, Languages } from "lucide-react";

export function LanguagesGlobalSection() {
  return (
    <div className="space-y-6">
      {/* Languages Grid */}
      <div className="rounded-2xl border border-white/5 bg-surface/40 p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent">
          <Languages className="h-4 w-4 text-accent" />
          <span>Multilingual Proficiency</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PROFILE.languages.map((lang) => (
            <div
              key={lang.language}
              className="flex items-center justify-between rounded-xl border border-white/5 bg-surface-subtle/50 p-3.5"
            >
              <div>
                <span className="text-sm font-semibold text-white">
                  {lang.language}
                </span>
                <span className="block text-[11px] text-slate-400">
                  {lang.level}
                </span>
              </div>
              <span className="rounded border border-accent/20 bg-accent/5 px-2 py-0.5 text-xs font-mono text-accent">
                {lang.proficiency}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* International Exposure (10 Countries) */}
      <div className="rounded-2xl border border-white/5 bg-surface/40 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent">
            <Globe2 className="h-4 w-4 text-accent" />
            <span>International Project Exposure</span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {PROFILE.internationalExposure.length} Countries
          </span>
        </div>

        <p className="text-xs leading-relaxed text-slate-300">
          Cross-border systems architecture, clinical deployments, workforce automation, and operations across:
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {PROFILE.internationalExposure.map((country) => (
            <span
              key={country}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-surface-subtle px-3 py-1.5 text-xs font-mono text-slate-200 transition-colors hover:border-accent/40 hover:text-accent"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>{country}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
