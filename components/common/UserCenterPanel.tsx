"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const FREE_ACCESS_EMAIL = "yqying95@gmail.com";

/**
 * User dashboard panel
 * Displays user info and contract credits
 */
export function UserCenterPanel() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [remainingContracts, setRemainingContracts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeveloper, setIsDeveloper] = useState(false);

  const userEmail = session?.user?.email?.toLowerCase();

  useEffect(() => {
    if (userEmail === FREE_ACCESS_EMAIL.toLowerCase()) {
      setIsDeveloper(true);
      setRemainingContracts(-1);
    } else if (session?.user?.id) {
      fetchContracts();
    }
  }, [session, userEmail]);

  const fetchContracts = async () => {
    try {
      const response = await fetch("/api/credits/me");
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setRemainingContracts(data.remainingContracts);
        }
      }
    } catch (error) {
      console.error("Failed to fetch contracts:", error);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: "/" });
  };

  const handleLogin = () => {
    router.push("/login");
  };

  if (status === "loading") {
    return (
      <div className="w-full max-w-md rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
        <div className="flex items-center justify-center py-8">
          <div className="text-text-primary/60">Loading...</div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="w-full max-w-md rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">User dashboard</h2>
          <p className="text-text-primary/70 mb-6">
            Sign in to access contract generation and other AI features.
          </p>
          <button
            onClick={handleLogin}
            className="w-full rounded-full bg-primary-lavender px-6 py-3 font-semibold text-white transition hover:bg-primary-lavender-dark"
          >
            Sign in / Register
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary">User dashboard</h2>
      </div>

      {isDeveloper && (
        <div className="mb-6 rounded-2xl border-2 border-green-500 bg-green-50 p-4">
          <p className="font-semibold text-green-700">🛠️ Developer Mode</p>
          <p className="text-sm text-green-600/80 mt-1">Unlimited contract generation enabled</p>
        </div>
      )}

      <div className="mb-6 rounded-2xl border border-border-lavender/80 bg-white/90 p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-lavender/20 text-primary-lavender">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-text-primary">
              {session.user.name || "User"}
            </p>
            <p className="text-sm text-text-primary/70">{session.user.email}</p>
          </div>
        </div>
      </div>

      {!isDeveloper && (
        <div className="mb-6 rounded-2xl border border-border-lavender/80 bg-gradient-to-br from-primary-lavender/10 to-primary-lavender/5 p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-text-lavender">Contract credits</span>
            <button
              onClick={fetchContracts}
              className="text-xs text-text-lavender hover:underline"
            >
              Refresh
            </button>
          </div>

          <div className="mb-4">
            <p className="text-4xl font-bold text-text-lavender">
              {remainingContracts}
              <span className="text-lg font-normal text-text-primary/60 ml-1">contracts</span>
            </p>
          </div>

          <div className="mb-3 rounded-xl bg-white/60 p-3 text-xs text-text-primary/70">
            <p className="font-semibold text-text-lavender mb-1">💡 How it works</p>
            <p>Each contract generation uses 1 credit.</p>
            <p>Purchase more credits anytime.</p>
          </div>

          <button
            onClick={() => router.push("/pricing")}
            className="w-full rounded-full bg-primary-lavender px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-lavender-dark"
          >
            Buy contract credits
          </button>
        </div>
      )}

      <div className="mb-6 text-center">
        <p className="text-sm text-text-primary/70">
          {isDeveloper
            ? "All AI features are free to use"
            : "Other AI features are free to use"}
        </p>
      </div>

      <button
        onClick={handleSignOut}
        disabled={isLoading}
        className="w-full rounded-full border border-red-200 bg-red-50 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Signing out..." : "Sign out"}
      </button>
    </div>
  );
}