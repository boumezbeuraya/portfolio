import { Briefcase, GraduationCap } from "lucide-react";
import experience from "@/data/experience.json";
import education from "@/data/education.json";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-24 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading index="06" label="Experience" title="Experience and education" />

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="flex items-center gap-2 font-data text-xs uppercase tracking-wide text-[var(--text-faint)] mb-5">
              <Briefcase size={14} className="text-[var(--cyan)]" aria-hidden="true" /> Experience
            </h3>
            <div className="space-y-5">
              {experience.map((e) => (
                <Reveal key={e.id}>
                  <article className="card p-5">
                    <div className="flex items-baseline justify-between gap-3 flex-wrap">
                      <h4 className="font-display font-semibold">{e.role}</h4>
                      <span className="font-data text-xs text-[var(--text-faint)]">{e.period}</span>
                    </div>
                    <p className="text-sm text-[var(--accent)] mt-0.5">
                      {e.organization} · {e.note}
                    </p>
                    <ul className="mt-3 space-y-1.5 list-disc pl-4 marker:text-[var(--text-faint)]">
                      {e.responsibilities.map((r) => (
                        <li key={r} className="text-sm text-[var(--text-muted)] leading-relaxed">
                          {r}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2 font-data text-xs uppercase tracking-wide text-[var(--text-faint)] mb-5">
              <GraduationCap size={14} className="text-[var(--cyan)]" aria-hidden="true" /> Education
            </h3>
            <div className="space-y-5">
              {education.map((e) => (
                <Reveal key={e.id}>
                  <article className="card p-5">
                    <div className="flex items-baseline justify-between gap-3 flex-wrap">
                      <h4 className="font-display font-semibold">{e.degree}</h4>
                      <span className="font-data text-xs text-[var(--text-faint)]">{e.period}</span>
                    </div>
                    <p className="text-sm text-[var(--accent)] mt-0.5">{e.institution}</p>
                    <p className="text-sm text-[var(--text-muted)] mt-2 leading-relaxed">{e.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
