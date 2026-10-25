import profile from "@/data/profile.json";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-24 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading index="01" label="About" title="Researcher at the intersection of AI and security" />

        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-10">
          <div className="space-y-5 max-w-2xl">
            {profile.bio.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p className="text-[var(--text-muted)] leading-relaxed text-[1.05rem]">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <dl className="card p-6 space-y-5 text-sm">
              <div>
                <dt className="font-data text-xs uppercase tracking-wide text-[var(--text-faint)]">Education</dt>
                <dd className="mt-1">M.Sc. Cybersecurity, 2025</dd>
                <dd>B.Sc. Computer Science, 2023</dd>
                <dd className="text-[var(--text-muted)]">Université Ferhat Abbas Sétif 1</dd>
              </div>
              <div>
                <dt className="font-data text-xs uppercase tracking-wide text-[var(--text-faint)]">Languages</dt>
                {profile.languages.map((l) => (
                  <dd key={l.name} className="mt-1 flex justify-between gap-4">
                    <span>{l.name}</span>
                    <span className="text-[var(--text-muted)]">{l.level}</span>
                  </dd>
                ))}
              </div>
              <div>
                <dt className="font-data text-xs uppercase tracking-wide text-[var(--text-faint)]">Based in</dt>
                <dd className="mt-1">{profile.location}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
