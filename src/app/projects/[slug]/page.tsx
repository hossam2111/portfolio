import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PROFILE } from "@/data/profile";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Cpu,
  Database,
  Sliders,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PROFILE.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROFILE.projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${project.title} — ${PROFILE.name}`,
    description: project.oneLineSummary,
    openGraph: {
      title: `${project.title} — AI Systems Case Study`,
      description: project.oneLineSummary,
      url: `${PROFILE.meta.siteUrl}/projects/${project.slug}`,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = PROFILE.projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = PROFILE.projects[projectIndex];
  const prevProject =
    projectIndex > 0 ? PROFILE.projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < PROFILE.projects.length - 1
      ? PROFILE.projects[projectIndex + 1]
      : null;

  return (
    <div className="min-h-screen bg-background text-slate-200">
      <main id="content" className="mx-auto max-w-5xl px-6 py-12 sm:px-12 lg:px-16 lg:py-20">
        {/* Back navigation */}
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 font-mono text-xs text-slate-400 transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Portfolio</span>
        </Link>

        {/* Header */}
        <header className="mt-8 border-b border-white/10 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-accent">
            <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1">
              {project.year} Case Study
            </span>
            <span className="text-white/20">•</span>
            <span>AI Systems & Integration</span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {project.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-300">
            {project.oneLineSummary}
          </p>

          {/* Stacks & Action Links */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {project.stackTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-white/10 bg-surface px-3 py-1 text-xs font-mono text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl && project.githubUrl.trim() && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-surface px-4 py-2 text-xs font-mono text-slate-200 transition-all hover:border-accent/40 hover:text-accent"
                >
                  <Github className="h-4 w-4" />
                  <span>Repository</span>
                </a>
              )}
              {project.demoUrl && project.demoUrl.trim() && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-xs font-mono font-semibold text-slate-950 transition-all hover:bg-accent-hover"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Live Space</span>
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Content Grid */}
        <div className="mt-12 space-y-12">
          {/* Section: Problem Formulation */}
          <section className="rounded-2xl border border-white/10 bg-surface/40 p-6 sm:p-8">
            <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-accent">
              <AlertCircle className="h-4 w-4 text-accent" />
              <span>Problem Statement & Operational Context</span>
            </div>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-300">
              {project.problem}
            </p>
          </section>

          {/* Section: Solution & Architecture */}
          <section className="rounded-2xl border border-white/10 bg-surface/40 p-6 sm:p-8">
            <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-accent">
              <CheckCircle2 className="h-4 w-4 text-accent" />
              <span>Engineered Solution & Implementation</span>
            </div>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-300">
              {project.solution}
            </p>
          </section>

          {/* Section: Highlight Metrics & Impacts */}
          {project.highlightStats && project.highlightStats.length > 0 && (
            <section className="rounded-2xl border border-white/10 bg-surface/40 p-6 sm:p-8">
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-accent">
                <TrendingUp className="h-4 w-4 text-accent" />
                <span>Verified Deliverables & Key Operational Metrics</span>
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {project.highlightStats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-xl border border-accent/25 bg-surface-subtle/70 p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent font-mono font-bold text-xs">
                      0{idx + 1}
                    </span>
                    <span className="text-sm font-medium text-slate-200">
                      {stat}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Conditional Dataset (if present) */}
          {project.dataset && (
            <section className="rounded-2xl border border-white/10 bg-surface/40 p-6 sm:p-8">
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-accent">
                <Database className="h-4 w-4 text-accent" />
                <span>Data Governance & Pipeline</span>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/5 bg-surface-subtle/60 p-4">
                  <span className="text-xs font-mono text-slate-400">Dataset Scope</span>
                  <p className="mt-1 text-sm font-semibold text-white">{project.dataset.name}</p>
                </div>
                {project.dataset.size && (
                  <div className="rounded-xl border border-white/5 bg-surface-subtle/60 p-4">
                    <span className="text-xs font-mono text-slate-400">Scale</span>
                    <p className="mt-1 text-sm font-semibold text-accent font-mono">{project.dataset.size}</p>
                  </div>
                )}
              </div>
              {project.dataset.preprocessing && (
                <div className="mt-6">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Pipeline Steps
                  </h3>
                  <ul className="mt-3 space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-outside pl-5 marker:text-accent">
                    {project.dataset.preprocessing.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* Conditional Method (if present) */}
          {project.method && (
            <section className="rounded-2xl border border-white/10 bg-surface/40 p-6 sm:p-8">
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-accent">
                <Cpu className="h-4 w-4 text-accent" />
                <span>Methodology & Technical Configuration</span>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.method.baseModel && (
                  <div className="rounded-xl border border-white/5 bg-surface-subtle/60 p-4">
                    <span className="text-xs font-mono text-slate-400">Base Foundation</span>
                    <p className="mt-1 text-sm font-semibold text-white">{project.method.baseModel}</p>
                  </div>
                )}
                {project.method.technique && (
                  <div className="rounded-xl border border-white/5 bg-surface-subtle/60 p-4">
                    <span className="text-xs font-mono text-slate-400">Technique</span>
                    <p className="mt-1 text-sm font-semibold text-accent">{project.method.technique}</p>
                  </div>
                )}
              </div>
              {project.method.hyperparameters && project.method.hyperparameters.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent mb-3">
                    <Sliders className="h-4 w-4 text-accent" />
                    <span>Configuration Parameters</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {project.method.hyperparameters.map((hp) => (
                      <div key={hp.name} className="rounded-xl border border-white/5 bg-surface-subtle/50 p-3.5">
                        <span className="text-[11px] font-mono text-slate-400 block">{hp.name}</span>
                        <span className="mt-1 font-mono text-xs font-semibold text-slate-100 block break-words">{hp.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}
        </div>

        {/* Prev / Next Case Study Nav */}
        <nav aria-label="Adjacent Case Studies" className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-accent transition-colors"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <div className="text-left">
                <span className="block text-[10px] uppercase text-slate-400">Previous Project</span>
                <span className="font-sans font-semibold text-slate-200 group-hover:text-accent truncate block max-w-xs">
                  {prevProject.title}
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-accent transition-colors sm:text-right"
            >
              <div className="text-right">
                <span className="block text-[10px] uppercase text-slate-400">Next Project</span>
                <span className="font-sans font-semibold text-slate-200 group-hover:text-accent truncate block max-w-xs">
                  {nextProject.title}
                </span>
              </div>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </main>
    </div>
  );
}
