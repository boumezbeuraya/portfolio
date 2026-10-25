import { ShieldAlert } from "lucide-react";
import Reveal from "./Reveal";

type Stage = {
  name: string;
  tech: string;
  state: "repo" | "thesis";
};

// Order follows the data flow described for the framework. Stage numbering is
// intentionally omitted: it is not asserted here.
const stages: Stage[] = [
  { name: "Med-Guard anonymisation", tech: "Presidio · text and image modules", state: "repo" },
  { name: "Differentially private training", tech: "DP-SGD · Opacus", state: "thesis" },
  { name: "Report generation", tech: "BioMedCLIP · T5", state: "repo" },
  { name: "Output validation (IDS-LLM)", tech: "SBERT · Isolation Forest", state: "thesis" },
  { name: "Encrypted delivery", tech: "ECIES · Curve25519", state: "repo" },
];

const threats = [
  { threat: "PHI in inputs and generated reports", control: "Med-Guard anonymisation (Presidio)" },
  { threat: "Training-data leakage and membership inference", control: "DP-SGD training (Opacus)" },
  { threat: "Adversarially perturbed input images", control: "Robustness evaluation with FGSM, PGD and DeepFool" },
  { threat: "Unsafe or leaking generated reports", control: "IDS-LLM validation (SBERT, Isolation Forest)" },
  { threat: "Interception or tampering in transit", control: "ECIES / Curve25519 encrypted delivery" },
];

export default function SecureMedArchitecture() {
  return (
    <Reveal className="mt-8">
      <div className="card p-6 sm:p-8">
        <p className="eyebrow">SecureMed-LLM / architecture</p>
        <h3 className="font-display text-2xl font-semibold mt-2">Layered pipeline and threat model</h3>
        <p className="text-sm text-[var(--text-muted)] mt-2 max-w-3xl leading-relaxed">
          No single safeguard covers every point where a clinical language model can expose patient data, so the
          framework stacks controls along the data flow, from input to delivered report.
        </p>

        <ol className="mt-6 grid gap-3 md:grid-cols-5" aria-label="Pipeline stages in data-flow order">
          {stages.map((s, i) => (
            <li key={s.name} className="relative rounded-xl border border-[var(--border)] bg-[var(--bg-inset)] p-4">
              <p className="font-data text-[0.7rem] text-[var(--text-faint)] uppercase tracking-wide">
                {i === 0 ? "Input" : i === stages.length - 1 ? "Output" : "Stage"}
              </p>
              <p className="font-display font-semibold text-sm mt-1 leading-snug">{s.name}</p>
              <p className="font-data text-[0.7rem] text-[var(--text-muted)] mt-1.5">{s.tech}</p>
              <p
                className={`badge mt-3 ${s.state === "repo" ? "badge-ok" : "badge-info"}`}
                title={
                  s.state === "repo"
                    ? "A named module for this stage exists in the public repository"
                    : "Described in the thesis; check the repository for code status"
                }
              >
                {s.state === "repo" ? "In repository" : "In thesis"}
              </p>
            </li>
          ))}
        </ol>
        <p className="text-xs text-[var(--text-faint)] mt-3">
          <strong className="text-[var(--text-muted)]">In repository</strong>: a named module exists in the public
          code. <strong className="text-[var(--text-muted)]">In thesis</strong>: described and evaluated in the
          thesis; see the repository for code status.
        </p>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 mt-8">
          <div>
            <h4 className="font-data text-xs uppercase tracking-wide text-[var(--text-faint)] mb-3">Threat model</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <caption className="sr-only">Threats and the control that addresses each</caption>
                <thead>
                  <tr className="border-b border-[var(--border-strong)] text-[var(--text-faint)]">
                    <th scope="col" className="py-2 pr-4 font-medium">Threat</th>
                    <th scope="col" className="py-2 font-medium">Control</th>
                  </tr>
                </thead>
                <tbody>
                  {threats.map((t) => (
                    <tr key={t.threat} className="border-b border-[var(--border)] align-top">
                      <td className="py-2.5 pr-4">{t.threat}</td>
                      <td className="py-2.5 text-[var(--text-muted)]">{t.control}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--bg-inset)] p-5">
            <h4 className="flex items-center gap-2 font-data text-xs uppercase tracking-wide text-[var(--warn)]">
              <ShieldAlert size={14} aria-hidden="true" /> Scope and limits
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-[var(--text-muted)] leading-relaxed list-disc pl-4">
              <li>Research prototype evaluated on the Open-I chest X-ray dataset.</li>
              <li>Not claimed: clinical validation, production deployment or formal security guarantees.</li>
              <li>Each control reduces one risk; none removes it entirely.</li>
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
