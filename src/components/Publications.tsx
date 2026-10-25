"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import publications from "@/data/publications.json";
import type { Publication } from "@/lib/types";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const pubs = publications as Publication[];

function initials(first: string) {
  return first
    .split(" ")
    .map((x) => x[0] + ".")
    .join(" ");
}

function apa(p: Publication) {
  const names = p.citeAuthors.map((a) => {
    const [last, first] = a.split(", ");
    return `${last}, ${initials(first)}`;
  });
  const list = `${names.slice(0, -1).join(", ")}, & ${names[names.length - 1]}`;
  return `${list} (${p.year}). ${p.title}. In ${p.venue} (${p.series}, Vol. ${p.volume}, pp. ${p.pages}). ${p.publisher}. https://doi.org/${p.doi}`;
}

function bibtex(p: Publication) {
  const authors = p.citeAuthors.join(" and ");
  return `@inproceedings{harrag${p.year}privacy,
  title     = {${p.title}},
  author    = {${authors}},
  booktitle = {${p.venue}},
  series    = {${p.series}},
  volume    = {${p.volume}},
  pages     = {${p.pages.replace("–", "--")}},
  publisher = {Springer},
  address   = {Cham},
  year      = {${p.year}},
  doi       = {${p.doi}}
}`;
}

function CopyButton({ label, text }: { label: string; text: string }) {
  const [done, setDone] = useState(false);
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {
      // Clipboard unavailable (e.g. insecure context): the text is still selectable below.
    }
  };
  return (
    <button type="button" onClick={onClick} className="btn btn-ghost btn-sm">
      {done ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
      {done ? "Copied" : label}
      <span className="sr-only" aria-live="polite">
        {done ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}

export default function Publications() {
  const [showCite, setShowCite] = useState(false);

  return (
    <section id="publications" className="py-20 sm:py-24 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading index="04" label="Publications" title="Published research" />

        {pubs.map((p) => (
          <Reveal key={p.id}>
            <article className="card p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge badge-ok">Published {p.date}</span>
                <span className="badge">{p.type}</span>
              </div>

              <h3 className="font-display font-semibold text-xl sm:text-2xl mt-4 leading-snug max-w-3xl">{p.title}</h3>

              <p className="mt-3 text-[var(--text-muted)]">
                {p.authors.map((a, i) => (
                  <span key={a}>
                    {i === p.myAuthorIndex ? (
                      <strong className="text-[var(--text)] underline decoration-[var(--cyan)] underline-offset-4">{a}</strong>
                    ) : (
                      a
                    )}
                    {i < p.authors.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <p className="text-xs text-[var(--text-faint)] mt-1">Second author</p>

              <p className="mt-4 text-sm text-[var(--text-muted)] leading-relaxed">
                <span className="text-[var(--text)]">{p.venue}</span>, {p.series}, vol. {p.volume}, pp. {p.pages}.{" "}
                {p.publisher}, {p.year}.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mt-6">
                <div>
                  <h4 className="font-data text-xs uppercase tracking-wide text-[var(--text-faint)]">Summary</h4>
                  <p className="text-sm text-[var(--text-muted)] mt-2 leading-relaxed">
                    {p.summary} The official abstract is on the publisher page.
                  </p>
                  <ul className="flex flex-wrap gap-1.5 mt-3" aria-label="Topics">
                    {p.topics.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-data text-xs uppercase tracking-wide text-[var(--text-faint)]">My contribution</h4>
                  <ul className="mt-2 space-y-1 text-sm text-[var(--text-muted)] list-disc pl-4">
                    {p.contribution.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-7 pt-5 border-t border-[var(--border)]">
                <a href={p.doiUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                  DOI: {p.doi} <ExternalLink size={13} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <a href={p.publisherUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                  Springer page <ExternalLink size={13} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  aria-expanded={showCite}
                  onClick={() => setShowCite((v) => !v)}
                >
                  Cite this paper
                </button>
              </div>

              {showCite && (
                <div className="mt-5 grid md:grid-cols-2 gap-5">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="font-data text-xs uppercase tracking-wide text-[var(--text-faint)]">APA</h4>
                      <CopyButton label="Copy APA" text={apa(p)} />
                    </div>
                    <pre className="whitespace-pre-wrap text-xs leading-relaxed rounded-lg bg-[var(--bg-inset)] border border-[var(--border)] p-3 font-data text-[var(--text-muted)]">
                      {apa(p)}
                    </pre>
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="font-data text-xs uppercase tracking-wide text-[var(--text-faint)]">BibTeX</h4>
                      <CopyButton label="Copy BibTeX" text={bibtex(p)} />
                    </div>
                    <pre className="overflow-x-auto text-xs leading-relaxed rounded-lg bg-[var(--bg-inset)] border border-[var(--border)] p-3 font-data text-[var(--text-muted)]">
                      {bibtex(p)}
                    </pre>
                  </div>
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
