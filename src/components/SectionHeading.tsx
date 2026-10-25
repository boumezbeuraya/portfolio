import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  label,
  title,
  description,
}: {
  index: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mb-10 sm:mb-12">
      <span className="eyebrow">
        {index} / {label}
      </span>
      <h2 className="font-display text-3xl sm:text-4xl font-semibold mt-3 tracking-tight">{title}</h2>
      {description && <p className="text-[var(--text-muted)] mt-3 max-w-2xl leading-relaxed">{description}</p>}
    </Reveal>
  );
}
