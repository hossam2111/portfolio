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
      title: "Case study not found",
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
    <div className="min-h-screen bg-ink text-paper">
      <main id="content" className="mx-auto max-w-5xl px-6 py-12 sm:px-12 lg:px-16 lg:py-20">
        {/* Back navigation */}
        <Link
          href="/#projects"
          className="group inline-flex min-h-[44px] items-center gap-2 text-xs font-sans font-medium text-muted transition-colors hover:text-signal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to portfolio</span>
        </Link>

        {/* Header */}
        <header className="mt-8 border-b border-ink-border pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-sans text-signal">
            <span className="rounded-md border border-signal/25 bg-signal/10 px-3 py-1 font-medium">
              {project.year} case study
            </span>
            <span className="text-muted/60">/</span>
            <span className="text-paper-dim">AI systems & integration</span>
          </div>

          <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-paper">
            {project.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-paper-dim font-sans max-w-prose">
            {project.oneLineSummary}
          </p>

          {/* Stacks & Action Links */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {project.stackTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-ink-border bg-ink-raised px-3 py-1 text-xs font-sans text-paper-dim"
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
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-ink-border bg-ink-raised px-4 py-2 text-xs font-sans text-paper transition-all hover:border-signal/40 hover:text-signal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
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
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-signal px-4 py-2 text-xs font-sans font-semibold text-ink transition-all hover:bg-signal-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Live space</span>
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Content Grid */}
        <div className="mt-12 space-y-10">
          {/* Section: Problem Formulation */}
          <section className="rounded-2xl border border-ink-border bg-ink-raised/50 p-6 sm:p-8">
            <div className="flex items-center gap-2.5 text-xs font-sans font-semibold uppercase tracking-wider text-signal">
              <AlertCircle className="h-4 w-4 text-signal" />
              <span>Problem statement and operational context</span>
            </div>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-paper-dim font-sans max-w-prose">
              {project.problem}
            </p>
          </section>

          {/* Section: Solution & Architecture */}
          <section className="rounded-2xl border border-ink-border bg-ink-raised/50 p-6 sm:p-8">
            <div className="flex items-center gap-2.5 text-xs font-sans font-semibold uppercase tracking-wider text-signal">
              <CheckCircle2 className="h-4 w-4 text-signal" />
              <span>Engineered solution and implementation</span>
            </div>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-paper-dim font-sans max-w-prose">
              {project.solution}
            </p>
          </section>

          {/* Section: Highlight Metrics & Impacts */}
          {project.highlightStats && project.highlightStats.length > 0 && (
            <section className="rounded-2xl border border-ink-border bg-ink-raised/50 p-6 sm:p-8">
              <div className="flex items-center gap-2.5 text-xs font-sans font-semibold uppercase tracking-wider text-signal">
                <TrendingUp className="h-4 w-4 text-signal" />
                <span>Verified deliverables and operational metrics</span>
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {project.highlightStats.map((stat, idx) => {
                  const isReduction = stat.includes("Reduction") || stat.includes("40%");
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-xl border border-ink-border bg-ink p-4"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-signal/15 text-signal font-mono font-bold text-xs">
                        0{idx + 1}
                      </span>
                      <div className="flex flex-col">
                        {isReduction && (
                          <span className="text-[10px] font-mono text-correction font-semibold uppercase tracking-wider">
                            before manual baseline
                          </span>
                        )}
                        <span className="text-sm font-medium text-paper font-sans">
                          {stat}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Conditional Dataset (if present) */}
          {project.dataset && (
            <section className="rounded-2xl border border-ink-border bg-ink-raised/50 p-6 sm:p-8">
              <div className="flex items-center gap-2.5 text-xs font-sans font-semibold uppercase tracking-wider text-signal">
                <Database className="h-4 w-4 text-signal" />
                <span>Data governance and pipeline</span>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-ink-border bg-ink p-4">
                  <span className="text-xs text-muted font-sans">Dataset scope</span>
                  <p className="mt-1 text-sm font-semibold text-paper font-sans">{project.dataset.name}</p>
                </div>
                {project.dataset.size && (
                  <div className="rounded-xl border border-ink-border bg-ink p-4">
                    <span className="text-xs text-muted font-sans">Scale</span>
                    <p className="mt-1 text-sm font-semibold text-signal font-mono">{project.dataset.size}</p>
                  </div>
                )}
              </div>
              {project.dataset.preprocessing && (
                <div className="mt-6">
                  <h3 className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">
                    Pipeline steps
                  </h3>
                  <ul className="mt-3 space-y-2 text-xs sm:text-sm text-paper-dim list-disc list-outside pl-5 marker:text-signal font-sans max-w-prose">
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
            <section className="rounded-2xl border border-ink-border bg-ink-raised/50 p-6 sm:p-8">
              <div className="flex items-center gap-2.5 text-xs font-sans font-semibold uppercase tracking-wider text-signal">
                <Cpu className="h-4 w-4 text-signal" />
                <span>Methodology and technical configuration</span>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.method.baseModel && (
                  <div className="rounded-xl border border-ink-border bg-ink p-4">
                    <span className="text-xs text-muted font-sans">Base foundation</span>
                    <p className="mt-1 text-sm font-semibold text-paper font-sans">{project.method.baseModel}</p>
                  </div>
                )}
                {project.method.technique && (
                  <div className="rounded-xl border border-ink-border bg-ink p-4">
                    <span className="text-xs text-muted font-sans">Technique</span>
                    <p className="mt-1 text-sm font-semibold text-signal font-sans">{project.method.technique}</p>
                  </div>
                )}
              </div>
              {project.method.hyperparameters && project.method.hyperparameters.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-signal mb-3">
                    <Sliders className="h-4 w-4 text-signal" />
                    <span>Configuration parameters</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {project.method.hyperparameters.map((hp) => (
                      <div key={hp.name} className="rounded-xl border border-ink-border bg-ink p-3.5">
                        <span className="text-xs text-muted font-sans block">{hp.name}</span>
                        <span className="mt-1 font-mono text-xs font-semibold text-paper block break-words">{hp.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}
        </div>

        {/* Prev / Next Case Study Nav */}
        <nav aria-label="Adjacent case studies" className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-ink-border pt-8">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex min-h-[44px] items-center gap-2 text-xs font-sans text-muted hover:text-signal transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <div className="text-left">
                <span className="block text-[11px] text-muted font-sans">Previous project</span>
                <span className="font-display font-semibold text-paper group-hover:text-signal truncate block max-w-xs">
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
              className="group flex min-h-[44px] items-center gap-2 text-xs font-sans text-muted hover:text-signal transition-colors sm:text-right focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
            >
              <div className="text-right">
                <span className="block text-[11px] text-muted font-sans">Next project</span>
                <span className="font-display font-semibold text-paper group-hover:text-signal truncate block max-w-xs">
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
