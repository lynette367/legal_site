"use client";

import { useState, useCallback } from "react";
import { signIn } from "next-auth/react";

interface LoginPanelProps {
  onClose?: () => void;
}

/**
 * Login panel component
 * For sending sign-in emails when the user is not authenticated
 */
export function LoginPanel({ onClose }: LoginPanelProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleEmailLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email format
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      console.log("[LoginPanel] Starting sign-in flow, email:", email);
      
      const result = await signIn("email", {
        email: email.trim().toLowerCase(),
        redirect: false,
        callbackUrl: "/dashboard",
      });

      console.log("[LoginPanel] signIn result:", result);

      if (result?.error) {
        console.error("[LoginPanel] Sign-in error:", result.error);
        if (result.error === "EmailSignin") {
          setError("Email delivery failed. Please check SMTP settings or try again.");
        } else if (result.error === "Configuration") {
          setError("Server configuration error. Please contact the administrator.");
        } else {
          setError(`Sign-in failed: ${result.error}`);
        }
      } else if (result?.ok) {
        setMessage("✅ Verification email sent! Please check your inbox, including the spam folder.");
      } else {
        setError("Sign-in request failed. Please try again later.");
      }
    } catch (err) {
      console.error("[LoginPanel] Sign-in exception:", err);
      setError("Network error. Please check your connection and retry.");
    } finally {
      setIsLoading(false);
    }
  }, [email]);

  return (
    <div className="w-full max-w-md rounded-3xl border border-border-lavender bg-bg-card p-8 shadow-soft">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary">Sign in / Register</h2>
        <p className="mt-2 text-sm text-text-primary/70">
          Sign in with your email; the first login will auto-create an account.
        </p>
        <p className="mt-1 text-sm text-text-primary/60">
          Complete sign-in through the magic link sent to your inbox.
        </p>
      </div>

      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            disabled={isLoading}
            className="w-full rounded-xl border border-border-lavender bg-white px-4 py-3 text-text-primary placeholder:text-text-primary/40 focus:border-primary-lavender focus:outline-none focus:ring-2 focus:ring-primary-lavender/20 disabled:opacity-50"
          />
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {message && (
          <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-600">
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !email}
          className="w-full rounded-full bg-primary-lavender px-6 py-3 font-semibold text-white transition hover:bg-primary-lavender-dark disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
              Sending...
            </>
          ) : (
            "Send sign-in email"
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-text-primary/60">
        <p>By clicking &quot;Send sign-in email&quot; you agree to our</p>
        <p className="mt-1">
          <a href="/terms" className="text-primary-lavender hover:underline">
            Terms of Service
          </a>
          {" and "}
          <a href="/privacy" className="text-primary-lavender hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="mt-4 w-full rounded-full border border-border-lavender px-6 py-3 font-semibold text-text-primary transition hover:bg-gray-50"
        >
          Cancel
        </button>
      )}
    </div>
  );
}
