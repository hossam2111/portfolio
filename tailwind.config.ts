import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#07080a",
        surface: {
          DEFAULT: "#0d0f15",
          subtle: "#12151f",
          hover: "#171a26",
        },
        accent: {
          DEFAULT: "#00f0ff", // Electric Cyan
          hover: "#38f4ff",
          muted: "rgba(0, 240, 255, 0.15)",
          subtle: "rgba(0, 240, 255, 0.06)",
          border: "rgba(0, 240, 255, 0.25)",
          glow: "rgba(0, 240, 255, 0.4)",
        },
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.08)",
          strong: "rgba(255, 255, 255, 0.15)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "beacon": "beacon 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        beacon: {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "70%, 100%": { transform: "scale(2.5)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
