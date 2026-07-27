# Project Context (AI Helper Guide)

> For Web AI Assistants: read this file to quickly understand the workspace structure, integrations, schemas, and design constraints of this repository.

---

## 1. Project Goal & Architecture
This repository implements an AI-assisted legal SaaS aimed at helping California independent contractors and freelancers with SB 988–related guidance, contract drafting, clause review, and small-claims tooling.
- **Tech stack (core)**: Next.js 14 (App Router), React 18, TypeScript, NextAuth v4 (with Prisma adapter), Prisma v5, Tailwind CSS, Nodemailer for passwordless email, PayPal Checkout Server SDK for payments, and the OpenAI SDK used in compatibility mode to call DeepSeek (model: `deepseek-chat`).
- **AI strategy**: Uses a lightweight DeepSeek wrapper (lib/ai/deepseek.ts) with OpenAI SDK compatibility to generate drafts, analyses, and guidance. Calls are guarded by a credits flow (see below).
- **SEO & content strategy**: Programmatic SSG/SSRs driven by local TS data files (data/seoPages.ts, professions.ts, plans.ts) to generate many landing pages.

---

## 2. Directory Structure & Key Files (high level)
```
legal-law-site/ (repo root)
├── app/                        # Next.js App Router routes & pages
│   ├── api/                    # Server API endpoints (ai, auth, credits, paypal, etc.)
│   │   ├── ai/                 # AI endpoints (contract generation, clause review)
│   │   ├── auth/               # NextAuth handlers
│   │   ├── credits/            # credits status / deduction endpoints
│   │   └── paypal/             # PayPal order create / capture endpoints
│   ├── dashboard/              # User account center
│   ├── compliance/             # Compliance / laws landing pages (renamed from older paths)
│   ├── contracts/              # Programmatic contract/landing engine (100+ slugs)
│   ├── guides/                 # Guides and SB988 checklists
│   ├── login/                  # Passwordless email verification page
│   ├── pricing/                # Plan & pricing pages
│   ├── tools/                  # Interactive tools (late-payment-calculator, generators)
│   ├── layout.tsx              # Root HTML wrapper
│   ├── page.tsx                # Homepage
│   └── providers.tsx           # NextAuth / payment providers & contexts
├── components/                 # UI components: common, guides, modules, tools, ui
├── data/                       # SSG data: plans.ts, professions.ts, seoPages.ts
├── lib/                        # Singletons & wrappers (auth.ts, prisma.ts, ai/deepseek.ts, paypal/)
├── prisma/                     # Prisma schema and migrations
├── package.json                # project metadata & scripts (build runs `prisma generate && next build`)
└── next.config.js              # redirects and Next.js configuration
```

Notes from the codebase:
- app/ contains providers.tsx and page.tsx at the root. The `contracts` and `compliance` directories replace older `freelance-contract` and `independent-contractor-laws` names.
- Data files used for programmatic pages live in data/ (plans.ts, seoPages.ts, professions.ts).
- The DeepSeek wrapper is implemented at lib/ai/deepseek.ts and initializes an OpenAI-compatible client using env vars.

---

## 3. Database Schema (Prisma)
The Prisma schema (prisma/schema.prisma) follows NextAuth models plus order tracking:
- **User**: standard NextAuth fields plus `remainingContracts Int @default(0)` used as the credits balance for AI calls.
- **Order**: tracks purchases with `paypalOrderId`, `amount`, `status` ("pending", "completed", "failed"), createdAt, and relation to User.
- **Account**, **Session**, **VerificationToken**: NextAuth models are present and linked to User.

Implementation notes:
- `remainingContracts` is the single source of truth for available AI/contract credits. The code expects deductions to be performed and persisted atomically prior to making external AI requests.
- Prisma datasource is PostgreSQL (env: DATABASE_URL).

---

## 4. Key Logic & Rules

### Redirect & Domain Rules
- Redirect rules are implemented in next.config.js (see file). Several legacy routes are mapped to new paths (e.g., `/tools/sb988-contract-generator` -> `/contracts/generator`, `/independent-contractor-laws` -> `/compliance`).
- Canonical site is served at the public domain (indielegalterms.com). Vercel edge / CDN redirects are expected to be configured outside the repo for apex->www behaviour if required.

### Authentication & Credits Flow
- Authentication: passwordless email magic links (NextAuth). Magic-link verification tokens and sessions follow typical NextAuth lifecycles.
- Protected server API endpoints (e.g., `/api/ai/*`, `/api/credits/*`) validate sessions server-side (getServerSession or equivalent).
- Credits deduction: each AI/DeepSeek invocation is intended to cost 1 credit. The codebase enforces that the DB deduction (decrement `remainingContracts`) is persisted before the external AI call to avoid race conditions.

### AI Integration
- The project uses a DeepSeek-compatible workflow via lib/ai/deepseek.ts. The OpenAI SDK is used in compatibility mode; the wrapper expects `DEEPSEEK_API_KEY` and optional `DEEPSEEK_API_BASE`.
- Model string used in code: `deepseek-chat`.

---

## 5. Deployment & Important Environment Variables
Key env vars referenced in the repo (see .env.example):
- NEXTAUTH_URL — production should point to `https://indielegalterms.com`, locally `http://localhost:3000`.
- NEXTAUTH_SECRET — secret used by NextAuth.
- NEXT_PUBLIC_APP_URL — public app URL used in client code (e.g., `http://localhost:3000` in dev).
- NEXT_PUBLIC_PAYPAL_CLIENT_ID — public PayPal client id used on the client.
- DATABASE_URL — Postgres connection string (Supabase or other provider).
- DEEPSEEK_API_KEY — API key for DeepSeek compatibility layer.
- DEEPSEEK_API_BASE — optional base URL for DeepSeek (default `https://api.deepseek.com`).
- PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET / PAYPAL_MODE — PayPal credentials and mode (sandbox|live).
- EMAIL_SERVER / EMAIL_FROM — SMTP settings for magic links and notification emails.
- SESSION_MAX_AGE — session lifetime (optional override).

Build & developer scripts:
- `npm run dev` — start dev server
- `npm run build` — runs `prisma generate` then `next build`
- `npm run studio` / `db:*` scripts use dotenv-cli with .env.local by default

---

## 6. Where to look for common changes
- API & credit flows: app/api/credits/* and lib/prisma.ts
- AI prompts and templates: lib/ai/deepseek.ts (PROMPTS constant)
- Programmatic SEO pages: data/seoPages.ts and app/contracts (or other programmatic routes)
- Redirects: next.config.js
- Env examples: .env.example

---

If any of the above should be further expanded, corrected, or translated into a checklist for maintainers (or CI checks), indicate which sections to revise and the assistant will apply targeted edits and open a diff for review.