export { default } from "next-auth/middleware";

/**
 * NextAuth Middleware
 * 保护需要登录的路由
 */
export const config = {
  matcher: [
    // 用户相关页面
    "/dashboard/:path*",
    
    // AI 功能页面
    "/legal-qa/:path*",
    "/explain/:path*",
    "/documents/:path*",
    "/contracts/:path*",
    "/dispute/:path*",
    
    // API 路由
    "/api/credits/:path*",
    "/api/ai/:path*",
  ],
};

