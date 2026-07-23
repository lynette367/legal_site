# Indie.com Project Context (AI Helper Guide)

> **For Web AI Assistants**: Read this file to instantly understand the workspace structure, integrations, schemas, and design constraints of this project.

---

## 1. Project Goal & Architecture
Indie.com is a specialized AI-powered Legal SaaS platform tailored for California independent contractors and freelancers to protect themselves under the **California Freelance Worker Protection Act (SB 988)**.
- **Tech Stack**: Next.js 14 (App Router), NextAuth (v4 via custom prisma adapter), Prisma (ORM), Supabase (Postgres Database on Production), TailwindCSS, PayPal API, Nodemailer (SMTP Verification).
- **Core Strategy**: Programmatic SEO. Uses local TS files containing metadata arrays to pre-render 125+ pages during build.

---

## 2. Directory Structure & Key Files
```
Indie.com/
├── app/                        # Next.js App Router Routes & Pages
│   ├── api/                    # Backend API endpoints
│   │   ├── ai/contract/        # AI contract generation endpoint (DeepSeek)
│   │   ├── auth/               # NextAuth authentication handlers
│   │   ├── ccpa-paid/          # Paid ccpa check/review webhook/handlers
│   │   ├── credits/            # Credits status (me) and usage deduction (use)
│   │   └── paypal/             # PayPal Orders API creation & capture endpoints
│   ├── dashboard/              # User account center panel
│   ├── freelance-contract/     # Programmatic SEO landing engine (100+ slugs)
│   ├── guides/                 # 加州 SB 988 industry guides & checklists
│   ├── login/                  # Passwordless email verification page
│   ├── pricing/                # Plan pricing packages
│   ├── tools/                  # Interactive legal tool pages
│   │   ├── freelancer-contract-review/   # AI Clause analysis tool
│   │   ├── sb988-contract-generator/     # $250+ contract creator tool
│   │   └── sb988-late-payment-calculator/# 2x double damages calculator
│   ├── layout.tsx              # Root HTML wrapper
│   ├── page.tsx                # Homepage (LightweightScenarioEngine entry)
│   └── providers.tsx          # NextAuth & PayPal context configuration
├── components/                 # UI Component Hierarchy
│   ├── common/                # Shared layout blocks (UserCenterPanel, header/footer)
│   ├── guides/                # Guidance pages components (WaitlistButton)
│   ├── modules/               # AI module panels
│   ├── tools/                 # Client UI tools (SB988PenaltyCalculator)
│   ├── ui/                    # Base visual tokens (Buttons, Panels)
│   ├── CopyCard.tsx           # Text clipboard box
│   └── ScenarioTool.tsx       # State engine container
├── data/                       # Dynamic SSG configs
│   ├── plans.ts               # Package costs and contract tokens definitions
│   ├── professions.ts         # Mapping list for /guides/[slug] pages
│   └── seoPages.ts            # Index of 100+ programmatically generated slugs
├── lib/                        # Singletons & Client Wrappers
│   ├── auth.ts                # NextAuth setup and verification expiry (15m)
│   ├── prisma.ts              # PrismaClient instance
│   ├── ai/deepseek.ts         # OpenAI-compatible DeepSeek Client (deepseek-chat)
│   └── paypal/                # PayPal client credential validation tools
├── prisma/                     # Database Model Configurations
│   └── schema.prisma          # PostgreSQL connection schema
└── middleware.ts              # Next.js middleware (Redirect rules for legacy tools)
```

---

## 3. Database Schema (Prisma)
The database uses standard NextAuth models along with transaction-specific ones:
- **`User`**: Core user accounts. Contains **`remainingContracts` (Int, defaults to 0)** which acts as the credits token balance for calling DeepSeek. No standalone credit logs table is used.
- **`Order`**: Order tracking. Records `paypalOrderId`, `amount`, and payment `status` ("pending", "completed", "failed").
- **`Account`**, **`Session`**, **`VerificationToken`**: NextAuth verification lifecycle. (Passwordless magic-link logs expire in 15 minutes).

---

## 4. Key Logic & Rules

### Domain & Redirect Rules
- **Canonical Domain**: Always include `www` (e.g. `https://indielegalterms.com/`).
- **CDN Redirect**: Vercel is configured to handle `indielegalterms.com` -> `indielegalterms.com` redirect at the CDN edge level using a `308 Permanent Redirect`.
- **next.config.js Redirect**: Legacy paths (e.g. `/tools/california-freelance-legal-templates` -> `/contracts`) are mapped programmatically in `next.config.js` to prevent 404s.

### Authentication & Credits Flow
- **Authentication**: Done passwordlessly via SMTP email verification.
- **Protected Paths**: Requests to API endpoints (`/api/ai/*`, `/api/credits/*`) check `getServerSession(authOptions)` server-side.
- **Deduction Rule**: Every call to the DeepSeek client costs **1 Credit** (`remainingContracts`). The database deduction MUST be executed and committed successfully *before* calling the DeepSeek API to prevent credit theft or overflow.

---

## 5. Deployment & Vercel Env Vars
The deployment relies on the following key environment variables:
- `NEXT_PUBLIC_SITE_URL` - Set to `https://indielegalterms.com` on Vercel.
- `NEXTAUTH_URL` - Set to `https://indielegalterms.com` in production, and `http://localhost:3000` in local dev.
- `DATABASE_URL` - Connection string to PostgreSQL (Supabase pooler).
- `DEEPSEEK_API_KEY` - Token for AI generation client.
- `EMAIL_SERVER` - SMTP URI string for sending magic links.
