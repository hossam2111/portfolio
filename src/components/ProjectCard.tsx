"use client";

import React from "react";
import Link from "next/link";
import { Project } from "@/data/profile";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group/item relative rounded-2xl border border-white/5 bg-surface/30 p-6 transition-all duration-300 lg:hover:border-accent/30 lg:hover:bg-surface/70 lg:hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] lg:hover:!opacity-100 lg:group-hover/list:opacity-40">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
        <span className="rounded border border-accent/20 bg-accent/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-accent">
          Case Study
        </span>
        <span>{project.year}</span>
      </div>

      <h3 className="mt-3 text-lg font-semibold text-slate-100">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 transition-colors hover:text-accent focus-visible:text-accent"
        >
          <span>{project.title}</span>
          <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5 text-accent" />
        </Link>
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-slate-300">
        {project.oneLineSummary}
      </p>

      {/* Real Metric / Highlight Stat Chips */}
      {project.highlightStats && project.highlightStats.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.highlightStats.map((stat, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 rounded-lg border border-accent/25 bg-accent/5 px-2.5 py-1 text-xs font-mono font-medium text-accent"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>{stat}</span>
            </span>
          ))}
        </div>
      )}

      {/* Stack tags */}
      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.stackTags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-white/5 bg-white/5 px-2.5 py-1 text-xs font-mono text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer links */}
      <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4 text-xs font-mono">
        <Link
          href={`/projects/${project.slug}`}
          className="text-accent hover:underline flex items-center gap-1 font-medium"
        >
          Read full case study →
        </Link>

        <div className="flex items-center gap-3">
          {project.githubUrl && project.githubUrl.trim() && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository for ${project.title}`}
              className="text-slate-400 hover:text-accent transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {project.demoUrl && project.demoUrl.trim() && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo for ${project.title}`}
              className="text-slate-400 hover:text-accent transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
