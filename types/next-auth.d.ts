import { DefaultSession } from "next-auth";

/**
 * Extend NextAuth type definitions
 * Add custom fields to session and user
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    iat?: number; // Issued at (timestamp)
    exp?: number; // Expiration time (timestamp)
  }
}
