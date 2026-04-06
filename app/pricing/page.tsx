import type { Metadata } from "next";
import { Suspense } from "react";
import { PricingContent } from "../../components/pricing/PricingContent";
import { PageHero } from "../../components/ui/PageHero";

export const metadata: Metadata = {
  title: "Pricing | Panco Legal Assistant",
  description: "No free quota. Pay per use or via credit bundles; successful payments automatically add calls.",
};

export default function PricingPage() {
  return (
    <div className="space-y-10">
      <PageHero
        overline="Pricing"
        title="Purchase bundles or pay per use"
        description="Each legal Q&A, dispute plan, document, or contract request is billed server-side."
        highlights={["Per use", "Bundles", "Unified payment"]}
      />
      <Suspense fallback={<div className="h-64 animate-pulse bg-primary-lavender/5 rounded-3xl" />}>
        <PricingContent />
      </Suspense>
    </div>
  );
}
