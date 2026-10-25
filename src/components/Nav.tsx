"use client";

import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun, Download } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import profile from "@/data/profile.json";

const sections = [
  { id: "about", label: "About" },
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
  { id: "publications", label: "Publications" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const iconBtn =
    "w-10 h-10 rounded-[10px] border border-[var(--border-strong)] flex items-center justify-center text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "backdrop-blur-md bg-[var(--bg)]/85 border-b border-[var(--border)]" : ""
      }`}
    >
      <nav aria-label="Primary" className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 h-16">
        <a href="#top" className="font-display font-semibold tracking-tight text-lg">
          {profile.name.split(" ")[0]}
          <span className="text-[var(--cyan)]">.</span>
        </a>

        <ul className="hidden lg:flex items-center gap-6 font-data text-xs tracking-wide uppercase">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                className={`py-2 transition-colors hover:text-[var(--accent)] ${
                  active === s.id ? "text-[var(--accent)]" : "text-[var(--text-muted)]"
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {profile.resumeFile && (
            <a href={profile.resumeFile} download className="btn btn-ghost btn-sm hidden sm:inline-flex">
              <Download size={14} aria-hidden="true" /> CV
            </a>
          )}
          <button
            type="button"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            onClick={toggle}
            className={iconBtn}
          >
            <Moon size={16} className="icon-moon" aria-hidden="true" />
            <Sun size={16} className="icon-sun" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={`${iconBtn} lg:hidden`}
          >
            {open ? <X size={17} aria-hidden="true" /> : <Menu size={17} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <ul
          id="mobile-menu"
          className="lg:hidden px-5 pb-5 pt-1 flex flex-col font-data text-sm uppercase tracking-wide"
        >
          {sections.map((s) => (
            <li key={s.id} className="border-b border-[var(--border)] last:border-0">
              <a
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className="block py-3 text-[var(--text-muted)] hover:text-[var(--accent)]"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
