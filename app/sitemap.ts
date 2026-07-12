import type { MetadataRoute } from "next";
import { professions } from "@/data/professions";
import { allSeoSlugs } from "@/data/seoPages";

export default function sitemap(): MetadataRoute.Sitemap {
  // Vercel's actual env var key is NEXT_PUBLIC_APP_URL (confirmed in dashboard).
  // Read both possible names so this survives either naming, and hardcode
  // the correct www host as the final fallback so it never silently
  // regresses to the bare domain (which costs an extra 308 redirect hop).
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://www.pancothink.com";
  const now = new Date().toISOString();

  // ── Original static routes (unchanged) ───────────────────────────────────
  const staticRoutes = [
    { path: "", freq: "daily", pri: 1.0 },
    { path: "/tools/sb988-late-payment-calculator", freq: "weekly", pri: 0.9 },
    { path: "/tools/sb988-contract-generator", freq: "weekly", pri: 0.9 },
    { path: "/tools/freelancer-contract-review", freq: "weekly", pri: 0.9 },
    { path: "/tools/irs-20-point-checklist-for-independent-contractors", freq: "weekly", pri: 0.85 },
    { path: "/pricing", freq: "weekly", pri: 0.8 },
  ] as const;

  // ── Original guide routes (unchanged) ────────────────────────────────────
  const guideRoutes = professions.map((p) => ({
    path: `/guides/${p.slug}`,
    freq: "weekly" as const,
    pri: 0.8,
  }));

  // ── NEW: Programmatic SEO hub + slug pages ────────────────────────────────
  const seoHubRoute = {
    path: "/freelance-contract",
    freq: "weekly" as const,
    pri: 0.85,
  };

  // First 20 slugs = hand-crafted seeds → higher priority
  const SEED_COUNT = 20;
  const seoSlugRoutes = allSeoSlugs.map((slug, i) => ({
    path: `/freelance-contract/${slug}`,
    freq: "monthly" as const,
    pri: i < SEED_COUNT ? 0.75 : 0.6,
  }));

  const allRoutes = [
    ...staticRoutes,
    ...guideRoutes,
    seoHubRoute,
    ...seoSlugRoutes,
  ];

  return allRoutes.map(({ path, freq, pri }) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority: pri,
  }));
}