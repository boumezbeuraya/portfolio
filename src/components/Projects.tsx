import { ExternalLink } from "lucide-react";
import projects from "@/data/projects.json";
import type { Project } from "@/lib/types";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import SecureMedArchitecture from "./SecureMedArchitecture";
import { GithubIcon } from "./SocialIcons";

const list = projects as Project[];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-data text-[0.7rem] uppercase tracking-wide text-[var(--text-faint)]">{label}</dt>
      <dd className="text-sm text-[var(--text-muted)] mt-1 leading-relaxed">{children}</dd>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-24 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          index="03"
          label="Projects"
          title="Featured projects"
          description="Each project states its status, my role and its limits. Only real repositories are linked."
        />

        <div className="grid lg:grid-cols-1 gap-6">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <article className="card p-6 sm:p-7 h-full flex flex-col">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display font-semibold text-2xl">{p.title}</h3>
                    <p className="text-[var(--text-muted)] mt-1">{p.subtitle}</p>
                  </div>
                  <span className={`badge ${p.statusKind === "thesis" ? "badge-ok" : "badge-warn"}`}>{p.status}</span>
                </div>

                <dl className="mt-5 space-y-4 flex-1">
                  <Field label="Problem">{p.problem}</Field>
                  {p.role && <Field label="My role">{p.role}</Field>}
                  <Field label="Approach">{p.approach}</Field>
                  <Field label="Limitations">{p.limitations}</Field>
                </dl>

                <ul className="flex flex-wrap gap-1.5 mt-5" aria-label="Technologies">
                  {p.technologies.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 pt-4 border-t border-[var(--border)] flex items-center gap-3">
                  {p.repo ? (
                    <a href={p.repo} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                      <GithubIcon size={14} /> Repository <ExternalLink size={12} aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    <span className="btn btn-ghost btn-sm" aria-disabled="true">
                      {p.repoNote || "Repository not public"}
                    </span>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <SecureMedArchitecture />
      </div>
    </section>
  );
}
