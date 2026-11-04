"use client";

import React from "react";
import { PROFILE, SocialLink } from "@/data/profile";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

function renderIcon(icon: SocialLink["icon"], className: string) {
  switch (icon) {
    case "github":
      return <Github className={className} />;
    case "linkedin":
      return <Linkedin className={className} />;
    case "mail":
      return <Mail className={className} />;
  }
}

export function SocialLinks() {
  const activeSocials = PROFILE.socialLinks.filter((link) => Boolean(link.url && link.url.trim()));

  return (
    <div className="flex items-center gap-3">
      {activeSocials.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target={link.url.startsWith("http") ? "_blank" : undefined}
          rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
          aria-label={link.name}
          className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-surface-subtle/60 text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface-hover hover:text-accent shadow-sm"
        >
          {renderIcon(link.icon, "h-4 w-4 transition-transform group-hover:scale-110")}
          <span className="sr-only">{link.name}</span>
          <span className="pointer-events-none absolute -top-8 scale-0 rounded bg-surface border border-white/10 px-2 py-0.5 text-[10px] font-mono text-slate-200 transition-all group-hover:scale-100 shadow-md">
            {link.name}
          </span>
        </a>
      ))}

      {/* Resume Link */}
      {PROFILE.resumeUrl && (
        <a
          href={PROFILE.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Resume PDF"
          className="group relative flex items-center gap-2 rounded-xl border border-white/5 bg-surface-subtle/60 px-3.5 h-10 text-xs font-mono text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface-hover hover:text-accent shadow-sm"
        >
          <FileText className="h-3.5 w-3.5 text-accent transition-transform group-hover:scale-110" />
          <span>Resume PDF</span>
        </a>
      )}
    </div>
  );
}
