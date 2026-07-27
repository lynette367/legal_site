import type { Metadata } from "next";

// ─────────────────────────────────────────────────────────────────────────
// /privacy-policy
//
// SETUP NOTES (read before deploying):
// 1. Replace every "[ ... ]" placeholder below with your real details —
//    especially the contact email and the "Last updated" date.
// 2. This page assumes your root app/layout.tsx already renders a shared
//    header/footer — this file only needs to export the page content.
// 3. Add a link to this page in your site footer, e.g.:
//      <Link href="/privacy-policy">Privacy Policy</Link>
// 4. This is informational content, not legal advice. Have a lawyer confirm
//    this matches your actual data practices before relying on it.
// ─────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Privacy Policy | IndieLegal",
  description:
    "Learn how IndieLegal collects, uses, and protects your personal information, including data shared with our AI-assisted contract and document generation tools.",
};

const LAST_UPDATED = "July 27, 2026"; // TODO: update this whenever the policy changes

interface Section {
  id: string;
  title: string;
  body: React.ReactNode;
}

const sections: Section[] = [
  {
    id: "overview",
    title: "1. Overview",
    body: (
      <>
        <p>
          IndieLegal (&ldquo;IndieLegal,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates{" "}
          <span className="font-medium text-text-primary">indielegalterms.com</span> and its
          related tools (together, the &ldquo;Service&rdquo;). This Privacy Policy explains what
          personal information we collect, how we use it, who we share it with, and the choices
          you have.
        </p>
        <p>
          By using the Service, you agree to the collection and use of information as described
          here. If you don&rsquo;t agree, please don&rsquo;t use the Service.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    body: (
      <>
        <h3 className="mt-4 font-semibold text-text-lavender">Account information</h3>
        <p>
          We use passwordless (&ldquo;magic link&rdquo;) sign-in. When you create an account, we
          collect and store your <span className="font-medium text-text-primary">email address</span>{" "}
          so we can send you a secure sign-in link and associate your credit balance and
          generated documents with your account. We do not store a password.
        </p>

        <h3 className="mt-4 font-semibold text-text-lavender">Payment information</h3>
        <p>
          Payments are processed by <span className="font-medium text-text-primary">PayPal</span>.
          We do not collect or store your full card or bank account details ourselves — PayPal
          handles that directly and shares with us only what&rsquo;s needed to confirm your
          purchase (such as transaction ID, amount, and payment status).
        </p>

        <h3 className="mt-4 font-semibold text-text-lavender">Content you submit to our AI tools</h3>
        <p>
          When you use a feature such as the AI legal Q&amp;A, clause explanation, dispute plan,
          document drafting, or contract generator, the text you enter is sent to our AI
          providers (currently{" "}
          <span className="font-medium text-text-primary">DeepSeek</span> and{" "}
          <span className="font-medium text-text-primary">Anthropic</span>) solely to generate a
          response for you. We do not save this content in our own database after your session —
          it is processed on demand and not retained by IndieLegal for training or any other
          purpose. Please note that these providers process the request on our behalf under
          their own data processing terms; avoid entering information you consider highly
          sensitive (e.g. Social Security numbers) if you&rsquo;d prefer it never leave your
          device.
        </p>

        <h3 className="mt-4 font-semibold text-text-lavender">Usage data</h3>
        <p>
          We use <span className="font-medium text-text-primary">Google Analytics</span> to
          understand how visitors use the Service — for example, which pages are viewed, how
          long visits last, and general device/browser/location information. Google Analytics
          uses cookies and similar technologies to do this. This data is aggregated and is not
          used to identify you personally.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "3. How We Use Your Information",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>To create and maintain your account and sign you in via magic link</li>
        <li>To process your purchases and track your credit balance</li>
        <li>To generate the AI responses, documents, and contracts you request</li>
        <li>To operate, maintain, and improve the Service</li>
        <li>To communicate with you about your account or transactions</li>
        <li>To detect, prevent, and address technical issues, fraud, or misuse</li>
        <li>To understand aggregate usage patterns via analytics</li>
      </ul>
    ),
  },
  {
    id: "sharing",
    title: "4. Who We Share Information With",
    body: (
      <>
        <p>We don&rsquo;t sell your personal information. We share it only with:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="font-medium text-text-primary">PayPal</span> — to process payments
          </li>
          <li>
            <span className="font-medium text-text-primary">DeepSeek and Anthropic</span> — to
            generate AI responses and documents from the text you submit
          </li>
          <li>
            <span className="font-medium text-text-primary">Google Analytics</span> — to measure
            site usage
          </li>
          <li>
            <span className="font-medium text-text-primary">Vercel</span> — our hosting
            infrastructure provider
          </li>
          <li>Law enforcement or regulators, if required by law or to protect our legal rights</li>
        </ul>
        <p className="mt-3">
          Some of these providers may process data outside the United States or the state of
          California. Where that happens, we rely on the safeguards those providers offer under
          their own terms of service and data processing agreements.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "5. Cookies",
    body: (
      <p>
        The Service currently uses cookies set by Google Analytics to measure site usage. These
        are analytics cookies, not advertising cookies. You can block or delete cookies in your
        browser settings at any time; doing so may affect analytics but will not prevent you
        from using the Service.
      </p>
    ),
  },
  {
    id: "retention",
    title: "6. Data Retention",
    body: (
      <ul className="list-disc space-y-2 pl-5">
        <li>Your account email is retained for as long as your account is active.</li>
        <li>
          Payment records are retained as needed for accounting, tax, and fraud-prevention
          purposes.
        </li>
        <li>
          Content submitted to our AI generation tools is not retained by IndieLegal after your
          session.
        </li>
        <li>You may request deletion of your account and associated data at any time (see Section 7).</li>
      </ul>
    ),
  },
  {
    id: "your-rights",
    title: "7. Your Privacy Rights",
    body: (
      <>
        <p>
          If you&rsquo;re a California resident, and regardless of whether the California
          Consumer Privacy Act formally applies to a business our size, we extend the same
          practical rights to all our users as a matter of good practice:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="font-medium text-text-primary">Right to know</span> what personal
            information we hold about you
          </li>
          <li>
            <span className="font-medium text-text-primary">Right to delete</span> your account
            and associated personal information
          </li>
          <li>
            <span className="font-medium text-text-primary">Right to correct</span> inaccurate
            information
          </li>
          <li>
            <span className="font-medium text-text-primary">Right to opt out</span> of any sale
            or sharing of personal information — note that we do not sell or share your
            personal information with third parties for their own marketing purposes
          </li>
          <li>We will not discriminate against you for exercising any of these rights.</li>
        </ul>
        <p className="mt-3">
          To exercise any of these rights, email us at{" "}
          <a href="mailto:[support@indielegalterms.com]" className="text-primary-lavender-dark underline">
            [support@indielegalterms.com]
          </a>
          . We&rsquo;ll respond within a reasonable time.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "8. Children's Privacy",
    body: (
      <p>
        The Service is intended for business and professional use by adults. It is not directed
        to, and we do not knowingly collect personal information from, anyone under 18. If you
        believe a minor has provided us with personal information, contact us and we will delete
        it.
      </p>
    ),
  },
  {
    id: "security",
    title: "9. Data Security",
    body: (
      <p>
        We use reasonable technical and organizational measures to protect your information. No
        method of transmission or storage is 100% secure, so we can&rsquo;t guarantee absolute
        security, but we work to protect your data against unauthorized access, disclosure, or
        loss.
      </p>
    ),
  },
  {
    id: "changes",
    title: "10. Changes to This Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. If we make material changes,
        we&rsquo;ll update the &ldquo;Last updated&rdquo; date at the top of this page. Continued
        use of the Service after changes take effect means you accept the updated policy.
      </p>
    ),
  },
  {
    id: "contact",
    title: "11. Contact Us",
    body: (
      <p>
        Questions about this Privacy Policy or your data? Email us at{" "}
        <a href="mailto:[support@indielegalterms.com]" className="text-primary-lavender-dark underline">
          [support@indielegalterms.com]
        </a>
        .
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-bg-main px-4 py-16 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 border-b border-border-lavender pb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-text-lavender">
            Legal
          </p>
          <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">Privacy Policy</h1>
          <p className="mt-3 text-sm text-text-primary/60">Last updated: {LAST_UPDATED}</p>
        </header>

        {/* Table of contents */}
        <nav className="mb-10 rounded-2xl border border-border-lavender bg-bg-card p-6 shadow-soft">
          <p className="mb-3 text-sm font-semibold text-text-lavender">On this page</p>
          <ol className="grid gap-2 text-sm sm:grid-cols-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-text-primary/80 hover:text-primary-lavender-dark">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((s) => (
            <section
              key={s.id}
              id={s.id}
              className="scroll-mt-24 rounded-2xl border border-border-lavender bg-bg-card p-6 shadow-soft sm:p-8"
            >
              <h2 className="mb-3 text-xl font-semibold text-text-primary">{s.title}</h2>
              <div className="space-y-3 text-sm leading-relaxed text-text-primary/85 sm:text-base">
                {s.body}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-text-primary/50">
          This page is provided for informational purposes and does not constitute legal advice.
        </p>
      </div>
    </main>
  );
}
