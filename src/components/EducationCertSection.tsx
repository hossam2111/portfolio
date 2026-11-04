"use client";

import React from "react";
import { PROFILE } from "@/data/profile";
import { GraduationCap, Award } from "lucide-react";

export function EducationCertSection() {
  return (
    <div className="space-y-6">
      {/* Education */}
      <div className="rounded-2xl border border-ink-border bg-ink-raised/50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-ink-border bg-ink text-signal">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-sans font-medium text-signal">
              Academic background
            </span>
            <h3 className="mt-1 font-display text-lg font-bold text-paper">
              {PROFILE.education.degree}
            </h3>
            <p className="mt-0.5 text-xs text-muted font-sans">
              {PROFILE.education.institution}
            </p>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-paper-dim font-sans max-w-prose">
              {PROFILE.education.focus} — Analytical grounding in process optimization,
              deterministic modeling, operations research, and systems engineering.
            </p>
          </div>
        </div>
      </div>

      {/* Verified Certifications */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-sans font-semibold uppercase tracking-wider text-muted">
          Verified certifications
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PROFILE.certifications.map((cert, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 rounded-xl border border-ink-border bg-ink-raised/30 p-4 transition-colors hover:border-ink-hover"
            >
              <Award className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
              <div className="space-y-0.5">
                <h4 className="text-xs font-semibold text-paper font-sans">
                  {cert.title}
                </h4>
                <p className="text-xs text-muted font-sans">
                  {cert.issuer}, {cert.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
