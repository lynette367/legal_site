import type { MetadataRoute } from "next";
import { professions } from "@/data/professions";

const baseUrl = "https://panco-ai-legal-assistant.example.com";

// Existing static routes
const staticRoutes = [
  "",
  "/legal-qa",
  "/dispute",
  "/documents",
  "/contracts",
  "/explain",
  "/pricing",
  "/pricing/success",
  "/login",
  "/dashboard",
];

// Dynamic guide routes based on professions
const guideRoutes = professions.map((p) => `/guides/${p.slug}`);

const allRoutes = [...staticRoutes, ...guideRoutes];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  return allRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
