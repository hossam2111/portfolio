"use client";

import React from "react";
import { PROFILE } from "@/data/profile";
import { CheckCircle2, ShieldCheck, FileCode, Globe, Search } from "lucide-react";

function getGroupIcon(id: string) {
  switch (id) {
    case "evaluation-qa":
      return <ShieldCheck className="h-5 w-5 text-accent" />;
    case "prompt-stem":
      return <FileCode className="h-5 w-5 text-accent" />;
    case "multilingual-review":
      return <Globe className="h-5 w-5 text-accent" />;
    case "research-factchecking":
      return <Search className="h-5 w-5 text-accent" />;
    default:
      return <CheckCircle2 className="h-5 w-5 text-accent" />;
  }
}

export function TrainingSkillsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {PROFILE.trainingSkills.map((group) => (
        <div
          key={group.id}
          className="group relative flex flex-col justify-between rounded-2xl border border-white/5 bg-surface/50 p-6 transition-all duration-300 hover:border-accent/30 hover:bg-surface-subtle/80 hover:shadow-[0_10px_30px_rgba(0,240,255,0.06)]"
        >
          <div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-surface-subtle group-hover:border-accent/40 group-hover:bg-accent/10 transition-colors">
                {getGroupIcon(group.id)}
              </div>
              <span className="rounded-full border border-accent/20 bg-accent/5 px-2.5 py-0.5 text-[10px] font-mono text-accent">
                {group.focusPill}
              </span>
            </div>

            <h3 className="mt-4 text-base font-semibold text-slate-100 group-hover:text-accent transition-colors">
              {group.title}
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              {group.summary}
            </p>
          </div>

          <div className="mt-5 border-t border-white/5 pt-4">
            <ul className="space-y-1.5 text-xs text-slate-300">
              {group.skills.map((skill, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="leading-tight">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
