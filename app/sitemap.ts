import type { MetadataRoute } from "next";
import { professions } from "@/data/professions";
import { allSeoSlugs } from "@/data/seoPages";
import { allComplianceSlugs } from "@/data/stateComplianceData";

export default function sitemap(): MetadataRoute.Sitemap {
  // Vercel's actual env var key is NEXT_PUBLIC_APP_URL (confirmed in dashboard).
  // Read both possible names so this survives either naming, and hardcode
  // the correct www host as the final fallback so it never silently
  // regresses to the bare domain (which costs an extra 308 redirect hop).
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://indielegalterms.com";
  const now = new Date().toISOString();

  // ── Original static routes (unchanged) ───────────────────────────────────
  const staticRoutes = [
    { path: "", freq: "daily", pri: 1.0 },
    { path: "/tools/late-payment-calculator", freq: "weekly", pri: 0.9 },
    { path: "/contracts/generator", freq: "weekly", pri: 0.9 },
    { path: "/tools/freelancer-contract-review", freq: "weekly", pri: 0.9 },
    // Was missing entirely — confirmed via GSC "Page indexing" that Google had
    // never discovered this URL (not in indexed OR not-indexed reports).
    // It already has real query impressions (irs 20 point / classification
    // rule 2026) and now carries the new 1099 vs W-2 cost calculator too.
    { path: "/tools/ca-contractor-laws", freq: "weekly", pri: 0.9 },
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
    path: "/contracts",
    freq: "weekly" as const,
    pri: 0.85,
  };

  // First 20 slugs = hand-crafted seeds → higher priority
  const SEED_COUNT = 20;
  const seoSlugRoutes = allSeoSlugs.map((slug, i) => ({
    path: `/contracts/${slug}`,
    freq: "monthly" as const,
    pri: i < SEED_COUNT ? 0.75 : 0.6,
  }));

  // ── Multi-state worker classification cluster ────────────────────────────
  // Was missing entirely (no import from stateComplianceData.ts at all) —
  // this is the other confirmed non-discovery gap: Washington/Oregon pages
  // already have internal links but were never in the sitemap.
  const complianceHubRoute = {
    path: "/compliance",
    freq: "weekly" as const,
    pri: 0.8,
  };

  const complianceSlugRoutes = allComplianceSlugs.map((slug) => ({
    path: `/compliance/${slug}`,
    freq: "monthly" as const,
    pri: 0.7,
  }));

  const allRoutes = [
    ...staticRoutes,
    ...guideRoutes,
    seoHubRoute,
    ...seoSlugRoutes,
    complianceHubRoute,
    ...complianceSlugRoutes,
  ];

  return allRoutes.map(({ path, freq, pri }) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority: pri,
  }));
}