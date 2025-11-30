import NextAuth, { DefaultSession } from "next-auth";

/**
 * 扩展 NextAuth 类型定义
 * 添加自定义字段到 session 和 user
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
    iat?: number; // 签发时间（Issued At）
    exp?: number; // 过期时间（Expiration Time）
  }
}

