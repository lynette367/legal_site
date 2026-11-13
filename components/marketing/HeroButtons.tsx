"use client";

import Link from "next/link";

export function HeroButtons() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
      <Link
        href="/contracts/generator"
        className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary-lavender text-white font-bold text-base shadow-md hover:bg-primary-lavender-dark transition-all text-center flex items-center justify-center gap-2 group"
      >
        <span>Generate My Agreement Now</span>
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </Link>

      <Link
        href="/tools/late-payment-calculator"
        className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-gray-300 text-gray-800 font-bold text-base shadow-xs hover:border-primary-lavender hover:text-primary-lavender transition-all text-center flex items-center justify-center gap-2"
      >
        <span>🧮 Calculate Late Payment Penalties</span>
      </Link>
    </div>
  );
}
