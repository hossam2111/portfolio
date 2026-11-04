"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PROFILE } from "@/data/profile";

// Fallback constellation for SSR, mobile, or reduced motion
function FallbackConstellation() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-40">
      <svg
        className="h-full w-full"
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="80" cy="70" r="3" fill="#00f0ff" />
        <circle cx="200" cy="120" r="4" fill="#ffffff" />
        <circle cx="320" cy="80" r="3" fill="#00f0ff" />
        <circle cx="120" cy="220" r="3" fill="#00d4e5" />
        <circle cx="280" cy="230" r="4" fill="#ffffff" />
        <line x1="80" y1="70" x2="200" y2="120" stroke="#00f0ff" strokeWidth="0.8" strokeOpacity="0.3" />
        <line x1="200" y1="120" x2="320" y2="80" stroke="#00f0ff" strokeWidth="0.8" strokeOpacity="0.3" />
        <line x1="80" y1="70" x2="120" y2="220" stroke="#00f0ff" strokeWidth="0.8" strokeOpacity="0.2" />
        <line x1="200" y1="120" x2="280" y2="230" stroke="#00f0ff" strokeWidth="0.8" strokeOpacity="0.3" />
      </svg>
    </div>
  );
}

const DynamicNeuralCanvas = dynamic(() => import("./NeuralNetwork3D"), {
  ssr: false,
  loading: () => <FallbackConstellation />,
});

export function NeuralNetworkHero() {
  const [shouldRender3D, setShouldRender3D] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt animation via Framer Motion
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springConfig);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(reducedMotionQuery.matches);

    const isMobile = window.innerWidth < 768;

    let webglAvailable = true;
    try {
      const canvas = document.createElement("canvas");
      webglAvailable = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch {
      webglAvailable = false;
    }

    if (!reducedMotionQuery.matches && !isMobile && webglAvailable) {
      setShouldRender3D(true);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="relative w-full [perspective:1000px]">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-surface-subtle/80 via-surface/60 to-[#06080d] p-1 shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-all duration-300 hover:border-accent/40 hover:shadow-[0_25px_60px_rgba(0,240,255,0.12)]"
      >
        {/* Ambient bottom cyan rim glow */}
        <div className="pointer-events-none absolute -bottom-16 inset-x-12 h-36 rounded-full bg-accent/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-60" />

        {/* Outer content container */}
        <div className="relative flex h-[380px] sm:h-[440px] w-full items-end justify-center overflow-hidden rounded-[22px] bg-[#07090e]">
          {/* Subtle grid background */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:28px_28px] opacity-10" />

          {/* 3D Neural Network background layer */}
          <div className="absolute inset-0 z-0 opacity-80 transition-opacity duration-300 group-hover:opacity-100">
            {shouldRender3D ? <DynamicNeuralCanvas /> : <FallbackConstellation />}
          </div>

          {/* Centerpiece: Portrait of Hossam Ali */}
          <div className="relative z-10 flex h-full w-full items-end justify-center pointer-events-none">
            <div className="relative h-[92%] sm:h-[95%] w-auto aspect-[796/1024]">
              <Image
                src={PROFILE.portraitUrl}
                alt={`Portrait of ${PROFILE.name}`}
                fill
                priority
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, 440px"
                className="object-contain object-bottom drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)] filter contrast-[1.03]"
              />
            </div>
          </div>

          {/* Soft bottom vignette fading smoothly into page background */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-[#06080d] via-[#06080d]/70 to-transparent" />

          {/* Top subtle identity badge */}
          <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-surface/80 px-3 py-1 text-xs font-mono text-slate-300 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] text-slate-300">{PROFILE.location}</span>
          </div>

          {/* Bottom name caption */}
          <div className="absolute bottom-3 left-4 right-4 z-30 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="text-white font-medium tracking-wide">
              {PROFILE.name}
            </span>
            <span className="text-accent text-[11px]">
              {PROFILE.shortRole}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
