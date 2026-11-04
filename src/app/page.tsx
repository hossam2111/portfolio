import React from "react";
import Link from "next/link";
import { PROFILE } from "@/data/profile";
import { HeroSection } from "@/components/HeroSection";
import { Navigation } from "@/components/Navigation";
import { SocialLinks } from "@/components/SocialLinks";
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
    <div className="min-h-screen bg-ink text-paper">
      {/* ======================================================== */}
      {/* FULL-VIEWPORT HERO SCENE (First Screen, Full Width)       */}
      {/* ======================================================== */}
      <HeroSection />

      {/* ======================================================== */}
      {/* TWO-COLUMN LAYOUT BELOW HERO (Sticky Left on lg+)         */}
      {/* ======================================================== */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 lg:px-16 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-16">
          {/* ---------------------------------------------------- */}
          {/* LEFT COLUMN: Sticky Header (Desktop lg+)              */}
          {/* ---------------------------------------------------- */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-5/12 lg:flex-col lg:justify-between lg:py-24">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-paper">
                <Link
                  href="/"
                  className="transition-colors hover:text-signal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
                >
                  {PROFILE.name}
                </Link>
              </h2>

              <p className="mt-3 text-base font-medium tracking-tight text-signal leading-snug">
                {PROFILE.shortRole}
              </p>

              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted font-sans">
                {PROFILE.shortTagline}
              </p>

              {/* In-page animated section navigation (lg+) */}
              <Navigation />
            </div>

            {/* Social Links & Curriculum Vitae */}
            <div className="mt-8 lg:mt-0 pt-6">
              <SocialLinks />
            </div>
          </header>

          {/* ---------------------------------------------------- */}
          {/* RIGHT COLUMN: Scrolling Content Sections             */}
          {/* ---------------------------------------------------- */}
          <main id="content" className="pt-12 lg:w-7/12 lg:py-24 space-y-24">
            {/* Real Stats Strip */}
            <section aria-label="Key metrics and career highlights">
              <StatStrip />
            </section>

            {/* Section: About */}
            <section
              id="about"
              className="scroll-mt-20 lg:scroll-mt-24 space-y-4"
              aria-label="About Hossam Ali"
            >
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-paper">
                About
              </h2>
              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-paper-dim font-sans max-w-prose">
                {PROFILE.bioParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Section: AI Training & Evaluation */}
            <section
              id="training-eval"
              className="scroll-mt-20 lg:scroll-mt-24 space-y-6"
              aria-label="AI Training and Evaluation"
            >
              <div className="space-y-1">
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-paper">
                  AI training and evaluation
                </h2>
                <p className="text-xs sm:text-sm text-muted font-sans max-w-prose">
                  Systematic verification across modalities, guidelines compliance, and multilingual rewriting.
                </p>
              </div>
              <TrainingSkillsSection />
            </section>

            {/* Section: Technical Stack */}
            <section
              id="tech-stack"
              className="scroll-mt-20 lg:scroll-mt-24 space-y-6"
              aria-label="Technical Stack"
            >
              <div className="space-y-1">
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-paper">
                  Technical stack
                </h2>
                <p className="text-xs sm:text-sm text-muted font-sans max-w-prose">
                  Core competencies spanning AI engineering, full-stack architectures, and industrial systems.
                </p>
              </div>
              <TechStackSection />
            </section>

            {/* Section: Experience (Timeline with thin vertical rule) */}
            <section
              id="experience"
              className="scroll-mt-20 lg:scroll-mt-24 space-y-6"
              aria-label="Work Experience"
            >
              <div className="space-y-1">
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-paper">
                  Experience
                </h2>
                <p className="text-xs sm:text-sm text-muted font-sans max-w-prose">
                  Track record building AI pipelines, cross-border workflows, and automated platforms.
                </p>
              </div>

              <div className="space-y-8 pt-2">
                {PROFILE.experience.map((exp, idx) => (
                  <ExperienceCard
                    key={idx}
                    experience={exp}
                    isLast={idx === PROFILE.experience.length - 1}
                  />
                ))}
              </div>

              {PROFILE.resumeUrl && (
                <div className="pt-4">
                  <a
                    href={PROFILE.resumeUrl}
                    download="Hossam_Ali_CV.pdf"
                    className="group inline-flex items-center gap-2 text-sm font-sans font-medium text-paper transition-colors hover:text-signal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
                  >
                    <span>Download complete curriculum vitae</span>
                    <ArrowUpRight className="h-4 w-4 text-signal transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              )}
            </section>

            {/* Section: Projects (The only cards, with restrained 3D perspective tilt) */}
            <section
              id="projects"
              className="scroll-mt-20 lg:scroll-mt-24 space-y-6"
              aria-label="Key Projects and Case Studies"
            >
              <div className="space-y-1">
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-paper">
                  Key projects
                </h2>
                <p className="text-xs sm:text-sm text-muted font-sans max-w-prose">
                  Deep-dive implementations in clinical AI diagnostics, cross-border automation, and heavy systems.
                </p>
              </div>

              <div className="space-y-8 pt-2">
                {PROFILE.projects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </section>

            {/* Section: Education & Certifications */}
            <section
              id="education"
              className="scroll-mt-20 lg:scroll-mt-24 space-y-6"
              aria-label="Education and Certifications"
            >
              <div className="space-y-1">
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-paper">
                  Education and certifications
                </h2>
                <p className="text-xs sm:text-sm text-muted font-sans max-w-prose">
                  Engineering degree foundation combined with continuous professional specialization.
                </p>
              </div>
              <EducationCertSection />
            </section>

            {/* Section: Languages & Global Reach */}
            <section
              id="languages-global"
              className="scroll-mt-20 lg:scroll-mt-24 space-y-6"
              aria-label="Languages and Global Reach"
            >
              <div className="space-y-1">
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-paper">
                  Languages and international exposure
                </h2>
                <p className="text-xs sm:text-sm text-muted font-sans max-w-prose">
                  Multilingual evaluation proficiency and operational experience across 10 countries.
                </p>
              </div>
              <LanguagesGlobalSection />
            </section>

            {/* Section: Contact */}
            <section
              id="contact"
              className="scroll-mt-20 lg:scroll-mt-24"
              aria-label="Contact Hossam Ali"
            >
              <ContactSection />
            </section>

            {/* Footer */}
            <footer className="border-t border-ink-border pt-8 pb-16 text-xs text-muted font-sans flex flex-col sm:flex-row items-center justify-between gap-3">
              <p>
                © {new Date().getFullYear()} {PROFILE.name}. Built with Next.js.
              </p>
              <p className="text-muted">
                {PROFILE.location}, {PROFILE.timezone}
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
