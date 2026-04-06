"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface PaymentSuccessPanelProps {
  planName: string;
  credits: number;
}

export function PaymentSuccessPanel({ planName, credits }: PaymentSuccessPanelProps) {
  const { data: session } = useSession();
  const [currentCredits, setCurrentCredits] = useState(0);

  useEffect(() => {
    // Fetch latest Credits balance
    const fetchCredits = async () => {
      if (!session) return;
      
      try {
        const response = await fetch("/api/credits/me");
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setCurrentCredits(data.credits.remainingCredits);
          }
        }
      } catch (error) {
        console.error("Failed to fetch credits:", error);
      }
    };
    
    fetchCredits();
  }, [session]);

  return (
    <div className="rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
      <p className="text-sm font-semibold text-text-lavender">Payment successful (demo)</p>
      <h1 className="mt-3 text-3xl font-semibold text-text-primary">{planName} purchased</h1>
      <p className="mt-2 text-sm text-text-primary/70">Payment has been confirmed and credits were added automatically.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border-lavender/70 bg-white/80 p-4">
          <p className="text-xs text-text-primary/70">Plan credited</p>
          <p className="text-lg font-semibold text-text-primary">{planName}</p>
        </div>
        <div className="rounded-2xl border border-border-lavender/70 bg-white/80 p-4">
          <p className="text-xs text-text-primary/70">Credits added</p>
          <p className="text-lg font-semibold text-text-primary">+{credits}</p>
        </div>
        <div className="rounded-2xl border border-border-lavender/70 bg-white/80 p-4">
          <p className="text-xs text-text-primary/70">Current balance</p>
          <p className="text-lg font-semibold text-text-primary">{currentCredits}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-text-primary/80">
        All calls use a unified LLM API key on the backend; the frontend only initiates requests. Please complete the human verification checkbox inside each module before using credits.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/dashboard"
          className="rounded-full border border-border-lavender px-6 py-3 text-sm font-semibold text-text-primary hover:border-primary-lavender"
        >
          View dashboard
        </Link>
        <Link
          href="/legal-qa"
          className="rounded-full bg-primary-lavender px-6 py-3 text-sm font-semibold text-white hover:bg-primary-lavender-dark"
        >
          Use AI legal Q&A
        </Link>
      </div>
    </div>
  );
}
