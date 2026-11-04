# Hossam Ali — Portfolio

A performance-focused personal portfolio website engineered from scratch for **Hossam Ali** (Human AI Trainer & Evaluator, AI Systems Engineer, and Full-Stack Developer).

## Visual Identity & Architecture
- **Layout**: Two-column Brittany Chiang-inspired desktop layout with sticky bio & interactive navigation; single responsive column on mobile with portrait integration.
- **Interactions**: Rauno Freiberg-style micro-interactions, including a `⌘K` / `Ctrl+K` command palette, cursor radial spotlight, magnetic hover states, and live local-time status chip (Cairo / UTC+2).
- **Hero & 3D Centerpiece**: High-resolution portrait centerpiece paired with a 3D neural-network / attention topology visualization built with Three.js and `@react-three/fiber` (lazy-loaded with `next/dynamic`, capped DPR, paused offscreen, with static SVG fallback for reduced motion and unsupported devices).
- **Stat Strip**: Real metrics highlighting 5+ years of systems experience, 10 countries of project delivery, 4 languages, and >90% placement success rate.
- **Accent Color**: Electric Cyan (`#00f0ff`) over a deep near-black background (`#07080a`) with subtle grain.
- **Typography**: Geist Sans & Geist Mono via the `geist` npm package (no network dependency at build time).

---

## Content Architecture
**All personal content, experience, projects, skills, and certifications live in:**
📁 `src/data/profile.ts`

No components contain hardcoded personal text. Modifying `profile.ts` updates the entire website, static routes, and SEO metadata.

---

## Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v20/v24)
- npm 9+

### Commands

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Lint codebase:**
   ```bash
   npm run lint
   ```

4. **Build production static export:**
   ```bash
   npm run build
   ```

5. **Start production server:**
   ```bash
   npm run start
   ```

---

## Case Studies
The project includes 4 real case study deep dives:
1. **Clinical AI Integration**: Hospital retinal screening deployment across Egypt and Turkey.
2. **Workforce Automation Platform**: Germany–MENA healthcare recruitment with >90% placement success rate.
3. **E-Learning Digital Infrastructure**: Scaling TechDeutsch Academy with ~40% manual processing reduction.
4. **Large-Scale Construction Operations**: Supervised 80 million m³ excavation logistics in Mostakbal City, Egypt.
