export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * NextAuth API 路由处理器
 * 处理所有 /api/auth/* 请求
 */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

