"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface UsageContextValue {
  isLoggedIn: boolean;
  email: string;
  credits: number;
  login: (email: string) => void;
  logout: () => void;
  consumeCredit: () => { success: boolean; message?: string };
  addCredits: (count: number) => void;
}

const UsageContext = createContext<UsageContextValue | undefined>(undefined);

export function UsageProvider({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState("");
  const [credits, setCredits] = useState(0);
  const isLoggedIn = Boolean(email);

  const login = useCallback((nextEmail: string) => {
    setEmail(nextEmail);
    setCredits(0);
  }, []);

  const logout = useCallback(() => {
    setEmail("");
    setCredits(0);
  }, []);

  const consumeCredit = useCallback(() => {
    if (!isLoggedIn) {
      return { success: false, message: "Please sign in to use Panco Legal Assistant." };
    }
    if (credits <= 0) {
      return { success: false, message: "No credits available. Please purchase more on the pricing page." };
    }
    setCredits((prev) => Math.max(prev - 1, 0));
    return { success: true };
  }, [credits, isLoggedIn]);

  const addCredits = useCallback((count: number) => {
    setCredits((prev) => prev + count);
  }, []);

  const value = useMemo(
    () => ({
      isLoggedIn,
      email,
      credits,
      login,
      logout,
      consumeCredit,
      addCredits,
    }),
    [isLoggedIn, email, credits, login, logout, consumeCredit, addCredits],
  );

  return <UsageContext.Provider value={value}>{children}</UsageContext.Provider>;
}

export function useUsage() {
  const ctx = useContext(UsageContext);
  if (!ctx) {
    throw new Error("useUsage must be used within a UsageProvider");
  }
  return ctx;
}
