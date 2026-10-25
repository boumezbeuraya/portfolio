"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download, FileText, FolderGit2 } from "lucide-react";
import profile from "@/data/profile.json";
import links from "@/data/links.json";
import SignalGraph from "./SignalGraph";
import RoleRotator from "./RoleRotator";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="top" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-fade pointer-events-none" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">{profile.education}</p>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-tight mt-4 leading-[1.05]">
            {profile.name}
          </h1>
          <p className="font-display text-xl sm:text-2xl text-[var(--accent)] mt-3">{profile.roleLine}</p>

          <p className="mt-5 text-lg text-[var(--text-muted)] max-w-xl leading-relaxed">
            {profile.valueProposition}
          </p>

          <div className="mt-5">
            <RoleRotator roles={profile.rotatingRoles} />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn btn-primary">
              <FolderGit2 size={16} aria-hidden="true" /> View Projects
            </a>
            <a href="#publications" className="btn btn-ghost">
              <FileText size={16} aria-hidden="true" /> Publications
            </a>
            {profile.resumeFile ? (
              <a href={profile.resumeFile} download className="btn btn-ghost">
                <Download size={16} aria-hidden="true" /> Download CV
              </a>
            ) : (
              <a href="#contact" className="btn btn-ghost">
                Contact
              </a>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub (opens in a new tab)"
              className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors p-1"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn (opens in a new tab)"
              className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors p-1"
            >
              <LinkedinIcon size={20} />
            </a>
            <span className="hidden sm:block w-px h-5 bg-[var(--border-strong)]" aria-hidden="true" />
            <p className="text-sm text-[var(--text-faint)] max-w-sm">{profile.availability}</p>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card p-5 sm:p-6"
        >
          <SignalGraph />
        </motion.div>
      </div>
    </section>
  );
}
