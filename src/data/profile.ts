export interface SocialLink {
  name: string;
  url: string;
  icon: "github" | "linkedin" | "mail";
}

export interface TrainingSkillGroup {
  id: string;
  title: string;
  summary: string;
  skills: string[];
  focusPill: string;
}

export interface TechnicalSkillCategory {
  category: string;
  skills: string[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  tags: string[];
}

export interface ProjectStat {
  label: string;
  value: string;
}

export interface ProjectDataset {
  name: string;
  size?: string;
  preprocessing?: string[];
}

export interface ProjectMethod {
  baseModel?: string;
  technique?: string;
  hyperparameters?: { name: string; value: string }[];
  architectureNotes?: string;
}

export interface Project {
  slug: string;
  title: string;
  oneLineSummary: string;
  problem: string;
  solution: string;
  highlightStats: string[];
  dataset?: ProjectDataset;
  method?: ProjectMethod;
  stackTags: string[];
  githubUrl?: string;
  demoUrl?: string;
  year: string;
  featured: boolean;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}

export interface Education {
  degree: string;
  institution: string;
  focus: string;
}

export interface LanguageItem {
  language: string;
  proficiency: string;
  level: string;
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export interface ProfileData {
  name: string;
  fullName: string;
  title: string;
  shortRole: string;
  shortTagline: string;
  statusText: string;
  isAvailableForWork: boolean;
  timezone: string;
  location: string;
  email: string;
  phone: string;
  showPhone: boolean;
  resumeUrl: string;
  portraitUrl: string;
  summary: string;
  bioParagraphs: string[];
  stats: StatItem[];
  socialLinks: SocialLink[];
  trainingSkills: TrainingSkillGroup[];
  technicalStack: TechnicalSkillCategory[];
  experience: ExperienceEntry[];
  projects: Project[];
  certifications: Certification[];
  education: Education;
  languages: LanguageItem[];
  internationalExposure: string[];
  meta: {
    siteUrl: string;
    siteTitle: string;
    siteDescription: string;
    keywords: string[];
  };
}

export const PROFILE: ProfileData = {
  name: "Hossam Ali",
  fullName: "Hossam Mohammed Tarfaia Ali",
  title: "Human AI Trainer & Evaluator | AI Engineer (LLMs · RAG · Agents) | Full-Stack Developer",
  shortRole: "AI Trainer & Evaluator",
  shortTagline:
    "Detail-oriented Human AI Trainer and Evaluator with a Mechanical & Industrial Engineering background, bringing precision to AI evaluation, prompt engineering, and multimodal verification.",
  statusText: "Available for STEM, coding & multilingual AI training",
  isAvailableForWork: true,
  timezone: "UTC+2",
  location: "Cairo, Egypt",
  email: "hm2111@fayoum.edu.eg",
  phone: "+20 115 779 8544",
  showPhone: false,
  resumeUrl: "/resume.pdf",
  portraitUrl: "/images/hossam-portrait.png",
  summary:
    "Detail-oriented Human AI Trainer and Evaluator with a Mechanical & Industrial Engineering degree and 5+ years building AI systems, full-stack applications, and automation. Brings an engineer's precision to reviewing and evaluating AI output across text, code, images, video, and translations — spotting errors, inconsistencies, and reasoning flaws, following detailed guidelines exactly, and rewriting AI-generated content into natural, human-quality language. Hands-on with LLM APIs (OpenAI, Claude, Gemini), prompt engineering, AI agents, and RAG, plus ML with scikit-learn, TensorFlow, and PyTorch, and full-stack development in React, Next.js, TypeScript, and Node.js. Native Arabic (Modern Standard & Egyptian), professional English (C1), working German (B1) — ready to contribute to STEM, coding, and Arabic-language AI training projects with high accuracy and independent remote work.",
  bioParagraphs: [
    "I am a Human AI Trainer, Evaluator, and AI Systems Engineer with a degree in Mechanical & Industrial Engineering and over 5 years of experience developing digital systems, cross-border workflows, and full-stack applications.",
    "I bring an engineer's systematic precision to reviewing and evaluating AI model outputs across text, code, images, video, and multilingual translations. My work centers on spotting subtle hallucinated facts, syntax or logical fallacies, reasoning breakdowns, and rubric deviations, while rewriting complex model outputs into idiomatic, human-quality language.",
    "On the engineering side, I build production workflows using OpenAI, Anthropic Claude, and Google Gemini APIs, craft LangChain and RAG pipelines, and integrate AI systems into regulated clinical and operational environments with high standards of data governance.",
  ],
  stats: [
    {
      value: "5+",
      label: "Years",
      description: "AI systems & automation",
    },
    {
      value: "10",
      label: "Countries",
      description: "Global project delivery",
    },
    {
      value: "4",
      label: "Languages",
      description: "AR · EN · DE · FR",
    },
    {
      value: ">90%",
      label: "Placement",
      description: "Healthcare workflow rate",
    },
  ],
  socialLinks: [
    {
      name: "Email",
      url: "mailto:hm2111@fayoum.edu.eg",
      icon: "mail",
    },
    {
      name: "LinkedIn",
      url: "",
      icon: "linkedin",
    },
    {
      name: "GitHub",
      url: "",
      icon: "github",
    },
  ],
  trainingSkills: [
    {
      id: "evaluation-qa",
      title: "AI Output Evaluation & Quality Assurance",
      summary:
        "Rigorous verification of generative AI output across modalities: assessing text clarity, code correctness, image/video faithfulness, visual observation, and logical consistency.",
      skills: [
        "Evaluating AI output (text, code, images & video)",
        "Visual observation & image description",
        "Detecting errors, inconsistencies & reasoning flaws",
        "Quality control & rigorous attention to detail",
      ],
      focusPill: "Multimodal Quality Control",
    },
    {
      id: "prompt-stem",
      title: "Prompt Engineering & STEM Challenges",
      summary:
        "Authoring complex, edge-case prompts in STEM, mathematical reasoning, and software development to probe model boundaries, stress-test logic, and test adherence to instructions.",
      skills: [
        "Writing challenging prompts for STEM & coding",
        "Following detailed guidelines & rubrics precisely",
        "Independent remote work & meticulous time management",
      ],
      focusPill: "STEM & Code Rubrics",
    },
    {
      id: "multilingual-review",
      title: "Multilingual Quality & Natural Rewriting",
      summary:
        "Human-level localization and post-editing: converting robotic, literal model phrasing into nuanced, culturally authentic, and contextually fluent language across three language pairs.",
      skills: [
        "Translation quality review (Arabic · English · German)",
        "Rewriting AI text into natural, human-quality language",
        "Arabic dialectal nuance (Modern Standard & Egyptian)",
      ],
      focusPill: "Arabic · English · German",
    },
    {
      id: "research-factchecking",
      title: "Research, Fact-Checking & Grounding",
      summary:
        "Cross-referencing claims against authoritative primary sources, verifying reference grounding, detecting hallucinations, and enforcing strict data accuracy across complex technical domains.",
      skills: [
        "Research, fact-checking & information analysis",
        "Identifying hallucinated reference sources and assertions",
        "Data governance & clinical verification alignment",
      ],
      focusPill: "Empirical Fact Verification",
    },
  ],
  technicalStack: [
    {
      category: "AI & LLMs",
      skills: [
        "OpenAI API",
        "Claude API",
        "Gemini API",
        "Prompt Engineering",
        "AI Agents",
        "LangChain",
        "RAG",
        "AI Workflow Design",
      ],
    },
    {
      category: "Machine Learning & Data",
      skills: [
        "scikit-learn",
        "TensorFlow",
        "PyTorch",
        "Data Pipelines",
        "Data Governance",
        "Quality Control",
      ],
    },
    {
      category: "Programming Languages",
      skills: ["Python", "TypeScript", "JavaScript", "Java", "C", "SQL"],
    },
    {
      category: "Frontend Development",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Responsive Web Design",
        "Tailwind CSS",
      ],
    },
    {
      category: "Backend & Databases",
      skills: [
        "Node.js",
        "Express",
        "REST APIs",
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "Firebase",
      ],
    },
    {
      category: "Automation & Operations",
      skills: [
        "n8n",
        "Zapier",
        "CRM Systems",
        "Analytics Dashboards",
        "API Integrations",
      ],
    },
    {
      category: "STEM & Engineering",
      skills: [
        "Mechanical & Industrial Engineering",
        "Process Optimization",
        "Systems Design",
        "Operations Management",
      ],
    },
  ],
  experience: [
    {
      role: "AI Systems & Integration Engineer",
      company: "VISTEL (Visionary Intelligence Ltd.)",
      period: "Mar 2025 — Present",
      location: "China / MENA",
      description:
        "Integrate AI-based retinal screening systems into hospital environments across Egypt and Turkey, supporting real-world clinical deployment.",
      achievements: [
        "Design robust data pipelines and integration workflows powering clinical AI diagnostic platforms.",
        "Act as technical liaison between European R&D teams and MENA health authorities, aligning technical architecture with medical regulatory frameworks.",
        "Established healthcare data governance processes enabling regulatory compliance of AI diagnostic tools.",
      ],
      tags: [
        "Clinical AI",
        "Retinal Screening",
        "Data Governance",
        "Hospital Integration",
        "Regulatory Compliance",
      ],
    },
    {
      role: "Head of Digital Projects & Automation",
      company: "TechDeutsch Academy",
      period: "2022 — 2024",
      location: "Germany",
      description:
        "Architected automated learning systems with CRM integration and analytics tracking, scaling educational infrastructure across Europe.",
      achievements: [
        "Built content-delivery infrastructure that scaled the platform from hundreds to thousands of users without added operational headcount.",
        "Reduced manual processing time by ~40% through custom n8n and Zapier automation pipelines.",
        "Led cross-functional technical teams spanning product design, software engineering, and digital operations.",
      ],
      tags: [
        "n8n",
        "Zapier",
        "CRM Integration",
        "Process Automation",
        "Analytics Dashboards",
        "Scaling",
      ],
    },
    {
      role: "Automation & Systems Architect",
      company: "Visionweg | VisaWelt | TransIt",
      period: "2021 — 2023",
      location: "Europe / GCC",
      description:
        "Designed a unified operational automation system managing cross-border administrative and technical operations across multiple countries.",
      achievements: [
        "Developed real-time tracking tools and workflow management systems for distributed cross-border teams.",
        "Delivered centralized CRM integrations and live performance dashboards used daily by operations personnel.",
        "Streamlined complex cross-border document compliance verification across European and GCC jurisdictions.",
      ],
      tags: [
        "Workflow Architecture",
        "Cross-Border Ops",
        "CRM Architecture",
        "Real-Time Dashboards",
        "Process Design",
      ],
    },
    {
      role: "Co-Founder & Systems Architect",
      company: "Wasel Team",
      period: "2020 — Present",
      location: "Egypt / Europe",
      description:
        "Engineered digital workflows, CRM systems, and operational tracking infrastructure from the ground up for international workforce deployment.",
      achievements: [
        "Built custom CRM systems, management dashboards, and operational tracking tools tailored for international teams.",
        "Engineered digital workflows for international workforce deployment and rigorous document-compliance verification.",
      ],
      tags: [
        "Full-Stack Development",
        "CRM Architecture",
        "Operational Dashboards",
        "Compliance Systems",
      ],
    },
  ],
  projects: [
    {
      slug: "clinical-ai-integration",
      title: "Clinical AI Integration: Hospital Retinal Screening",
      oneLineSummary:
        "Deployment of AI-based retinal screening systems into clinical hospital workflows across Egypt and Turkey.",
      problem:
        "Integrating sophisticated clinical AI diagnostics into legacy hospital environments requires strict healthcare data governance, localized medical staff workflows, and alignment between European engineering teams and MENA health authorities.",
      solution:
        "Architected secure, compliant data integration pipelines and hospital workflow integrations that ingest fundus imaging, run inference securely, and format diagnostic findings for attending clinicians while adhering to regional health privacy regulations.",
      highlightStats: [
        "Clinical Hospital Deployment",
        "Egypt & Turkey",
        "Healthcare Regulatory Compliance",
        "Data Pipeline Governance",
      ],
      stackTags: [
        "Clinical AI",
        "Retinal Screening",
        "Data Pipelines",
        "Healthcare Integration",
        "Regulatory Governance",
      ],
      year: "2025",
      featured: true,
    },
    {
      slug: "workforce-automation-platform",
      title: "Workforce Automation Platform: Germany–MENA Healthcare Recruitment",
      oneLineSummary:
        "Automated candidate review, document verification, and compliance tracking for healthcare professionals moving between MENA and Germany.",
      problem:
        "Recruiting and relocating qualified healthcare specialists from MENA to Germany involves strict regulatory hurdles, multi-lingual credential translations, and complex embassy document workflows with frequent manual delays.",
      solution:
        "Designed an end-to-end automated candidate intake, verification, and milestone-tracking platform that standardized communication, verified document completeness, and provided live status transparency to applicants and hospitals.",
      highlightStats: [
        ">90% Placement Success Rate",
        "Multi-Stage Document Verification",
        "Cross-Border MENA–Germany Workflows",
      ],
      stackTags: [
        "Process Automation",
        "CRM Architecture",
        "Document Compliance",
        "n8n",
        "Zapier",
        "Full-Stack",
      ],
      year: "2023",
      featured: true,
    },
    {
      slug: "elearning-digital-infrastructure",
      title: "E-Learning Digital Infrastructure & Platform Scaling",
      oneLineSummary:
        "Scalable educational infrastructure, automated CRM integrations, and analytics tracking for TechDeutsch Academy.",
      problem:
        "Rapid student enrollment outpaced manual onboarding, resulting in fragmented student tracking, slow support triage, and overhead across administrative teams.",
      solution:
        "Architected an automated student lifecycle engine connecting landing funnels, payment webhooks, CRM records, and automated course delivery, paired with real-time operational telemetry.",
      highlightStats: [
        "~40% Manual Processing Time Reduction",
        "Hundreds → Thousands of Users",
        "Zero Added Operations Overhead",
      ],
      stackTags: [
        "Infrastructure Scaling",
        "n8n Automation",
        "CRM Integration",
        "Analytics Dashboards",
        "Webhooks",
      ],
      year: "2024",
      featured: true,
    },
    {
      slug: "large-scale-construction-operations",
      title: "Large-Scale Construction Logistics Management: Mostakbal City",
      oneLineSummary:
        "Operational supervision and supply scheduling for 80 million m³ earthwork excavation contracts in Mostakbal City, Egypt.",
      problem:
        "Coordinating hundreds of heavy earthmoving machines, multi-party contractor obligations, and continuous material transport across expansive desert developments without logistic bottlenecks or downtime.",
      solution:
        "Implemented industrial systems engineering principles, fleet supply scheduling algorithms, and daily operational tracking dashboards to supervise contractor deliverables and meet stringent milestones.",
      highlightStats: [
        "80 Million m³ Excavation Volume",
        "Multi-Contractor Fleet Logistics",
        "Supply Scheduling Systems",
      ],
      stackTags: [
        "Industrial Engineering",
        "Operations Management",
        "Fleet Logistics",
        "Process Optimization",
        "Data Tracking",
      ],
      year: "2021",
      featured: true,
    },
  ],
  certifications: [
    {
      title: "Machine Learning Specialization",
      issuer: "Andrew Ng, Coursera",
      year: "2024",
    },
    {
      title: "AI For Everyone",
      issuer: "Andrew Ng, Coursera",
      year: "2024",
    },
    {
      title: "n8n Automation Fundamentals",
      issuer: "n8n Academy",
      year: "2024",
    },
    {
      title: "Zapier Automation Certification",
      issuer: "Zapier Learn",
      year: "2024",
    },
    {
      title: "JavaScript Algorithms & Data Structures",
      issuer: "freeCodeCamp",
      year: "2023",
    },
    {
      title: "Responsive Web Design",
      issuer: "freeCodeCamp",
      year: "2023",
    },
  ],
  education: {
    degree: "B.Sc. Mechanical Engineering",
    institution: "Fayoum University, Egypt",
    focus: "Industrial Systems Engineering Focus",
  },
  languages: [
    {
      language: "Arabic",
      proficiency: "Native",
      level: "Modern Standard & Egyptian",
    },
    {
      language: "English",
      proficiency: "Professional Working Proficiency",
      level: "C1",
    },
    {
      language: "German",
      proficiency: "Working Proficiency",
      level: "B1",
    },
    {
      language: "French",
      proficiency: "Basic",
      level: "A2",
    },
  ],
  internationalExposure: [
    "Egypt",
    "Germany",
    "China",
    "Saudi Arabia",
    "UAE",
    "Kuwait",
    "Uganda",
    "Zambia",
    "Kazakhstan",
    "United States",
  ],
  meta: {
    siteUrl: "https://hossam-ali.dev",
    siteTitle: "Hossam Ali — Human AI Trainer & AI Engineer",
    siteDescription:
      "Portfolio of Hossam Ali (Hossam Mohammed Tarfaia Ali) — Human AI Trainer & Evaluator, AI Engineer (LLMs, RAG, Agents), and Full-Stack Developer with Mechanical & Industrial Systems engineering background.",
    keywords: [
      "Hossam Ali",
      "Human AI Trainer",
      "AI Evaluator",
      "AI Engineer",
      "LLM Evaluation",
      "Prompt Engineering",
      "RAG",
      "AI Agents",
      "Multimodal Evaluation",
      "Full-Stack Developer",
      "Cairo Egypt",
    ],
  },
};
