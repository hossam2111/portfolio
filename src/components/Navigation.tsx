"use client";

import React, { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "training-eval", label: "AI training and evaluation" },
  { id: "tech-stack", label: "Technical stack" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education and certifications" },
  { id: "languages-global", label: "Languages and global reach" },
  { id: "contact", label: "Contact" },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState<string>("about");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;

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
    <nav className="hidden lg:block py-6" aria-label="Section navigation">
      <ul className="space-y-3">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`group flex items-center gap-3.5 py-1 text-sm font-sans transition-all duration-200 ${
                  isActive
                    ? "text-signal font-semibold"
                    : "text-muted hover:text-paper"
                }`}
              >
                <span
                  className={`h-[1px] transition-all duration-300 ${
                    isActive
                      ? "w-12 bg-signal shadow-[0_0_8px_#F2A93B]"
                      : "w-6 bg-muted/30 group-hover:w-10 group-hover:bg-paper/60"
                  }`}
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
