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
    <div className="flex flex-wrap items-center gap-3">
      {activeSocials.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target={link.url.startsWith("http") ? "_blank" : undefined}
          rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
          aria-label={link.name}
          className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-ink-border bg-ink-raised/70 text-paper transition-all duration-200 hover:-translate-y-0.5 hover:border-signal/40 hover:bg-ink-hover hover:text-signal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal shadow-sm"
        >
          {renderIcon(link.icon, "h-4 w-4 transition-transform group-hover:scale-110")}
          <span className="sr-only">{link.name}</span>
          <span className="pointer-events-none absolute -top-8 scale-0 rounded bg-ink-raised border border-ink-border px-2 py-0.5 text-[11px] font-sans text-paper transition-all group-hover:scale-100 shadow-md">
            {link.name}
          </span>
        </a>
      ))}

      {/* Resume PDF link */}
      {PROFILE.resumeUrl && (
        <a
          href={PROFILE.resumeUrl}
          download="Hossam_Ali_CV.pdf"
          aria-label="Download curriculum vitae PDF"
          className="group relative flex items-center gap-2 rounded-xl border border-ink-border bg-ink-raised/70 px-4 h-11 text-xs font-sans font-medium text-paper transition-all duration-200 hover:-translate-y-0.5 hover:border-signal/40 hover:bg-ink-hover hover:text-signal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal shadow-sm"
        >
          <FileText className="h-3.5 w-3.5 text-signal transition-transform group-hover:scale-110" />
          <span>Curriculum vitae</span>
        </a>
      )}
    </div>
  );
}
