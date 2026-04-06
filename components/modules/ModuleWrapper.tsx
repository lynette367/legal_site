"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Shared logic wrapper for AI modules
 * Handles credit consumption and authentication
 */
export function useAIModule() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Call an AI API (credits are deducted server-side)
   * @param apiEndpoint - AI API endpoint path (e.g., "/api/ai/legal-qa")
   * @param payload - Request payload
   * @returns AI content and status info
   */
  const callAIApi = async (
    apiEndpoint: string,
    payload: Record<string, unknown>
  ): Promise<{ success: boolean; message: string; answer?: string }> => {
    // Check auth status
    if (status === "loading") {
      return { success: false, message: "Loading user info..." };
    }

    if (!session) {
      router.push("/login");
      return { success: false, message: "Please sign in first." };
    }

    setIsProcessing(true);

    try {
      // Call AI API (server deducts credits)
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login");
          return { success: false, message: "Please sign in first." };
        }
        if (response.status === 402) {
          return {
            success: false,
            message: "Insufficient credits. Please purchase more.",
          };
        }
        return { success: false, message: data.error || "AI request failed." };
      }

      if (data.success) {
        return {
          success: true,
          message: "AI response generated.",
          answer: data.answer,
        };
      }

      return { success: false, message: "AI request failed." };
    } catch (error) {
      console.error("AI API error:", error);
      return { success: false, message: "Network error. Please try again." };
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Backward-compatible helper for non-AI modules
   * @deprecated Prefer using callAIApi
   */
  const consumeCreditsAndExecute = async (
    description: string,
    onSuccess: () => void
  ): Promise<{ success: boolean; message: string }> => {
    if (status === "loading") {
      return { success: false, message: "Loading user info..." };
    }

    if (!session) {
      router.push("/login");
      return { success: false, message: "Please sign in first." };
    }

    setIsProcessing(true);

    try {
      const response = await fetch("/api/credits/use", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 1,
          description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/login");
          return { success: false, message: "Please sign in first." };
        }
        if (response.status === 400 && data.error?.includes("balance")) {
          return {
            success: false,
            message: "Insufficient credits. Please purchase more.",
          };
        }
        return { success: false, message: data.error || "Billing failed." };
      }

      if (data.success) {
        onSuccess();
        return {
          success: true,
          message: `Deducted 1 credit. Remaining: ${data.credits.remainingCredits} credits.`,
        };
      }

      return { success: false, message: "Billing failed." };
    } catch (error) {
      console.error("Credits consumption error:", error);
      return { success: false, message: "Network error. Please try again." };
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    session,
    isLoggedIn: !!session,
    isProcessing,
    callAIApi,
    consumeCreditsAndExecute, // Compatibility helper
  };
}
