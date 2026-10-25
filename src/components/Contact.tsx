"use client";

import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import profile from "@/data/profile.json";
import links from "@/data/links.json";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

const field =
  "w-full mt-1.5 px-4 py-2.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-inset)] text-sm text-[var(--text)] placeholder:text-[var(--text-faint)] hover:border-[var(--accent)] focus:border-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cyan)] transition-colors";
const label = "font-data text-xs uppercase tracking-wide text-[var(--text-faint)]";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // Set NEXT_PUBLIC_FORMSPREE_ID (from formspree.io) to send messages straight to your inbox.
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

  const subject = `Portfolio message from ${form.name || "a visitor"}`;
  const body = `${form.message}\n\n${form.name} (${form.email})`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formspreeId) {
      // No sending service configured: fall back to the visitor's email app.
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          index="07"
          label="Contact"
          title="Let's talk"
          description="I'm open to research collaborations, internships in AI security and cybersecurity, and relevant technical roles. The fastest way to reach me is email."
        />

        <div className="grid lg:grid-cols-2 gap-8">
          <Reveal>
            <div className="card p-6 sm:p-7 space-y-5">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[var(--cyan)]" aria-hidden="true" />
                <a href={links.email} className="link-inline break-all">
                  {profile.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-[var(--text-muted)]">
                <MapPin size={18} className="text-[var(--cyan)]" aria-hidden="true" />
                <span>{profile.location}</span>
              </div>
              <div className="flex flex-wrap gap-3 pt-5 border-t border-[var(--border)]">
                <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                  <LinkedinIcon size={15} /> LinkedIn
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                  <GithubIcon size={15} /> GitHub
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <form onSubmit={handleSubmit} className="card p-6 sm:p-7 space-y-4">
              <p className="text-sm text-[var(--text-muted)]">
                {formspreeId
                  ? "Your message is sent directly to my inbox."
                  : "This form opens your email app with the message filled in. No email app? Use the Gmail option below."}
              </p>
              <div>
                <label htmlFor="c-name" className={label}>
                  Name
                </label>
                <input
                  id="c-name"
                  name="name"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={field}
                />
              </div>
              <div>
                <label htmlFor="c-email" className={label}>
                  Your email
                </label>
                <input
                  id="c-email"
                  name="email"
                  required
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={field}
                />
              </div>
              <div>
                <label htmlFor="c-message" className={label}>
                  Message
                </label>
                <textarea
                  id="c-message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${field} resize-y`}
                />
              </div>
              <button type="submit" className="btn btn-primary w-full" disabled={status === "sending"}>
                <Send size={15} aria-hidden="true" />
                {formspreeId ? (status === "sending" ? "Sending…" : "Send message") : "Open in email app"}
              </button>
              {!formspreeId && (
                <a href={gmailUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-full">
                  Open in Gmail instead
                </a>
              )}
              <p role="status" aria-live="polite" className="text-sm">
                {status === "sent" && <span className="text-[var(--ok)]">Thank you, your message was sent.</span>}
                {status === "error" && (
                  <span className="text-[var(--warn)]">
                    Sending failed. Please email me directly at {profile.email}.
                  </span>
                )}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
