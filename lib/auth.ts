import type { NextAuthOptions, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import type { Adapter } from "next-auth/adapters";

// Session 过期时间配置（7 天）
const SESSION_MAX_AGE = parseInt(process.env.SESSION_MAX_AGE || "604800", 10); // 默认 7 天（秒）

// Magic Link 验证 token 过期时间（15 分钟）
const VERIFICATION_TOKEN_MAX_AGE = 15 * 60; // 15 分钟（秒）

/**
 * 自定义 Adapter：延迟初始化 PrismaAdapter，并设置验证 token 15 分钟过期
 */
let prismaAdapter: Adapter | null = null;

function getPrismaAdapter(): Adapter {
  if (!prismaAdapter) {
    prismaAdapter = PrismaAdapter(prisma) as Adapter;
  }
  return prismaAdapter;
}

const customAdapter: Adapter = new Proxy({} as Adapter, {
  get(_target, prop, receiver) {
    if (prop === 'createVerificationToken') {
      return async function createVerificationToken(data: Parameters<
        NonNullable<Adapter['createVerificationToken']>
      >[0]) {
        const expires = new Date(Date.now() + VERIFICATION_TOKEN_MAX_AGE * 1000);
        return prisma.verificationToken.create({
          data: {
            identifier: data.identifier,
            token: data.token,
            expires,
          },
        });
      };
    }

    const adapter = getPrismaAdapter();
    const value = Reflect.get(adapter, prop, receiver);
    return typeof value === 'function' ? value.bind(adapter) : value;
  },
});

/**
 * NextAuth 配置
 * 支持邮箱验证码登录和密码登录
 */
export const authOptions: NextAuthOptions = {
  adapter: customAdapter,
  
  providers: [
    // 邮箱验证码登录（主要方式）
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      // 自定义邮件模板，防止 Gmail 包装链接
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const { server, from } = provider;
        const nodemailer = await import("nodemailer");
        const transport = nodemailer.createTransport(server);
        
        const result = await transport.sendMail({
          to: identifier,
          from: from,
          subject: "登录 Panco 法律助手",
          text: `点击以下链接登录 Panco 法律助手：\n\n${url}\n\n如果您没有请求此邮件，请忽略。`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>登录 Panco 法律助手</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                <tr>
                  <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%);">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Panco 法律助手</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="color: #1f2937; margin: 0 0 20px; font-size: 24px; font-weight: 600;">登录确认</h2>
                    <p style="color: #4b5563; margin: 0 0 30px; font-size: 16px; line-height: 1.6;">
                      点击下方按钮登录您的账户。此链接将在 15 分钟后过期。
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="text-align: center;">
                          <a href="${url}" target="_blank" rel="noreferrer noopener" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px;">
                            点击登录
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="color: #9ca3af; margin: 30px 0 0; font-size: 14px; line-height: 1.6;">
                      如果按钮无法点击，请复制以下链接到浏览器：
                    </p>
                    <p style="color: #8b5cf6; margin: 10px 0 0; font-size: 12px; word-break: break-all;">
                      <a href="${url}" target="_blank" rel="noreferrer noopener" style="color: #8b5cf6;">${url}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 30px; background-color: #f9fafb; text-align: center;">
                    <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                      如果您没有请求此邮件，请忽略。
                    </p>
                    <p style="color: #9ca3af; margin: 10px 0 0; font-size: 12px;">
                      © ${new Date().getFullYear()} Panco 法律助手
                    </p>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `,
        });
        
        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
          throw new Error(`邮件发送失败: ${failed.join(", ")}`);
        }
      },
    }),
    
    // 密码登录（可选）
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 查找用户
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password || !user.email) {
          return null;
        }

        // 简单的密码验证（生产环境应使用 bcrypt）
        if (user.password !== credentials.password) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],

  // 使用 JWT 会话策略
  session: {
    strategy: "jwt",
    maxAge: SESSION_MAX_AGE, // 7 天（可配置）
  },

  // Callbacks
  callbacks: {
    // Redirect callback: 处理登录后的跳转
    async redirect({ url, baseUrl }) {
      // 处理 Gmail 包装的 URL (google.com/url?q=...)
      try {
        const parsedUrl = new URL(url);
        
        // 如果是 Google 包装的 URL，跳回首页
        if (parsedUrl.hostname.includes("google.com")) {
          return baseUrl;
        }
        
        // 尝试从 Google 包装 URL 中提取原始链接
        if (parsedUrl.searchParams.has("q")) {
          const originalUrl = parsedUrl.searchParams.get("q");
          if (originalUrl && originalUrl.startsWith(baseUrl)) {
            return originalUrl;
          }
        }
      } catch {
        // URL 解析失败，使用默认逻辑
      }
      
      // 标准 NextAuth redirect 逻辑
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
    
    // JWT callback: 在创建或更新 JWT 时调用
    async jwt({ token, user }) {
      const now = Math.floor(Date.now() / 1000);
      
      // 首次登录时，user 对象可用，设置过期时间
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.iat = now; // 签发时间
        token.exp = now + SESSION_MAX_AGE; // 过期时间（7 天后）
      }
      
      // 检查 token 是否过期
      if (token.exp && token.exp < now) {
        // Token 已过期，返回 null 会导致 session 为 null
        return null as unknown as JWT;
      }
      
      return token;
    },

    // Session callback: 在获取 session 时调用
    async session({ session, token }) {
      // 如果 token 为 null 或过期，返回 null session（要求重新登录）
      if (!token) {
        return null as unknown as Session;
      }
      
      // 检查 token 是否过期
      const now = Math.floor(Date.now() / 1000);
      if (token.exp && token.exp < now) {
        // Session 已过期，返回 null 要求重新登录
        return null as unknown as Session;
      }
      
      // 正常情况，返回 session
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      
      return session;
    },
  },

  // 页面路径
  pages: {
    signIn: "/login",
    error: "/login",
    verifyRequest: "/login/verify",
  },

  // 调试（开发环境）
  debug: process.env.NODE_ENV === "development",

  // 密钥
  secret: process.env.NEXTAUTH_SECRET,
};
