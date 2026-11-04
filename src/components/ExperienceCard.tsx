"use client";

import React from "react";
import { ExperienceEntry } from "@/data/profile";
import { ArrowUpRight } from "lucide-react";

interface ExperienceCardProps {
  experience: ExperienceEntry;
  isLast?: boolean;
}

export function ExperienceCard({ experience, isLast = false }: ExperienceCardProps) {
  return (
    <article className="relative pl-6 sm:pl-8 group">
      {/* Vertical timeline rule */}
      {!isLast && (
        <span
          className="absolute left-[7px] top-4 bottom-0 w-[1px] bg-ink-border"
          aria-hidden="true"
        />
      )}

      {/* Timeline node marker */}
      <span
        className="absolute left-[3px] top-1.5 h-2.5 w-2.5 rounded-full bg-signal ring-4 ring-ink transition-transform duration-200 group-hover:scale-125"
        aria-hidden="true"
      />

      {/* Date & Location metadata */}
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs text-muted font-sans">
        <time className="font-medium text-signal">{experience.period}</time>
        <span className="text-muted/60">/</span>
        <span>{experience.location}</span>
      </div>

      {/* Role & Company Header */}
      <h3 className="mt-1.5 text-base sm:text-lg font-semibold text-paper">
        {experience.companyUrl && experience.companyUrl.trim() ? (
          <a
            href={experience.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-signal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
          >
            <span>{experience.role}</span>
            <span className="text-muted font-normal">at</span>
            <span className="text-signal underline decoration-signal/40 underline-offset-4">{experience.company}</span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-signal transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        ) : (
          <div className="inline-flex items-center gap-1.5 flex-wrap">
            <span>{experience.role}</span>
            <span className="text-muted font-normal">at</span>
            <span className="text-signal">{experience.company}</span>
          </div>
        )}
      </h3>

      {/* Summary Description */}
      <p className="mt-2 text-sm leading-relaxed text-paper-dim font-sans max-w-prose">
        {experience.description}
      </p>

      {/* Key achievements list */}
      <ul className="mt-3 space-y-2 text-xs sm:text-sm leading-relaxed text-muted list-disc list-outside pl-4 marker:text-signal">
        {experience.achievements.map((ach, idx) => (
          <li key={idx} className="max-w-prose">{ach}</li>
        ))}
      </ul>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {experience.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-ink-border bg-ink-raised/60 px-2.5 py-0.5 text-xs text-paper-muted font-sans"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
