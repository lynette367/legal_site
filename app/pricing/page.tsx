import type { Metadata } from "next";
import { Suspense } from "react";
import { PricingContent } from "../../components/pricing/PricingContent";

export const metadata: Metadata = {
  title: "Pricing | Panco Legal Assistant",
  description: "No free quota. Pay per use or via credit bundles; successful payments automatically add calls.",
};

export default function PricingPage() {
  return (
    <div className="space-y-10">
      <Suspense fallback={<div className="h-64 animate-pulse bg-primary-lavender/5 rounded-3xl" />}>
        <PricingContent />
      </Suspense>
    </div>
  );
}
