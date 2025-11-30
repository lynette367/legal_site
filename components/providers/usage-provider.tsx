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
      return { success: false, message: "请先登录账户以使用 Panco 法律助手" };
    }
    if (credits <= 0) {
      return { success: false, message: "没有可用次数，请前往套餐页充值" };
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
    throw new Error("useUsage 必须在 UsageProvider 中使用");
  }
  return ctx;
}
