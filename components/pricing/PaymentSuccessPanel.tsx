"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface PaymentSuccessPanelProps {
  contracts?: number;
}

export function PaymentSuccessPanel({ contracts = 1 }: PaymentSuccessPanelProps) {
  const { data: session } = useSession();
  const [currentContracts, setCurrentContracts] = useState(0);

  useEffect(() => {
    const fetchContracts = async () => {
      if (!session) return;

      try {
        const response = await fetch("/api/credits/me");
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setCurrentContracts(data.remainingContracts);
          }
        }
      } catch (error) {
        console.error("Failed to fetch contracts:", error);
      }
    };

    fetchContracts();
  }, [session]);

  return (
    <div className="rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-green-600">Payment successful</p>
        <h1 className="mt-3 text-3xl font-semibold text-text-primary">
          {contracts} Contract Credit{contracts > 1 ? "s" : ""} Added
        </h1>
        <p className="mt-2 text-sm text-text-primary/70">
          Your payment has been confirmed and contract credits were added to your account.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-border-lavender/70 bg-white/80 p-4">
        <p className="text-xs text-text-primary/70">Current contract balance</p>
        <p className="text-2xl font-bold text-text-lavender">{currentContracts} credits</p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Link
          href="/dashboard"
          className="w-full rounded-full border border-border-lavender px-6 py-3 text-center text-sm font-semibold text-text-primary hover:border-primary-lavender"
        >
          Go to Dashboard
        </Link>
        <Link
          href="/tools/sb988-contract-generator"
          className="w-full rounded-full bg-primary-lavender px-6 py-3 text-center text-sm font-semibold text-white hover:bg-primary-lavender-dark"
        >
          Generate Contract Now
        </Link>
      </div>
    </div>
  );
}