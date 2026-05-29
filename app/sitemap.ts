import type { MetadataRoute } from "next";
import { professions } from "@/data/professions";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pancothink.com";
  const now = new Date().toISOString();

  // High-value core pages (removing old, irrelevant, or private routes)
  const staticRoutes = [
    "",
    "/tools/sb988-late-payment-calculator",
    "/tools/sb988-contract-generator",
    "/tools/freelancer-contract-review",
    "/pricing"
  ];

  // Dynamic guide routes based on professions
  const guideRoutes = professions.map((p) => `/guides/${p.slug}`);

  const allRoutes = [...staticRoutes, ...guideRoutes];

  return allRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : path.startsWith("/tools/") ? 0.9 : 0.8,
  }));
}
