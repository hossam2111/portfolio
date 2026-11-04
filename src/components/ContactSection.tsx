"use client";

import React, { useState } from "react";
import { PROFILE } from "@/data/profile";
import { Copy, Check, Mail, ArrowUpRight, Phone } from "lucide-react";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-ink-border bg-ink-raised/60 p-8 sm:p-12 backdrop-blur-xl">
      {/* Background soft ambient amber glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-signal/10 blur-3xl" />

      <div className="max-w-xl">
        <span className="text-xs font-sans font-semibold uppercase tracking-wider text-signal">
          Initiate contact
        </span>
        <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight text-paper">
          Ready to contribute to AI training & evaluation projects.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-paper-dim font-sans max-w-prose">
          Available for human AI training, prompt & STEM challenge authoring,
          multimodal evaluation (text, code, image, video), and Arabic–English–German
          translation review. Let’s connect to discuss project requirements.
        </p>

        {/* Action Buttons (Touch targets >= 44px) */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${PROFILE.email}`}
            className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-xl bg-signal px-6 py-3 text-sm font-semibold text-ink shadow-[0_0_20px_rgba(242,169,59,0.3)] transition-all duration-200 hover:bg-signal-hover hover:shadow-[0_0_28px_rgba(242,169,59,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
          >
            <Mail className="h-4 w-4" />
            <span>Send email</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          <button
            onClick={handleCopy}
            aria-label="Copy email address to clipboard"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-ink-border bg-ink px-5 py-3 text-sm font-sans text-paper transition-all duration-200 hover:border-signal/40 hover:text-signal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal shadow-sm"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400">Copied to clipboard</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-muted" />
                <span>Copy {PROFILE.email}</span>
              </>
            )}
          </button>

          {PROFILE.showPhone && PROFILE.phone && (
            <a
              href={`tel:${PROFILE.phone}`}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-ink-border bg-ink px-5 py-3 text-sm font-sans text-paper transition-all duration-200 hover:border-signal/40 hover:text-signal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
            >
              <Phone className="h-4 w-4 text-muted" />
              <span>{PROFILE.phone}</span>
            </a>
          )}
        </div>

        {/* Location & Timezone info (no middle dots!) */}
        <div className="mt-8 flex items-center gap-2 text-xs text-muted font-sans">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" />
          <span>Location: {PROFILE.location}</span>
          <span className="text-muted/60">/</span>
          <span>Timezone: {PROFILE.timezone}</span>
        </div>
      </div>
    </div>
  );
}
