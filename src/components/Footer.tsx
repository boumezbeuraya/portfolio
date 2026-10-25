import { ArrowUp } from "lucide-react";
import Link from "next/link";
import profile from "@/data/profile.json";
import links from "@/data/links.json";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <p className="font-display font-semibold">
            {profile.name}
            <span className="text-[var(--cyan)]">.</span>
          </p>
          <p className="text-sm text-[var(--text-muted)] mt-1">{profile.roleLine}</p>
          <p className="font-data text-xs text-[var(--text-faint)] mt-3">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub (opens in a new tab)"
            className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors p-1"
          >
            <GithubIcon size={19} />
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn (opens in a new tab)"
            className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors p-1"
          >
            <LinkedinIcon size={19} />
          </a>
          <Link href="/privacy" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
            Privacy
          </Link>
          <a
            href="#top"
            aria-label="Back to top"
            className="w-10 h-10 rounded-[10px] border border-[var(--border-strong)] flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            <ArrowUp size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
