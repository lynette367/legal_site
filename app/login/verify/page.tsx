import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Verification Email Sent | Panco Legal Assistant",
  description: "Check your inbox to complete sign-in.",
};

/**
 * Email verification request page
 * Shown after the user submits an email address
 */
export default function VerifyRequestPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft text-center">
        {/* Mail icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-lavender to-primary-lavender-dark">
          <svg
            className="h-10 w-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h1 className="mb-4 text-2xl font-bold text-text-primary">
          Verification email sent
        </h1>

        <p className="mb-6 text-text-primary/70">
          We just sent a sign-in email to your inbox.
          <br />
          Click the link in the message to complete login.
        </p>

        <div className="mb-6 rounded-xl bg-amber-50 border border-amber-200 p-4">
          <p className="text-sm text-amber-700">
            <strong>Tip:</strong> If the message is missing, check your spam folder. Delivery can take a few minutes.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/login"
            className="block w-full rounded-full border border-border-lavender px-6 py-3 font-semibold text-text-primary transition hover:bg-gray-50"
          >
            Back to login
          </Link>

          <Link
            href="/"
            className="block text-sm text-primary-lavender hover:underline"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
