import type { MetadataRoute } from "next";

const baseUrl = "https://panco-ai-legal-assistant.example.com";

const routes = [
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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
