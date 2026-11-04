import { MetadataRoute } from "next";
import { PROFILE } from "@/data/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = PROFILE.meta.siteUrl;

  const projectRoutes = PROFILE.projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    ...projectRoutes,
  ];
}
