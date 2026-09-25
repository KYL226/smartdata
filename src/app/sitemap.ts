import type { MetadataRoute } from "next";
import { db } from "@/lib/db";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const SERVICE_SLUGS = [
  "accompagnement-redaction-memoire-these",
  "collecte-donnees-extraction-web",
  "etude-marche",
  "visualisation-donnees",
  "formations-accompagnement",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/projets`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/a-propos`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/devis`, changeFrequency: "monthly", priority: 0.9 },
    ...SERVICE_SLUGS.map((slug) => ({
      url: `${baseUrl}/services/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  try {
    const projects = await db.project.findMany({
      where: { published: true },
      select: { id: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
      take: 200,
    });

    return [
      ...staticPages,
      ...projects.map((project) => ({
        url: `${baseUrl}/projets/${project.id}`,
        lastModified: project.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  } catch (error) {
    console.error("Error building sitemap:", error);
    return staticPages;
  }
}
