"use client";

import { useState } from "react";
import Link from "next/link";
import { EmailCaptureModal } from "./EmailCaptureModal";

export function HeroButtons() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
        <Link
          href="#scenario-engine"
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

        <button
          onClick={() => setIsModalOpen(true)}
          type="button"
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-base shadow-xs hover:bg-emerald-100 hover:border-emerald-300 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>📋 Get the Free Payment Protection Checklist</span>
        </button>
      </div>

      <EmailCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        source="hero_lead_magnet"
      />
    </>
  );
}
