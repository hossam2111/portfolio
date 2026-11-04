"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Project } from "@/data/profile";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    setIsFinePointer(pointerQuery.matches);
    setPrefersReducedMotion(motionQuery.matches);

    const handlePointerChange = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);

    pointerQuery.addEventListener("change", handlePointerChange);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      pointerQuery.removeEventListener("change", handlePointerChange);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isFinePointer || prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    // Restrained max 6 degree perspective tilt
    setTilt({
      x: -ny * 6,
      y: nx * 6,
    });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform:
          isFinePointer && !prefersReducedMotion
            ? `perspective(1000px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg)`
            : "none",
        transition: tilt.x === 0 ? "transform 0.4s ease-out" : "transform 0.08s ease-out",
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-2xl border border-ink-border bg-ink-raised/60 p-6 sm:p-7 transition-colors duration-200 hover:border-signal/40 hover:bg-ink-raised/90 shadow-sm"
    >
      {/* Header meta */}
      <div className="flex items-center justify-between text-xs font-sans text-muted">
        <span className="rounded-md border border-signal/25 bg-signal/10 px-2 py-0.5 text-xs font-medium text-signal">
          Case study
        </span>
        <time className="font-mono text-muted">{project.year}</time>
      </div>

      {/* Project Title */}
      <h3 className="mt-3.5 font-display text-xl sm:text-2xl font-bold tracking-tight text-paper">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 transition-colors hover:text-signal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
        >
          <span>{project.title}</span>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-signal transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </h3>

      {/* One line summary */}
      <p className="mt-2 text-sm leading-relaxed text-paper-dim font-sans max-w-prose">
        {project.oneLineSummary}
      </p>

      {/* Highlight metrics */}
      {project.highlightStats && project.highlightStats.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.highlightStats.map((stat, idx) => {
            // Check for before/reduction metrics to sparingly utilize correction marker
            const isReduction = stat.includes("Reduction") || stat.includes("40%");
            return (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 rounded-lg border border-ink-border bg-ink px-2.5 py-1 text-xs font-sans text-paper"
              >
                {isReduction ? (
                  <span className="text-[10px] font-mono font-semibold text-correction rounded bg-correction/15 px-1 py-0.5 border border-correction/30">
                    before: manual
                  </span>
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                )}
                <span>{stat}</span>
              </span>
            );
          })}
        </div>
      )}

      {/* Stack Tags */}
      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.stackTags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-ink-border bg-ink/70 px-2.5 py-0.5 text-xs text-muted font-sans"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer navigation */}
      <div className="mt-6 flex items-center justify-between border-t border-ink-border pt-4 text-xs font-sans">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 font-medium text-signal hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
        >
          <span>Read case study</span>
        </Link>

        <div className="flex items-center gap-3">
          {project.githubUrl && project.githubUrl.trim() && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository for ${project.title}`}
              className="p-1 text-muted hover:text-signal transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {project.demoUrl && project.demoUrl.trim() && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo space for ${project.title}`}
              className="p-1 text-muted hover:text-signal transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
