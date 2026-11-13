'use client';

import React from 'react';
import Link from 'next/link';

interface ScenarioLink {
  id: string;
  text: string;
  href: string;
  badge: string;
}

const SCENARIO_LINKS: ScenarioLink[] = [
  {
    id: 'freelancer_a',
    text: "Client hasn't paid my invoice for over 30 days.",
    href: "/tools/late-payment-calculator?scenario=invoice-overdue-30",
    badge: "Calculator"
  },
  {
    id: 'freelancer_b',
    text: "Client wants to start work but refuses to sign a written contract.",
    href: "/contracts/generator?scenario=refuses-written-contract",
    badge: "Generator"
  },
  {
    id: 'freelancer_c',
    text: "The project is over $250, am I fully protected by CA law?",
    href: "/guides/ca-contractor-small-claims?scenario=fully-protected-250",
    badge: "Litigation Guide"
  }
];

export default function LightweightScenarioEngine() {
  return (
    <div className="max-w-3xl mx-auto w-full">
      {/* List of Triggers */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 text-left">
          Select your scenario to run the compliance action flow:
        </p>
        <div className="space-y-3">
          {SCENARIO_LINKS.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="w-full flex items-center justify-between text-left p-4 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50/80 hover:border-gray-300 transition-all group hover:translate-x-1"
            >
              <div className="flex items-center gap-3">
                <span className="text-base shrink-0">🔴</span>
                <span className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-primary-lavender transition-colors">
                  {link.text}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-400 group-hover:bg-primary-lavender/10 group-hover:text-primary-lavender transition-all">
                  {link.badge}
                </span>
                <span className="text-base transition-transform group-hover:translate-x-0.5">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
