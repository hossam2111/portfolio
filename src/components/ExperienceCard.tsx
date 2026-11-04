"use client";

import React from "react";
import { ExperienceEntry } from "@/data/profile";
import { ArrowUpRight } from "lucide-react";

interface ExperienceCardProps {
  experience: ExperienceEntry;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="group/item relative rounded-2xl border border-transparent p-6 transition-all duration-300 lg:hover:border-white/10 lg:hover:bg-surface/50 lg:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] lg:hover:!opacity-100 lg:group-hover/list:opacity-40">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 text-xs font-mono text-slate-400">
        <span className="uppercase tracking-wider text-slate-400">
          {experience.period}
        </span>
        <span className="text-[11px] text-slate-400">{experience.location}</span>
      </div>

      <div className="mt-2">
        <h3 className="text-base font-semibold text-slate-100">
          {experience.companyUrl && experience.companyUrl.trim() ? (
            <a
              href={experience.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-accent focus-visible:text-accent"
            >
              <span>{experience.role}</span>
              <span className="text-slate-400 font-normal">·</span>
              <span className="text-accent">{experience.company}</span>
              <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5 text-accent" />
            </a>
          ) : (
            <div className="inline-flex items-center gap-1.5">
              <span>{experience.role}</span>
              <span className="text-slate-400 font-normal">·</span>
              <span className="text-accent">{experience.company}</span>
            </div>
          )}
        </h3>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-300">
        {experience.description}
      </p>

      {/* Bullet achievements */}
      <ul className="mt-3 space-y-2 text-xs leading-relaxed text-slate-300 list-disc list-outside pl-4 marker:text-accent">
        {experience.achievements.map((ach, idx) => (
          <li key={idx}>{ach}</li>
        ))}
      </ul>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {experience.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-accent/20 bg-accent/5 px-3 py-0.5 text-[11px] font-mono text-accent"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
