"use client";

import { motion, useReducedMotion } from "framer-motion";

const nodes = [
  { id: "core", x: 300, y: 190, label: "AI SECURITY", sub: "& PRIVACY", core: true },
  { id: "llm", x: 300, y: 40, label: "LLM SECURITY" },
  { id: "ppml", x: 80, y: 120, label: "PRIVACY-PRESERVING ML" },
  { id: "nlp", x: 520, y: 120, label: "ARABIC NLP" },
  { id: "cyber", x: 90, y: 310, label: "CYBERSECURITY" },
  { id: "net", x: 510, y: 310, label: "NETWORKS & SYSTEMS" },
];

const edges: [string, string][] = [
  ["core", "llm"],
  ["core", "ppml"],
  ["core", "nlp"],
  ["core", "cyber"],
  ["core", "net"],
  ["llm", "ppml"],
  ["llm", "nlp"],
  ["cyber", "net"],
];

const byId = (id: string) => nodes.find((n) => n.id === id)!;

export default function SignalGraph() {
  const reduce = useReducedMotion();
  return (
    <svg
      viewBox="0 0 600 370"
      className="w-full h-auto select-none"
      role="img"
      aria-label="Diagram: AI security and privacy at the centre, connected to LLM security, privacy-preserving machine learning, Arabic NLP, cybersecurity, and networks and systems."
    >
      {edges.map(([a, b], i) => {
        const f = byId(a);
        const t = byId(b);
        const spoke = a === "core";
        return (
          <g key={`${a}-${b}`}>
            <line
              x1={f.x}
              y1={f.y}
              x2={t.x}
              y2={t.y}
              stroke={spoke ? "var(--border-strong)" : "var(--border)"}
              strokeWidth={spoke ? 1.5 : 1}
              strokeDasharray={spoke ? undefined : "4 5"}
            />
            {spoke && !reduce && (
              <motion.circle
                r={2.8}
                fill="var(--cyan)"
                animate={{ cx: [f.x, t.x], cy: [f.y, t.y], opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 2.4,
                  delay: i * 0.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
              />
            )}
          </g>
        );
      })}

      {nodes.map((n) => (
        <g key={n.id}>
          <circle
            cx={n.x}
            cy={n.y}
            r={n.core ? 38 : 12}
            fill="var(--bg-elevated)"
            stroke={n.core ? "var(--accent)" : "var(--border-strong)"}
            strokeWidth={n.core ? 2 : 1.5}
          />
          {n.core ? (
            <>
              <text x={n.x} y={n.y - 2} textAnchor="middle" className="font-data" style={{ fill: "var(--text)", fontSize: 10, fontWeight: 500 }}>
                {n.label}
              </text>
              <text x={n.x} y={n.y + 12} textAnchor="middle" className="font-data" style={{ fill: "var(--text-muted)", fontSize: 9 }}>
                {n.sub}
              </text>
            </>
          ) : (
            <>
              <circle cx={n.x} cy={n.y} r={3.5} fill="var(--cyan)" />
              <text
                x={n.x}
                y={n.y + (n.y > 250 ? 32 : n.y < 60 ? -22 : 32)}
                textAnchor="middle"
                className="font-data"
                style={{ fill: "var(--text-muted)", fontSize: 10, letterSpacing: "0.04em" }}
              >
                {n.label}
              </text>
            </>
          )}
        </g>
      ))}
    </svg>
  );
}
