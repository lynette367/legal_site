"use client";

import { useState } from "react";
import Link from "next/link";
import { StateFreelanceLaw } from "@/data/freelanceLawsByState";

interface StateLawGridProps {
  states: StateFreelanceLaw[];
  todayDateStr: string;
}

export default function StateLawGrid({ states, todayDateStr }: StateLawGridProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {states.map((item, index) => {
          const isHidden = !isExpanded && index >= 6;
          return (
            <div
              key={item.code}
              className={`bg-bg-card border border-border-lavender rounded-xl p-5 shadow-soft flex flex-col justify-between transition-all duration-300 ${
                isHidden ? "hidden" : "block animate-in"
              }`}
            >
              <div>
                {/* Card header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="font-bold text-text-primary text-base leading-tight">
                    {item.state}
                  </h3>
                  <span className="bg-primary-lavender/10 text-text-lavender text-xs font-medium rounded-full px-2 py-1 shrink-0">
                    {item.code}
                  </span>
                </div>

                {/* Body - status dependent */}
                {item.status === "verified-has-law" && (
                  <div className="space-y-2 text-xs text-text-primary/80">
                    {item.lawName && (
                      <div>
                        <span className="font-semibold text-text-primary">Law: </span>
                        <span>{item.lawName}</span>
                      </div>
                    )}
                    {item.effectiveDate && (
                      <div>
                        <span className="font-semibold text-text-primary">Effective: </span>
                        <span>{item.effectiveDate}</span>
                      </div>
                    )}
                    {item.paymentThreshold && (
                      <div>
                        <span className="font-semibold text-text-primary">Threshold: </span>
                        <span>{item.paymentThreshold}</span>
                      </div>
                    )}
                    {item.paymentDeadline && (
                      <div>
                        <span className="font-semibold text-text-primary">Deadline: </span>
                        <span>{item.paymentDeadline}</span>
                      </div>
                    )}
                  </div>
                )}

                {item.status === "verified-no-law" && (
                  <div className="text-xs text-text-primary/80 leading-relaxed">
                    {item.note || "No statewide freelance payment protection law."}
                  </div>
                )}

                {item.status === "coming-soon" && (
                  <div className="pt-1">
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">
                      Coming soon
                    </span>
                  </div>
                )}

                {item.status === "not-yet-verified" && (
                  <div className="space-y-1.5 pt-1">
                    <span className="inline-block bg-gray-100 text-gray-500 text-xs font-medium px-2.5 py-1 rounded-full">
                      Not yet verified
                    </span>
                    <p className="text-xs text-gray-500 italic">
                      Not yet verified as of {todayDateStr}.
                    </p>
                  </div>
                )}
              </div>

              {/* Card Footer Link */}
              {item.detailPageSlug && (
                <div className="mt-4 pt-3 border-t border-border-lavender/50">
                  <Link
                    href={item.detailPageSlug}
                    className="text-xs font-bold text-text-lavender hover:text-primary-lavender-dark flex items-center gap-1 transition-colors"
                  >
                    Learn more <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Expand/Collapse Toggle */}
      <div className="text-center pt-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-2 rounded-full border border-border-lavender bg-white px-6 py-3 text-sm font-bold text-text-lavender hover:bg-primary-lavender/10 hover:border-primary-lavender shadow-soft transition-all"
        >
          {isExpanded ? "Show Less" : "View All 45 More States"}
        </button>
      </div>
    </div>
  );
}
