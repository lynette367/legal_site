"use client";

import { SessionProvider } from "next-auth/react";

/**
 * NextAuth Session Provider
 * 包裹整个应用以提供 session 支持
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

