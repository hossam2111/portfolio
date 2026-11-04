import React from "react";
import Link from "next/link";
import { PROFILE } from "@/data/profile";
import { Navigation } from "@/components/Navigation";
import { SocialLinks } from "@/components/SocialLinks";
import { StatusChip } from "@/components/StatusChip";
import { NeuralNetworkHero } from "@/components/NeuralNetworkHero";
import { StatStrip } from "@/components/StatStrip";
import { TrainingSkillsSection } from "@/components/TrainingSkillsSection";
import { TechStackSection } from "@/components/TechStackSection";
import { ExperienceCard } from "@/components/ExperienceCard";
import { ProjectCard } from "@/components/ProjectCard";
import { EducationCertSection } from "@/components/EducationCertSection";
import { LanguagesGlobalSection } from "@/components/LanguagesGlobalSection";
import { ContactSection } from "@/components/ContactSection";
import { ArrowUpRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-16 lg:px-20 lg:py-0">
      <div className="lg:flex lg:justify-between lg:gap-12">
        {/* ======================================================== */}
        {/* LEFT COLUMN: Sticky Header (Desktop)                      */}
        {/* ======================================================== */}
        <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
          <div>
            {/* Live Status Chip */}
            <div className="mb-6">
              <StatusChip />
            </div>

            {/* Display Name & Title */}
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              <Link href="/" className="transition-colors hover:text-accent">
                {PROFILE.name}
              </Link>
            </h1>

            <h2 className="mt-3 text-base sm:text-lg font-medium tracking-tight text-accent leading-snug">
              {PROFILE.title}
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              {PROFILE.shortTagline}
            </p>

            {/* In-page animated section navigation (lg+) */}
            <Navigation />
          </div>

          {/* Social Links & Resume */}
          <div className="mt-8 lg:mt-0">
            <SocialLinks />
          </div>
        </header>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: Scrolling Sections                          */}
        {/* ======================================================== */}
        <main id="content" className="pt-16 lg:w-1/2 lg:py-24 space-y-20">
          {/* Hero Portrait & 3D Attention Topology + Stat Strip */}
          <section aria-label="Portrait and Neural Visualization" className="space-y-4">
            <NeuralNetworkHero />
            <StatStrip />
          </section>

          {/* Section: About */}
          <section
            id="about"
            className="scroll-mt-16 lg:scroll-mt-24"
            aria-label="About me"
          >
            <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/80 px-6 py-4 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                {"// ABOUT"}
              </h2>
            </div>
            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-300">
              {PROFILE.bioParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Section: AI Training & Evaluation */}
          <section
            id="training-eval"
            className="scroll-mt-16 lg:scroll-mt-24"
            aria-label="AI Training and Evaluation"
          >
            <div className="sticky top-0 z-20 -mx-6 mb-6 w-screen bg-background/80 px-6 py-4 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                {"// AI TRAINING & EVALUATION"}
              </h2>
            </div>
            <div className="mb-6 hidden lg:block">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                {"// AI TRAINING & EVALUATION SKILLS"}
              </span>
            </div>
            <TrainingSkillsSection />
          </section>

          {/* Section: Technical Stack */}
          <section
            id="tech-stack"
            className="scroll-mt-16 lg:scroll-mt-24"
            aria-label="Technical Stack"
          >
            <div className="sticky top-0 z-20 -mx-6 mb-6 w-screen bg-background/80 px-6 py-4 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                {"// TECHNICAL STACK"}
              </h2>
            </div>
            <div className="mb-6 hidden lg:block">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                {"// TECHNICAL STACK & FRAMEWORKS"}
              </span>
            </div>
            <TechStackSection />
          </section>

          {/* Section: Experience (Timeline Cards with Sibling Dimming) */}
          <section
            id="experience"
            className="scroll-mt-16 lg:scroll-mt-24"
            aria-label="Work Experience"
          >
            <div className="sticky top-0 z-20 -mx-6 mb-6 w-screen bg-background/80 px-6 py-4 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                {"// EXPERIENCE"}
              </h2>
            </div>
            <div className="mb-6 hidden lg:block">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                {"// INDUSTRY TRACK RECORD"}
              </span>
            </div>
            <div className="group/list space-y-6">
              {PROFILE.experience.map((exp, idx) => (
                <ExperienceCard key={idx} experience={exp} />
              ))}
            </div>

            {PROFILE.resumeUrl && (
              <div className="mt-8">
                <a
                  href={PROFILE.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-200 transition-colors hover:text-accent focus-visible:text-accent"
                >
                  <span>View Full Curriculum Vitae</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-accent" />
                </a>
              </div>
            )}
          </section>

          {/* Section: Projects */}
          <section
            id="projects"
            className="scroll-mt-16 lg:scroll-mt-24"
            aria-label="Key Projects"
          >
            <div className="sticky top-0 z-20 -mx-6 mb-6 w-screen bg-background/80 px-6 py-4 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                {"// PROJECTS"}
              </h2>
            </div>
            <div className="mb-6 hidden lg:block">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                {"// KEY PROJECTS & CASE STUDIES"}
              </span>
            </div>
            <div className="group/list space-y-8">
              {PROFILE.projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>

          {/* Section: Education & Certifications */}
          <section
            id="education"
            className="scroll-mt-16 lg:scroll-mt-24"
            aria-label="Education and Certifications"
          >
            <div className="sticky top-0 z-20 -mx-6 mb-6 w-screen bg-background/80 px-6 py-4 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                {"// EDUCATION & CERTS"}
              </h2>
            </div>
            <div className="mb-6 hidden lg:block">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                {"// EDUCATION & CERTIFICATIONS"}
              </span>
            </div>
            <EducationCertSection />
          </section>

          {/* Section: Languages & International Exposure */}
          <section
            id="languages-global"
            className="scroll-mt-16 lg:scroll-mt-24"
            aria-label="Languages and Global Exposure"
          >
            <div className="sticky top-0 z-20 -mx-6 mb-6 w-screen bg-background/80 px-6 py-4 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                {"// LANGUAGES & GLOBAL"}
              </h2>
            </div>
            <div className="mb-6 hidden lg:block">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                {"// LANGUAGES & INTERNATIONAL EXPOSURE"}
              </span>
            </div>
            <LanguagesGlobalSection />
          </section>

          {/* Section: Contact */}
          <section
            id="contact"
            className="scroll-mt-16 lg:scroll-mt-24"
            aria-label="Contact"
          >
            <div className="sticky top-0 z-20 -mx-6 mb-6 w-screen bg-background/80 px-6 py-4 backdrop-blur md:-mx-12 md:px-12 lg:sr-only">
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                {"// CONTACT"}
              </h2>
            </div>
            <ContactSection />
          </section>

          {/* Short elegant footer */}
          <footer className="border-t border-white/5 pt-8 pb-16 text-xs font-mono text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>
              © {new Date().getFullYear()} {PROFILE.name}. Built with Next.js.
            </p>
            <p className="text-slate-400">
              {PROFILE.location} • {PROFILE.timezone}
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
