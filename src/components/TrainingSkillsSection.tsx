"use client";

import React from "react";
import { PROFILE } from "@/data/profile";
import { ShieldCheck, FileCode, Globe, Search, CheckCircle2 } from "lucide-react";

function getGroupIcon(id: string) {
  switch (id) {
    case "evaluation-qa":
      return <ShieldCheck className="h-5 w-5 text-signal" />;
    case "prompt-stem":
      return <FileCode className="h-5 w-5 text-signal" />;
    case "multilingual-review":
      return <Globe className="h-5 w-5 text-signal" />;
    case "research-factchecking":
      return <Search className="h-5 w-5 text-signal" />;
    default:
      return <CheckCircle2 className="h-5 w-5 text-signal" />;
  }
}

export function TrainingSkillsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {PROFILE.trainingSkills.map((group) => (
        <div
          key={group.id}
          className="rounded-2xl border border-ink-border bg-ink-raised/40 p-5 sm:p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink-border bg-ink">
                {getGroupIcon(group.id)}
              </div>
              <span className="rounded-md border border-signal/25 bg-signal/10 px-2.5 py-0.5 text-xs font-sans font-medium text-signal">
                {group.focusPill}
              </span>
            </div>

            <h3 className="mt-4 text-base font-semibold text-paper font-sans">
              {group.title}
            </h3>

            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted font-sans">
              {group.summary}
            </p>
          </div>

          <div className="mt-5 border-t border-ink-border pt-4">
            <ul className="space-y-1.5 text-xs text-paper-dim font-sans">
              {group.skills.map((skill, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                  <span className="leading-snug">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
