"use client";

import { useSession } from "next-auth/react";
import { LoginPanel } from "./LoginPanel";
import { PageHero } from "../ui/PageHero";
import Link from "next/link";

/**
 * Login page content component
 * Renders different states based on authentication:
 * - Signed in: show dashboard entry
 * - Signed out: show email login form
 */
export function LoginPageContent() {
  const { data: session, status } = useSession();
  const isLoggedIn = !!session;
  const isLoading = status === "loading";

  // Loading state
  if (isLoading) {
    return (
      <>
        <PageHero
          overline="Account"
          title="User login"
          description="Checking your session status..."
          highlights={["Secure access", "No free credits", "Human verification"]}
        />
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-text-primary/60">
            <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Checking sign-in status...</span>
          </div>
        </div>
      </>
    );
  }

  // Signed in: show dashboard entry
  if (isLoggedIn) {
    return (
      <>
        <PageHero
          overline="Account"
          title="User login"
          description="You are signed in and can go directly to the dashboard."
          highlights={["Secure access", "No free credits", "Human verification"]}
        />
        <div className="flex justify-center">
          <div className="w-full max-w-md rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
            <div className="text-center">
              {/* Success icon */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-text-primary">You are signed in</h2>
              <p className="mt-3 text-text-primary/70">
                Current account: <span className="font-medium text-text-lavender">{session.user?.email}</span>
              </p>
              <p className="mt-2 text-sm text-text-primary/60">
                You are signed in and can open the dashboard directly.
              </p>

              <div className="mt-8">
                <Link
                  href="/dashboard"
                  className="block w-full rounded-full bg-primary-lavender px-6 py-3 font-semibold text-white transition hover:bg-primary-lavender-dark"
                >
                  Go to dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Signed out: show email login form
  return (
    <>
      <PageHero
        overline="Account"
        title="User login"
        description="Sign in with your email; the first login auto-creates an account. After signing in, view remaining credits and make calls. No free credits are provided; all credits come from bundles or pay-per-use."
        highlights={["Secure access", "No free credits", "Human verification"]}
      />
      <div className="flex justify-center">
        <LoginPanel />
      </div>
    </>
  );
}
