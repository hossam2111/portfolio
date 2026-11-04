import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center text-paper">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-signal/30 bg-ink-raised shadow-[0_0_40px_rgba(242,169,59,0.15)]">
        <Compass className="h-10 w-10 text-signal" />
      </div>

      <div className="mt-8 text-xs font-sans font-semibold uppercase tracking-wider text-signal">
        Page not found
      </div>

      <h1 className="mt-3 font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-paper">
        Out of bounds
      </h1>

      <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-muted font-sans">
        The route you are navigating does not exist or has been relocated within this portfolio.
      </p>

      <div className="mt-8 flex items-center gap-4">
        <Link
          href="/"
          className="group inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-signal px-6 py-3 text-sm font-sans font-semibold text-ink shadow-[0_0_24px_rgba(242,169,59,0.3)] transition-all duration-200 hover:bg-signal-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Return home</span>
        </Link>
      </div>
    </div>
  );
}
