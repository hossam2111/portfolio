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
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-surface to-surface-subtle/80 p-8 sm:p-12 backdrop-blur-xl">
      {/* Background soft accent glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

      <div className="max-w-xl">
        <span className="font-mono text-xs uppercase tracking-widest text-accent">
          {"// INITIATE CONTACT"}
        </span>
        <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Ready to contribute to AI training & evaluation projects.
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-300">
          Available for human AI training, prompt & STEM challenge authoring,
          multimodal evaluation (text, code, image, video), and Arabic–English–German
          translation review. Let’s connect to discuss project requirements.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${PROFILE.email}`}
            className="group inline-flex items-center gap-2.5 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-slate-950 transition-all duration-200 hover:bg-accent-hover hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]"
          >
            <Mail className="h-4 w-4" />
            <span>Send Email</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          <button
            onClick={handleCopy}
            aria-label="Copy email address to clipboard"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-surface-subtle/80 px-5 py-3 text-sm font-mono text-slate-200 transition-all duration-200 hover:border-accent/40 hover:bg-surface-hover hover:text-accent shadow-sm"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-slate-400" />
                <span>Copy {PROFILE.email}</span>
              </>
            )}
          </button>

          {/* Conditional Phone rendering: only if showPhone is true */}
          {PROFILE.showPhone && PROFILE.phone && (
            <a
              href={`tel:${PROFILE.phone}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-surface-subtle/80 px-5 py-3 text-sm font-mono text-slate-200 transition-all duration-200 hover:border-accent/40 hover:text-accent"
            >
              <Phone className="h-4 w-4 text-slate-400" />
              <span>{PROFILE.phone}</span>
            </a>
          )}
        </div>

        {/* Bottom meta note */}
        <div className="mt-8 flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span>Location: {PROFILE.location} • Timezone: {PROFILE.timezone}</span>
        </div>
      </div>
    </div>
  );
}
