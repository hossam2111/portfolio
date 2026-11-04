import React from "react";
import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center text-slate-200">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-accent/30 bg-surface-subtle shadow-[0_0_50px_rgba(0,240,255,0.15)]">
        <Terminal className="h-10 w-10 text-accent animate-pulse" />
      </div>

      <div className="mt-8 font-mono text-xs uppercase tracking-widest text-accent">
        {"// ERROR: 404_LATENT_VECTOR_NOT_FOUND"}
      </div>

      <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Out of Bounds
      </h1>

      <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-slate-400">
        The embedding vector you are querying does not project onto any known
        manifold or route in this portfolio.
      </p>

      <div className="mt-8 flex items-center gap-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-xs font-mono font-semibold text-slate-950 transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Return to Origin (Home)</span>
        </Link>
      </div>
    </div>
  );
}
