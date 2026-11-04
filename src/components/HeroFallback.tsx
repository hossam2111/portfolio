"use client";

import React from "react";

export function HeroFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
    >
      {/* Soft ambient background radial glows */}
      <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-signal/10 blur-[100px]" />
      <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-ink-raised blur-[90px]" />

      {/* SVG Lattice & Signal Constellation */}
      <svg
        className="h-full w-full max-w-4xl opacity-50"
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="pointGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F2A93B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F2A93B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Structured layers / neural lattice */}
        <g stroke="#ECE8DF" strokeOpacity="0.12" strokeWidth="1">
          <line x1="200" y1="180" x2="350" y2="120" />
          <line x1="200" y1="180" x2="350" y2="240" />
          <line x1="200" y1="300" x2="350" y2="240" />
          <line x1="200" y1="300" x2="350" y2="360" />
          <line x1="200" y1="420" x2="350" y2="360" />
          <line x1="200" y1="420" x2="350" y2="480" />

          <line x1="350" y1="120" x2="500" y2="180" />
          <line x1="350" y1="240" x2="500" y2="180" />
          <line x1="350" y1="240" x2="500" y2="300" />
          <line x1="350" y1="360" x2="500" y2="300" />
          <line x1="350" y1="360" x2="500" y2="420" />
          <line x1="350" y1="480" x2="500" y2="420" />

          <line x1="500" y1="180" x2="650" y2="250" />
          <line x1="500" y1="300" x2="650" y2="250" />
          <line x1="500" y1="300" x2="650" y2="350" />
          <line x1="500" y1="420" x2="650" y2="350" />
        </g>

        {/* Signal pulses */}
        <g stroke="#F2A93B" strokeOpacity="0.35" strokeWidth="1.5">
          <line x1="350" y1="240" x2="500" y2="300" />
          <line x1="500" y1="300" x2="650" y2="250" />
        </g>

        {/* Node particles */}
        <circle cx="200" cy="180" r="3" fill="#ECE8DF" fillOpacity="0.7" />
        <circle cx="200" cy="300" r="3.5" fill="#ECE8DF" fillOpacity="0.8" />
        <circle cx="200" cy="420" r="3" fill="#ECE8DF" fillOpacity="0.7" />

        <circle cx="350" cy="120" r="3" fill="#ECE8DF" fillOpacity="0.7" />
        <circle cx="350" cy="240" r="4.5" fill="#F2A93B" />
        <circle cx="350" cy="360" r="3.5" fill="#ECE8DF" fillOpacity="0.8" />
        <circle cx="350" cy="480" r="3" fill="#ECE8DF" fillOpacity="0.7" />

        <circle cx="500" cy="180" r="3.5" fill="#ECE8DF" fillOpacity="0.8" />
        <circle cx="500" cy="300" r="5" fill="#F2A93B" />
        <circle cx="500" cy="420" r="3.5" fill="#ECE8DF" fillOpacity="0.8" />

        <circle cx="650" cy="250" r="4.5" fill="#F2A93B" />
        <circle cx="650" cy="350" r="3.5" fill="#ECE8DF" fillOpacity="0.8" />

        {/* Glow halos around amber signal nodes */}
        <circle cx="350" cy="240" r="16" fill="url(#pointGlow)" />
        <circle cx="500" cy="300" r="22" fill="url(#pointGlow)" />
        <circle cx="650" cy="250" r="18" fill="url(#pointGlow)" />
      </svg>
    </div>
  );
}
