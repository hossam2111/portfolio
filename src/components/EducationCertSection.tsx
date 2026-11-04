"use client";

import React from "react";
import { PROFILE } from "@/data/profile";
import { GraduationCap, Award } from "lucide-react";

export function EducationCertSection() {
  return (
    <div className="space-y-6">
      {/* Education Card */}
      <div className="rounded-2xl border border-white/5 bg-surface/50 p-6 transition-all duration-300 hover:border-accent/30">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-surface-subtle text-accent">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-accent">
              Academic Background
            </span>
            <h3 className="mt-1 text-base font-semibold text-white">
              {PROFILE.education.degree}
            </h3>
            <p className="mt-0.5 text-xs font-mono text-slate-300">
              {PROFILE.education.institution}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              {PROFILE.education.focus} — Analytical grounding in process optimization,
              deterministic modeling, operations research, and systems engineering.
            </p>
          </div>
        </div>
      </div>

      {/* Certifications Grid */}
      <div className="space-y-3">
        <div className="text-xs font-mono uppercase tracking-widest text-accent">
          Verified Certifications
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PROFILE.certifications.map((cert, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 rounded-xl border border-white/5 bg-surface/40 p-4 transition-all duration-200 hover:border-white/10 hover:bg-surface-subtle/70"
            >
              <Award className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <div className="space-y-0.5">
                <h4 className="text-xs font-semibold text-slate-200">
                  {cert.title}
                </h4>
                <p className="text-[11px] font-mono text-slate-400">
                  {cert.issuer} • {cert.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
