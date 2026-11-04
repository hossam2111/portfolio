"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { PROFILE } from "@/data/profile";
import {
  Search,
  ArrowRight,
  Copy,
  Check,
  FileText,
  ExternalLink,
  Code2,
} from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Navigation" | "Projects" | "Actions" | "Socials";
  icon: React.ReactNode;
  onSelect: () => void;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIsOpen(false);
    }, 1200);
  };

  const navigateTo = (pathOrHash: string) => {
    setIsOpen(false);
    if (pathOrHash.startsWith("#")) {
      const el = document.querySelector(pathOrHash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push("/" + pathOrHash);
      }
    } else {
      router.push(pathOrHash);
    }
  };

  const openUrl = (url: string) => {
    setIsOpen(false);
    if (url.startsWith("http")) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = url;
    }
  };

  const activeSocials = PROFILE.socialLinks.filter((s) => Boolean(s.url && s.url.trim()));

  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-about",
      title: "Jump to About",
      category: "Navigation",
      icon: <ArrowRight className="h-4 w-4" />,
      onSelect: () => navigateTo("#about"),
    },
    {
      id: "nav-training-eval",
      title: "Jump to AI training and evaluation",
      category: "Navigation",
      icon: <ArrowRight className="h-4 w-4" />,
      onSelect: () => navigateTo("#training-eval"),
    },
    {
      id: "nav-tech-stack",
      title: "Jump to Technical stack",
      category: "Navigation",
      icon: <ArrowRight className="h-4 w-4" />,
      onSelect: () => navigateTo("#tech-stack"),
    },
    {
      id: "nav-experience",
      title: "Jump to Experience",
      category: "Navigation",
      icon: <ArrowRight className="h-4 w-4" />,
      onSelect: () => navigateTo("#experience"),
    },
    {
      id: "nav-projects",
      title: "Jump to Projects",
      category: "Navigation",
      icon: <ArrowRight className="h-4 w-4" />,
      onSelect: () => navigateTo("#projects"),
    },
    {
      id: "nav-education",
      title: "Jump to Education and certifications",
      category: "Navigation",
      icon: <ArrowRight className="h-4 w-4" />,
      onSelect: () => navigateTo("#education"),
    },
    {
      id: "nav-languages-global",
      title: "Jump to Languages and global reach",
      category: "Navigation",
      icon: <ArrowRight className="h-4 w-4" />,
      onSelect: () => navigateTo("#languages-global"),
    },
    {
      id: "nav-contact",
      title: "Jump to Contact",
      category: "Navigation",
      icon: <ArrowRight className="h-4 w-4" />,
      onSelect: () => navigateTo("#contact"),
    },

    // Projects
    ...PROFILE.projects.map((p) => ({
      id: `proj-${p.slug}`,
      title: p.title,
      subtitle: p.oneLineSummary,
      category: "Projects" as const,
      icon: <Code2 className="h-4 w-4 text-signal" />,
      onSelect: () => navigateTo(`/projects/${p.slug}`),
    })),

    // Actions
    {
      id: "act-copy-email",
      title: copied ? "Copied email address" : `Copy email (${PROFILE.email})`,
      category: "Actions",
      icon: copied ? (
        <Check className="h-4 w-4 text-emerald-400" />
      ) : (
        <Copy className="h-4 w-4" />
      ),
      onSelect: copyEmail,
    },
    ...(PROFILE.resumeUrl
      ? [
          {
            id: "act-resume",
            title: "Download curriculum vitae PDF",
            category: "Actions" as const,
            icon: <FileText className="h-4 w-4" />,
            onSelect: () => {
              setIsOpen(false);
              const link = document.createElement("a");
              link.href = PROFILE.resumeUrl;
              link.download = "Hossam_Ali_CV.pdf";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            },
          },
        ]
      : []),

    // Socials
    ...activeSocials.map((s) => ({
      id: `soc-${s.name.toLowerCase()}`,
      title: `${s.name} (${s.url})`,
      category: "Socials" as const,
      icon: <ExternalLink className="h-4 w-4" />,
      onSelect: () => openUrl(s.url),
    })),
  ];

  const filtered = commands.filter((cmd) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q) ||
      (cmd.subtitle && cmd.subtitle.toLowerCase().includes(q))
    );
  });

  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? (filtered.length ? filtered.length - 1 : 0) : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].onSelect();
      }
    }
  };

  return (
    <>
      {/* Floating button: compact icon + ⌘K only, hidden below md so it doesn't cover content */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open command palette (Ctrl+K or ⌘K)"
        className="fixed bottom-5 right-5 z-40 hidden md:flex h-10 items-center gap-1.5 rounded-full border border-ink-border bg-ink-raised/90 px-3 text-xs font-sans text-paper backdrop-blur-xl transition-all duration-200 hover:border-signal/40 hover:bg-ink-hover hover:text-signal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal shadow-[0_8px_24px_rgba(15,22,38,0.7)]"
      >
        <Search className="h-3.5 w-3.5 text-signal" />
        <kbd className="rounded border border-ink-border bg-ink px-1.5 py-0.5 text-[10px] text-muted font-sans">
          ⌘K
        </kbd>
      </button>

      {/* Palette Dialog Backdrop & Content */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 px-4 pt-20 sm:pt-28 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-ink-border bg-ink-raised/95 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-all animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyNavigation}
          >
            {/* Input Header */}
            <div className="relative flex items-center border-b border-ink-border px-4">
              <Search className="h-4 w-4 text-signal" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command, project, or section..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full bg-transparent px-3 py-4 text-sm text-paper placeholder-muted focus:outline-none font-sans"
              />
              <kbd className="hidden sm:inline-block rounded border border-ink-border bg-ink px-2 py-0.5 text-[10px] text-muted">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-[380px] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-sm text-muted font-sans">
                  No matching commands found.
                </div>
              ) : (
                filtered.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={item.onSelect}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm font-sans transition-colors ${
                        isSelected
                          ? "bg-signal/15 text-paper"
                          : "text-paper-dim hover:bg-ink-hover"
                      }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
                            isSelected
                              ? "border-signal/40 bg-signal/20 text-signal"
                              : "border-ink-border bg-ink text-muted"
                          }`}
                        >
                          {item.icon}
                        </span>
                        <div className="truncate">
                          <p className="font-medium truncate">{item.title}</p>
                          {item.subtitle && (
                            <p className="truncate text-xs text-muted">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="ml-3 shrink-0 rounded border border-ink-border bg-ink px-1.5 py-0.5 text-[10px] font-sans text-muted">
                        {item.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-ink-border bg-ink/50 px-4 py-2.5 text-xs text-muted font-sans">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <span className="text-signal font-medium">{PROFILE.name}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
