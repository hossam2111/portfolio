"use client";

import React, { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "about", label: "ABOUT" },
  { id: "training-eval", label: "AI TRAINING & EVAL" },
  { id: "tech-stack", label: "TECHNICAL STACK" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "projects", label: "PROJECTS" },
  { id: "education", label: "EDUCATION & CERTS" },
  { id: "languages-global", label: "LANGUAGES & GLOBAL" },
  { id: "contact", label: "CONTACT" },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState<string>("about");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, "", `#${id}`);
      setActiveSection(id);
    }
  };

  return (
    <nav className="hidden lg:block py-6" aria-label="In-page jump links">
      <ul className="space-y-3.5">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`group flex items-center gap-4 py-1 text-xs font-mono tracking-widest transition-all duration-200 ${
                  isActive
                    ? "text-accent font-semibold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <span
                  className={`h-[1px] transition-all duration-300 ${
                    isActive
                      ? "w-16 bg-accent shadow-[0_0_8px_#00f0ff]"
                      : "w-8 bg-slate-700 group-hover:w-12 group-hover:bg-slate-400"
                  }`}
                  aria-hidden="true"
                />
                <span className="uppercase">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
