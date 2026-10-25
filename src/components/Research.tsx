import research from "@/data/research.json";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Research() {
  return (
    <section id="research" className="py-20 sm:py-24 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading
          index="02"
          label="Research interests"
          title="What I work on"
          description="Each interest is tied to something I have actually done, shown under the card."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {research.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.05} className={i === 0 ? "lg:col-span-1" : ""}>
              <article className="card p-6 h-full flex flex-col">
                <p className="font-data text-xs text-[var(--cyan)]">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-display font-semibold text-lg mt-2 leading-snug">{r.label}</h3>
                <p className="text-sm text-[var(--text-muted)] mt-2 leading-relaxed flex-1">{r.detail}</p>
                <ul className="flex flex-wrap gap-1.5 mt-4">
                  {r.evidence.map((e) => (
                    <li key={e} className="chip">
                      {e}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
