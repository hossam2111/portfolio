"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { PROFILE } from "@/data/profile";
import { StatusChip } from "@/components/StatusChip";
import { HeroFallback } from "@/components/HeroFallback";
import { ArrowDown, FileText } from "lucide-react";

// Dynamic import of the 3D particle canvas (SSR: false, static fallback during hydration)
const DynamicSignalField = dynamic(() => import("./SignalField3D"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });
  const [isInView, setIsInView] = useState(true);
  const [canRender3D, setCanRender3D] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);

    // Check WebGL availability
    let webglSupported = false;
    try {
      const testCanvas = document.createElement("canvas");
      webglSupported = !!(
        window.WebGLRenderingContext &&
        (testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl"))
      );
    } catch {
      webglSupported = false;
    }

    if (webglSupported && !motionQuery.matches) {
      setCanRender3D(true);
    }

    // IntersectionObserver to pause R3F render loop when hero is off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Scroll progress handler
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const heroHeight = containerRef.current.offsetHeight || window.innerHeight;
      const p = Math.min(Math.max(-rect.top / heroHeight, 0), 1);
      setScrollProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Pointer tracking for parallax and shader uniforms
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const { clientX, clientY } = e;
    const nx = (clientX / window.innerWidth) * 2 - 1;
    const ny = -(clientY / window.innerHeight) * 2 + 1;
    setPointerPos({ x: nx, y: ny });
  };

  const handlePointerLeave = () => {
    setPointerPos({ x: 0, y: 0 });
  };

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label="Hero Introduction"
      className="relative min-h-screen w-full overflow-hidden bg-ink flex flex-col justify-between pt-8 pb-12 sm:pt-12 sm:pb-16"
    >
      {/* 3D Interactive Convergence Field or Static Fallback */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {canRender3D ? (
          <DynamicSignalField
            progress={scrollProgress}
            pointerPos={pointerPos}
            isActive={isInView}
          />
        ) : (
          <HeroFallback />
        )}
      </div>

      {/* Top subtle vignette */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-ink via-ink/60 to-transparent" />

      {/* Main hero content container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs (SSR visible immediately, zero flash of invisible text) */}
          <div className="lg:col-span-7 relative flex flex-col items-start text-left">
            {/* Subtle scrim behind text ensuring WCAG AA readability */}
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-r from-ink/95 via-ink/80 to-transparent blur-xl" />

            {/* Live Cairo Status Chip */}
            <div className="mb-6">
              <StatusChip />
            </div>

            {/* Display Name in Bricolage Grotesque */}
            <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-paper leading-[1.08]">
              {PROFILE.name}
            </h1>

            {/* Professional Title */}
            <p className="mt-4 text-base sm:text-lg lg:text-xl font-medium text-signal leading-snug">
              {PROFILE.title}
            </p>

            {/* Value Proposition */}
            <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-muted font-sans">
              {PROFILE.shortTagline}
            </p>

            {/* Concept identity badge */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-ink-border bg-ink-raised/60 px-3 py-1.5 text-xs text-paper-dim backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              <span>Human in the loop</span>
              <span className="text-muted/60">—</span>
              <span className="text-muted">turning noise into signal</span>
            </div>

            {/* CTAs: View projects + Download CV */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href="#projects"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-signal px-6 py-3 text-sm font-semibold text-ink shadow-[0_0_24px_rgba(242,169,59,0.3)] transition-all duration-200 hover:bg-signal-hover hover:shadow-[0_0_32px_rgba(242,169,59,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
              >
                <span>View projects</span>
                <ArrowDown className="h-4 w-4" />
              </a>

              <a
                href={PROFILE.resumeUrl}
                download="Hossam_Ali_CV.pdf"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-ink-border bg-ink-raised/80 px-6 py-3 text-sm font-medium text-paper transition-all duration-200 hover:border-signal/40 hover:bg-ink-hover hover:text-signal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
              >
                <FileText className="h-4 w-4" />
                <span>Download CV</span>
              </a>
            </div>
          </div>

          {/* Right Column (or stacked below on mobile): Floating Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative pointer-events-none mt-4 lg:mt-0">
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[430px] aspect-[796/1024] [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
              {/* Soft amber rim glow specifically behind upper body/shoulders */}
              <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 h-56 w-56 rounded-full bg-signal/12 blur-3xl -z-10" />

              {/* Portrait image floating cleanly with no bounding card or dark shadow box */}
              <Image
                src={PROFILE.portraitUrl}
                alt={`Portrait of ${PROFILE.name}`}
                fill
                priority
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, 430px"
                className="object-contain object-bottom filter contrast-[1.02]"
              />

              {/* Soft bottom fade smoothly into the ink background */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink via-ink/80 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade into the two-column content */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-ink to-transparent" />
    </section>
  );
}
