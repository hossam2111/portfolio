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
        ink: {
          DEFAULT: "#0F1626",
          raised: "#16203A",
          hover: "#1F2C4E",
          border: "rgba(236, 232, 223, 0.08)",
          "border-subtle": "rgba(236, 232, 223, 0.04)",
        },
        paper: {
          DEFAULT: "#ECE8DF",
          dim: "#D2CDC2",
          muted: "#B8B3A8",
        },
        muted: {
          DEFAULT: "#9AA3B5",
          dark: "#727B8E",
          light: "#B8C1D4",
        },
        signal: {
          DEFAULT: "#F2A93B",
          hover: "#FBBF5D",
          muted: "rgba(242, 169, 59, 0.15)",
          subtle: "rgba(242, 169, 59, 0.08)",
          border: "rgba(242, 169, 59, 0.3)",
          glow: "rgba(242, 169, 59, 0.4)",
        },
        correction: {
          DEFAULT: "#E4572E",
          subtle: "rgba(228, 87, 46, 0.15)",
          border: "rgba(228, 87, 46, 0.35)",
        },
      },
      fontFamily: {
        sans: ["'IBM Plex Sans'", "system-ui", "-apple-system", "sans-serif"],
        display: [
          "'Bricolage Grotesque Variable'",
          "'Bricolage Grotesque'",
          "system-ui",
          "sans-serif",
        ],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      maxWidth: {
        prose: "75ch",
      },
    },
  },
  plugins: [],
};

export default config;
