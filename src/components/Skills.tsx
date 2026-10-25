import skills from "@/data/skills.json";
import type { SkillGroup } from "@/lib/types";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const groups = skills as SkillGroup[];

const tiers: { key: "practical" | "academic" | "learning"; label: string; hint: string }[] = [
  { key: "practical", label: "Hands-on", hint: "Used in projects or practical work" },
  { key: "academic", label: "Academic knowledge", hint: "Studied; limited practical use" },
  { key: "learning", label: "Learning", hint: "Currently building this skill" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-24 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          index="05"
          label="Skills"
          title="Skills, by how I use them"
          description="Grouped by depth instead of rated with bars: hands-on, academic knowledge, and still learning."
        />

        <div className="grid md:grid-cols-2 gap-5">
          {groups.map((g, i) => (
            <Reveal key={g.category} delay={i * 0.04}>
              <section className="card p-6 h-full" aria-labelledby={`skills-${i}`}>
                <h3 id={`skills-${i}`} className="font-display font-semibold text-lg">
                  {g.category}
                </h3>
                <div className="mt-4 space-y-4">
                  {tiers.map(
                    (t) =>
                      g[t.key].length > 0 && (
                        <div key={t.key}>
                          <p className="font-data text-[0.7rem] uppercase tracking-wide text-[var(--cyan)]" title={t.hint}>
                            {t.label}
                          </p>
                          <ul className="flex flex-wrap gap-1.5 mt-2">
                            {g[t.key].map((s) => (
                              <li key={s} className="chip text-[var(--text)]">
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                  )}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
