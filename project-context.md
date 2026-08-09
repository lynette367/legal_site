# Project Context (AI Helper Guide)

> For Web AI Assistants: read this file to quickly understand the workspace structure, integrations, schemas, and design constraints of this repository.

---

## 1. Project Goal & Architecture
This repository implements an AI-assisted legal SaaS aimed at helping California independent contractors and freelancers with SB 988–related guidance, contract drafting, clause review, demand letter generation, and small-claims tooling.
- **Tech stack (core)**: Next.js 14 (App Router), React 18, TypeScript, NextAuth v4 (with Prisma adapter), Prisma v5, Tailwind CSS, Font Awesome icons, jsPDF (PDF export), Nodemailer for passwordless email, PayPal Checkout Server SDK for payments, and the OpenAI SDK used in compatibility mode to call DeepSeek (model: `deepseek-chat`).
- **AI strategy**: Uses a lightweight DeepSeek wrapper (`lib/ai/deepseek.ts`) with OpenAI SDK compatibility to generate drafts, analyses, and guidance. The wrapper performs lazy client initialization (only on invocation, never at build time) and exposes a `PROMPTS` constant with templates for LEGAL_QA, DISPUTE, DOCUMENT, CONTRACT, EXPLAIN, and LAWSUIT use cases. Calls are guarded by a credits flow (see below).
- **SEO & content strategy**: Programmatic SSG/SSR driven by local TS data files (`data/seoPages.ts`, `professions.ts`, `plans.ts`, `freelanceLawsByState.ts`, `stateComplianceData.ts`) to generate many landing pages. `app/sitemap.ts` and `app/robots.ts` are auto-generated.

---

## 2. Directory Structure & Key Files (high level)
```
indielegalterms.com/ (repo root)
├── app/                            # Next.js App Router routes & pages
│   ├── api/                        # Server API endpoints
│   │   ├── ai/                     # AI endpoints
│   │   │   ├── contract/           # Contract generation endpoint
│   │   │   ├── demand-letter/      # Demand letter generation endpoint
│   │   │   └── README.md           # API usage notes
│   │   ├── auth/                   # NextAuth handlers
│   │   ├── ccpa-paid/              # CCPA paid feature endpoint
│   │   ├── credits/                # Credits status (me/) & deduction (use/) endpoints
│   │   ├── paypal/                 # PayPal order create/capture/query/test endpoints
│   │   │   └── README.md           # PayPal integration notes
│   │   └── subscription/           # Subscription status check endpoint (check/)
│   ├── compliance/                 # Compliance / laws landing pages [slug] + index
│   ├── contracts/                  # Contract engine: index, [slug] (100+ slugs), generator/
│   ├── dashboard/                  # User account center
│   ├── guides/                     # Guides & SB988 checklists; [slug] + ca-contractor-small-claims/
│   ├── login/                      # Passwordless email verification page
│   ├── pricing/                    # Plan & pricing pages
│   ├── privacy-policy/             # Privacy policy page
│   ├── tools/                      # Interactive tools:
│   │   ├── ca-contractor-laws/
│   │   ├── demand-letter-generator/
│   │   ├── freelancer-contract-review/
│   │   ├── irs-20-point-checklist/
│   │   └── late-payment-calculator/
│   ├── layout.tsx                  # Root HTML wrapper
│   ├── page.tsx                    # Homepage
│   ├── providers.tsx               # NextAuth / payment providers & contexts
│   ├── robots.ts                   # Auto-generated robots.txt
│   └── sitemap.ts                  # Auto-generated sitemap.xml
├── components/                     # UI components
│   ├── CaseStudyPanel.tsx          # Case study display panel
│   ├── CopyCard.tsx                # Copy-to-clipboard card component
│   ├── ScenarioTool.tsx            # Scenario-based interactive tool
│   ├── common/                     # Shared UI primitives
│   ├── guides/                     # Guide-specific components
│   ├── layout/                     # SiteHeader.tsx, SiteFooter.tsx, GoogleAnalytics.tsx
│   ├── modules/                    # Feature module components
│   ├── pricing/                    # Pricing UI components
│   ├── providers/                  # React context providers
│   ├── tools/                      # Tool-specific components
│   └── ui/                         # Base UI components
├── data/                           # SSG data files
│   ├── exampleData.ts              # Example / demo data
│   ├── freelanceLawsByState.ts     # State-level freelance law data
│   ├── moduleExamples.ts           # Module example content
│   ├── plans.ts                    # Pricing plan definitions
│   ├── professions.ts              # Profession-specific content
│   ├── seoPages.ts                 # Programmatic SEO page data (main, ~52 KB)
│   └── stateComplianceData.ts      # State compliance details
├── lib/                            # Singletons & wrappers
│   ├── ai/
│   │   └── deepseek.ts             # DeepSeek client wrapper + PROMPTS constant
│   ├── paypal/                     # PayPal SDK wrappers
│   ├── auth.ts                     # NextAuth config
│   └── prisma.ts                   # Prisma client singleton
├── models/
│   └── order.ts                    # Order model / type definitions
├── prisma/                         # Prisma schema and migrations
├── styles/
│   └── globals.css                 # Global CSS
├── types/
│   └── next-auth.d.ts              # NextAuth type augmentation
├── middleware.ts                   # Edge middleware: legacy tool URL redirects
├── package.json                    # project metadata & scripts
├── next.config.js                  # Next.js config & permanent redirects
├── tailwind.config.js / .ts        # Tailwind CSS configuration (two files coexist)
├── env.example                     # Canonical env vars template (see §5)
└── .env.example                    # Legacy / shorter env template
```

Notes from the codebase:
- The `contracts` and `compliance` directories replace older `freelance-contract` and `independent-contractor-laws` names (permanent redirects configured in `next.config.js`).
- Data files for programmatic pages live in `data/`. `seoPages.ts` is the largest at ~52 KB.
- The DeepSeek wrapper at `lib/ai/deepseek.ts` uses lazy initialization — the OpenAI client is created only at call time, never at build time.
- `middleware.ts` handles a second layer of redirects at the edge for deprecated tool paths, all pointing to `/tools/freelancer-contract-review`.

---

## 3. Database Schema (Prisma)
The Prisma schema (`prisma/schema.prisma`) follows NextAuth models plus order tracking:
- **User**: standard NextAuth fields plus `remainingContracts Int @default(0)` (the credits balance for AI calls), and optional `password String?`.
- **Order**: tracks purchases with `paypalOrderId String? @unique`, `amount Float`, `status String` ("pending", "completed", "failed"), `createdAt`, and relation to User. Indexed on `userId`, `paypalOrderId`, `status`, and `createdAt`.
- **Account**, **Session**, **VerificationToken**: standard NextAuth models linked to User.

Implementation notes:
- `remainingContracts` is the single source of truth for available AI credits. Deductions are persisted atomically **before** making external AI requests to avoid race conditions.
- Prisma datasource is **PostgreSQL** (env: `DATABASE_URL`). `env.example` also documents SQLite for local dev and MySQL as an alternative.

---

## 4. Key Logic & Rules

### Redirect & Domain Rules
Two layers of redirects exist:
1. **`next.config.js`** (permanent 301 — Next.js layer):
   - `/independent-contractor-laws` → `/compliance`
   - `/independent-contractor-laws/:slug*` → `/compliance/:slug*`
   - `/guides/sb988-small-claims-guide` → `/guides/ca-contractor-small-claims`
   - `/tools/sb988-contract-generator` → `/contracts/generator`
   - `/tools/sb988-demand-letter-generator` → `/tools/demand-letter-generator`
   - `/tools/sb988-late-payment-calculator` → `/tools/late-payment-calculator`
2. **`middleware.ts`** (edge, 301): deprecated tool aliases all redirect to `/tools/freelancer-contract-review`.
   - Covers: `ai-copyright-filing`, `ai-use-policy`, `ccpa-breach-letters`, `ccpa-checker`, `ccpa-generator`, `esg-compliance-checklist`, `metaverse-ip-trademark`.

### Authentication & Credits Flow
- Authentication: passwordless email magic links (NextAuth). Optional `password` field exists on the User model.
- Protected server API endpoints (`/api/ai/*`, `/api/credits/*`) validate sessions server-side.
- Credits deduction: each AI call costs 1 credit. The DB decrement (`remainingContracts`) is persisted **before** the external AI call.
- `/api/credits/me` — GET: returns current credit balance.
- `/api/credits/use` — POST: deducts 1 credit and triggers AI call.

### AI Integration
- Wrapper: `lib/ai/deepseek.ts` — lazy-init OpenAI-compatible client; reads `DEEPSEEK_API_KEY` and optional `DEEPSEEK_API_BASE`.
- Model: `deepseek-chat`, `max_tokens: 4000`, default `temperature: 0.3`.
- Prompt templates in `PROMPTS` constant: `LEGAL_QA`, `DISPUTE`, `DOCUMENT`, `CONTRACT`, `EXPLAIN`, `LAWSUIT`.
- AI endpoints:
  - `POST /api/ai/contract` — contract generation
  - `POST /api/ai/demand-letter` — demand letter generation

### PayPal Integration
- Uses `@paypal/checkout-server-sdk` v1.
- Endpoints under `/api/paypal/`: `create/`, `capture/`, `query/`, `test/`.
- See `app/api/paypal/README.md` for order lifecycle details.

### Other API Endpoints
- `POST /api/ccpa-paid` — handles paid CCPA-related functionality.
- `GET /api/subscription/check` — checks subscription status.

---

## 5. Deployment & Important Environment Variables
Key env vars (canonical reference: `env.example`):
- `NEXTAUTH_URL` — production: `https://indielegalterms.com`, dev: `http://localhost:3000`.
- `NEXTAUTH_SECRET` — secret used by NextAuth.
- `SESSION_MAX_AGE` — session lifetime in seconds (default 604800 = 7 days).
- `EMAIL_SERVER` — SMTP URI for magic links (e.g., `smtp://user:pass@smtp.example.com:587`).
- `EMAIL_FROM` — sender address (e.g., `Indie Legal <noreply@Indie.com>`).
- `DEEPSEEK_API_KEY` — API key for DeepSeek.
- `DEEPSEEK_API_BASE` — optional base URL (default `https://api.deepseek.com`).
- `PAYPAL_CLIENT_ID` / `PAYPAL_CLIENT_SECRET` / `PAYPAL_MODE` — PayPal credentials (`sandbox` or `live`).
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID` — public PayPal client ID for client-side rendering.
- `NEXT_PUBLIC_APP_URL` — public app URL (`http://localhost:3000` in dev).
- `DATABASE_URL` — Postgres connection string. SQLite (`file:./dev.db`) supported for local dev.

Build & developer scripts:
- `npm run dev` — start dev server
- `npm run build` — runs `prisma generate` then `next build`
- `npm run start` — start production server
- `npm run studio` / `db:push` / `db:generate` / `db:migrate` — Prisma tooling via dotenv-cli with `.env.local`

---

## 6. Where to Look for Common Changes
| Task | Location |
|------|----------|
| API & credit flows | `app/api/credits/*`, `lib/prisma.ts` |
| AI prompts & templates | `lib/ai/deepseek.ts` (`PROMPTS` constant) |
| Contract / demand letter AI | `app/api/ai/contract/`, `app/api/ai/demand-letter/` |
| Programmatic SEO pages | `data/seoPages.ts`, `app/contracts/`, `app/compliance/`, `app/guides/` |
| State law / compliance data | `data/freelanceLawsByState.ts`, `data/stateComplianceData.ts` |
| Pricing plans | `data/plans.ts`, `app/pricing/` |
| Redirects (legacy paths) | `next.config.js` (permanent), `middleware.ts` (edge) |
| Layout, header, footer | `components/layout/SiteHeader.tsx`, `SiteFooter.tsx` |
| Analytics | `components/layout/GoogleAnalytics.tsx` |
| PayPal integration | `lib/paypal/`, `app/api/paypal/`, `app/api/paypal/README.md` |
| Env vars reference | `env.example` |
| Prisma schema | `prisma/schema.prisma` |

---

If any of the above should be further expanded, corrected, or translated into a checklist for maintainers (or CI checks), indicate which sections to revise and the assistant will apply targeted edits and open a diff for review.