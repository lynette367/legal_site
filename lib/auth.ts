import type { NextAuthOptions, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import type { Adapter } from "next-auth/adapters";

// Session expiration configuration (defaults to 7 days)
const SESSION_MAX_AGE = parseInt(process.env.SESSION_MAX_AGE || "604800", 10); // default 7 days in seconds

// Magic link verification token expiration (15 minutes)
const VERIFICATION_TOKEN_MAX_AGE = 15 * 60; // 15 minutes in seconds

/**
 * Custom adapter: extend PrismaAdapter to set verification token expiry to 15 minutes
 * Lazily initialized to avoid connecting during build
 */
function createCustomAdapter(): Adapter {
  const baseAdapter = PrismaAdapter(prisma) as Adapter;
  
  return {
    ...baseAdapter,
    async createVerificationToken(data) {
      // Set expiry to 15 minutes instead of the 24-hour default
      const expires = new Date(Date.now() + VERIFICATION_TOKEN_MAX_AGE * 1000);
      
      // Create verification token via Prisma with custom expiry
      const token = await prisma.verificationToken.create({
        data: {
          identifier: data.identifier,
          token: data.token,
          expires,
        },
      });
      
      return token;
    },
  };
}

// Lazy init adapter; create only when needed
let customAdapter: Adapter | null = null;

function getAdapter(): Adapter {
  if (!customAdapter) {
    customAdapter = createCustomAdapter();
  }
  return customAdapter;
}

const decodeEmailServer = (server?: string | null) => {
  if (!server) return server ?? undefined;
  try {
    return decodeURI(server);
  } catch (error) {
    console.warn("Failed to decode EMAIL_SERVER, using raw value.", error);
    return server;
  }
};

const decodedEmailServer = decodeEmailServer(process.env.EMAIL_SERVER);

/**
 * NextAuth configuration
 * Supports email magic links and password login
 */
export const authOptions: NextAuthOptions = {
  adapter: getAdapter(),
  
  providers: [
    // Email magic link sign-in (primary)
    EmailProvider({
      server: decodedEmailServer,
      from: process.env.EMAIL_FROM,
      // Custom email template to avoid Gmail wrapping links
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const { server, from } = provider;
        const nodemailer = await import("nodemailer");
        const serverConfig =
          decodedEmailServer ??
          (typeof server === "string" ? decodeEmailServer(server) : server);

        if (!serverConfig) {
          throw new Error("Email server configuration is missing.");
        }

        const transport = nodemailer.createTransport(serverConfig);

        try {
          const result = await transport.sendMail({
            to: identifier,
            from: from,
            subject: "Sign in to Panco Legal Assistant",
            text: `Click the link below to sign in to Panco Legal Assistant:\n\n${url}\n\nIf you did not request this email, you can ignore it.`,
            html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Sign in to Panco Legal Assistant</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                <tr>
                  <td style="padding: 40px 30px; text-align: center; background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%);">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Panco Legal Assistant</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="color: #1f2937; margin: 0 0 20px; font-size: 24px; font-weight: 600;">Sign-in confirmation</h2>
                    <p style="color: #4b5563; margin: 0 0 30px; font-size: 16px; line-height: 1.6;">
                      Click the button below to sign in. This link expires in 15 minutes.
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="text-align: center;">
                          <a href="${url}" target="_blank" rel="noreferrer noopener" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px;">
                            Sign in
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="color: #9ca3af; margin: 30px 0 0; font-size: 14px; line-height: 1.6;">
                      If the button above does not work, copy and paste this link into your browser:
                    </p>
                    <p style="color: #8b5cf6; margin: 10px 0 0; font-size: 12px; word-break: break-all;">
                      <a href="${url}" target="_blank" rel="noreferrer noopener" style="color: #8b5cf6;">${url}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 30px; background-color: #f9fafb; text-align: center;">
                    <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                      If you did not request this email, you can safely ignore it.
                    </p>
                    <p style="color: #9ca3af; margin: 10px 0 0; font-size: 12px;">
                      © ${new Date().getFullYear()} Panco Legal Assistant
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
            console.error("Verification email rejected:", failed);
            throw new Error("EmailSignin");
          }
        } catch (error) {
          console.error("Failed to send verification email:", error);
          // Ensure error is thrown so NextAuth can handle it
          const errorMessage = error instanceof Error ? error.message : "Failed to send email";
          throw new Error(errorMessage === "EmailSignin" ? "EmailSignin" : "EmailSignin");
        }
      },
    }),
    
    // Password login (optional)
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

        // Look up user
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password || !user.email) {
          return null;
        }

        // Simple password check (use bcrypt in production)
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

  // Use JWT session strategy
  session: {
    strategy: "jwt",
    maxAge: SESSION_MAX_AGE, // configurable (defaults to 7 days)
  },

  // Callbacks
  callbacks: {
    // Redirect callback: handle post-login redirects
    async redirect({ url, baseUrl }) {
      // Handle Gmail-wrapped URLs (google.com/url?q=...)
      try {
        const parsedUrl = new URL(url);
        
        // If Google-wrapped URL, return home
        if (parsedUrl.hostname.includes("google.com")) {
          return baseUrl;
        }
        
        // Try to extract original link from Google wrapper
        if (parsedUrl.searchParams.has("q")) {
          const originalUrl = parsedUrl.searchParams.get("q");
          if (originalUrl && originalUrl.startsWith(baseUrl)) {
            return originalUrl;
          }
        }
      } catch {
        // If URL parsing fails, fall back to defaults
      }
      
      // Standard NextAuth redirect logic
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
    
    // JWT callback: invoked on JWT creation or update
    async jwt({ token, user }) {
      const now = Math.floor(Date.now() / 1000);
      
      // On first login, set expiry and attach user info
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.iat = now; // issued at
        token.exp = now + SESSION_MAX_AGE; // expiry
      }
      
      // Check token expiry
      if (token.exp && token.exp < now) {
        // Token expired; returning null will clear the session
        return null as unknown as JWT;
      }
      
      return token;
    },

    // Session callback: invoked when retrieving a session
    async session({ session, token }) {
      // If token is missing, require a new login
      if (!token) {
        return null as unknown as Session;
      }
      
      // Check token expiry
      const now = Math.floor(Date.now() / 1000);
      if (token.exp && token.exp < now) {
        // Session expired; force sign-in
        return null as unknown as Session;
      }
      
      // Otherwise, return the session with attached user info
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      
      return session;
    },
  },

  // Page routes
  pages: {
    signIn: "/login",
    error: "/login",
    verifyRequest: "/login/verify",
  },

  // Debug (development)
  debug: process.env.NODE_ENV === "development",

  // Secrets
  secret: process.env.NEXTAUTH_SECRET,
};
