import type { Metadata } from "next";
import Link from "next/link";
import profile from "@/data/profile.json";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for this portfolio website.",
};

export default function PrivacyPage() {
  return (
    <main id="main" className="max-w-2xl mx-auto px-5 sm:px-8 py-24">
      <span className="eyebrow">Legal</span>
      <h1 className="font-display text-3xl sm:text-4xl font-semibold mt-4">Privacy Policy</h1>
      <p className="text-[var(--text-muted)] text-sm mt-2">Last updated: October 2026</p>

      <div className="mt-10 space-y-6 text-[var(--text-muted)] leading-relaxed text-sm">
        <p>
          This website is a personal portfolio belonging to {profile.name}. It is intentionally
          simple: it does not use tracking cookies, third-party advertising, or analytics
          scripts by default.
        </p>
        <section>
          <h2 className="font-display text-lg text-[var(--text)] font-semibold mb-2">
            Information collected
          </h2>
          <p>
            The contact form does not send data to a server. It opens your own email app with the
            message pre-filled, addressed to {profile.email}; nothing is stored by this site.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg text-[var(--text)] font-semibold mb-2">
            Third-party services
          </h2>
          <p>
            This site loads no third-party scripts, fonts or trackers. Links to GitHub, LinkedIn
            and Springer leave this site and are covered by those services&apos; own policies.
            Your theme choice (light or dark) is saved in your browser only.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg text-[var(--text)] font-semibold mb-2">Contact</h2>
          <p>
            Questions about this policy can be sent to{" "}
            <a href={`mailto:${profile.email}`} className="link-inline">
              {profile.email}
            </a>
            .
          </p>
        </section>
      </div>

      <Link
        href="/"
        className="inline-block mt-10 text-sm font-data uppercase tracking-wide text-[var(--accent)] hover:underline"
      >
        ← Back to home
      </Link>
    </main>
  );
}
