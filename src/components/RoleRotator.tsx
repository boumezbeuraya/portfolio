"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// Cross-fades between focus areas. With reduced motion it shows the first one only.
export default function RoleRotator({ roles }: { roles: string[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce || roles.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % roles.length), 3200);
    return () => clearInterval(t);
  }, [reduce, roles.length]);

  return (
    <p className="font-data text-sm sm:text-base text-[var(--cyan)] h-6 relative" aria-live="off">
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true" className="absolute inset-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={i}
            className="block"
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {"> "}
            {roles[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </p>
  );
}
