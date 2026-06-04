'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface ScenarioLink {
  id: string;
  path: 'freelancer' | 'business';
  text: string;
  href: string;
  badge: string;
}

const SCENARIO_LINKS: ScenarioLink[] = [
  // Freelancer Path
  {
    id: 'freelancer_a',
    path: 'freelancer',
    text: "Client hasn't paid my invoice for over 30 days.",
    href: "/tools/sb988-late-payment-calculator?scenario=invoice-overdue-30",
    badge: "Calculator"
  },
  {
    id: 'freelancer_b',
    path: 'freelancer',
    text: "Client wants to start work but refuses to sign a written contract.",
    href: "/tools/sb988-contract-generator?scenario=refuses-written-contract",
    badge: "Generator"
  },
  {
    id: 'freelancer_c',
    path: 'freelancer',
    text: "The project is over $250, am I fully protected by CA law?",
    href: "/guides/sb988-small-claims-guide?scenario=fully-protected-250",
    badge: "Litigation Guide"
  },
  // Business Path
  {
    id: 'business_a',
    path: 'business',
    text: "I want to hire an independent contractor in CA safely.",
    href: "/tools/sb988-contract-generator?scenario=hire-contractor-safely&mode=business",
    badge: "Generator"
  },
  {
    id: 'business_b',
    path: 'business',
    text: "How to avoid the $250 threshold compliance trap?",
    href: "/tools/sb988-late-payment-calculator?scenario=avoid-250-trap&mode=business",
    badge: "Simulator"
  }
];

export default function LightweightScenarioEngine() {
  const [activePath, setActivePath] = useState<'freelancer' | 'business'>('freelancer');
  const currentLinks = SCENARIO_LINKS.filter(s => s.path === activePath);

  return (
    <div className="max-w-3xl mx-auto w-full">
      {/* Toggle Engine Paths */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {/* Freelancer Path Tab */}
        <button
          onClick={() => setActivePath('freelancer')}
          className={`group text-left p-5 rounded-2xl border transition-all duration-300 ${
            activePath === 'freelancer'
              ? 'border-red-500 bg-gradient-to-br from-white to-red-50/10 shadow-sm ring-4 ring-red-500/5'
              : 'border-gray-200 bg-white hover:border-red-200 hover:-translate-y-0.5'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className={`p-2.5 rounded-lg text-xl transition-all ${
              activePath === 'freelancer' ? 'bg-red-500 text-white' : 'bg-red-50 text-red-500'
            }`}>
              🧑‍💻
            </span>
            <div>
              <h3 className="font-black text-gray-900 text-sm">California Freelancer</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">Protect your pay, IP rights & damages</p>
            </div>
          </div>
        </button>

        {/* Business Path Tab */}
        <button
          onClick={() => setActivePath('business')}
          className={`group text-left p-5 rounded-2xl border transition-all duration-300 ${
            activePath === 'business'
              ? 'border-blue-600 bg-gradient-to-br from-white to-blue-50/10 shadow-sm ring-4 ring-blue-600/5'
              : 'border-gray-200 bg-white hover:border-blue-200 hover:-translate-y-0.5'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className={`p-2.5 rounded-lg text-xl transition-all ${
              activePath === 'business' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'
            }`}>
              🏢
            </span>
            <div>
              <h3 className="font-black text-gray-900 text-sm">CA Business & Client</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">Avoid 2x damages & compliance audits</p>
            </div>
          </div>
        </button>
      </div>

      {/* List of Triggers */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 text-left">
          Select your scenario to run the compliance action flow:
        </p>
        <div className="space-y-3">
          {currentLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="w-full flex items-center justify-between text-left p-4 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50/80 hover:border-gray-300 transition-all group hover:translate-x-1"
            >
              <div className="flex items-center gap-3">
                <span className="text-base shrink-0">
                  {activePath === 'freelancer' ? '🔴' : '🔵'}
                </span>
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
