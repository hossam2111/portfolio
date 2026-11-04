"use client";

import React from "react";
import { PROFILE } from "@/data/profile";
import { Globe2, Languages } from "lucide-react";

export function LanguagesGlobalSection() {
  return (
    <div className="space-y-6">
      {/* Multilingual proficiency */}
      <div className="rounded-2xl border border-ink-border bg-ink-raised/40 p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-signal">
          <Languages className="h-4 w-4 text-signal" />
          <span>Multilingual proficiency</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PROFILE.languages.map((lang) => (
            <div
              key={lang.language}
              className="flex items-center justify-between rounded-xl border border-ink-border bg-ink/60 p-3.5"
            >
              <div>
                <span className="text-sm font-semibold text-paper font-sans">
                  {lang.language}
                </span>
                <span className="block text-xs text-muted font-sans">
                  {lang.level}
                </span>
              </div>
              <span className="rounded border border-signal/25 bg-signal/10 px-2 py-0.5 text-xs font-sans font-medium text-signal">
                {lang.proficiency}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* International project exposure */}
      <div className="rounded-2xl border border-ink-border bg-ink-raised/40 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-signal">
            <Globe2 className="h-4 w-4 text-signal" />
            <span>International project delivery</span>
          </div>
          <span className="text-xs font-sans text-muted">
            {PROFILE.internationalExposure.length} countries
          </span>
        </div>

        <p className="text-xs sm:text-sm leading-relaxed text-paper-dim font-sans max-w-prose">
          Cross-border systems architecture, clinical deployments, workforce automation, and operations across:
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {PROFILE.internationalExposure.map((country) => (
            <span
              key={country}
              className="inline-flex items-center gap-1.5 rounded-lg border border-ink-border bg-ink px-3 py-1.5 text-xs text-paper-dim font-sans transition-colors hover:border-signal/30 hover:text-signal"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              <span>{country}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
