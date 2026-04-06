"use client";

import { SessionProvider } from "next-auth/react";

/**
 * NextAuth Session Provider
 * Wraps the app to provide session support
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
