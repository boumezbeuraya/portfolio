export interface Profile {
  name: string;
  roleLine: string;
  titleLine: string;
  education: string;
  rotatingRoles: string[];
  valueProposition: string;
  availability: string;
  location: string;
  email: string;
  resumeFile: string;
  languages: { name: string; level: string }[];
  bio: string[];
}

export interface Links {
  github: string;
  linkedin: string;
  email: string;
  googleScholar: string;
  orcid: string;
}

export interface ResearchInterest {
  id: string;
  label: string;
  detail: string;
  evidence: string[];
}

export interface SkillGroup {
  category: string;
  practical: string[];
  academic: string[];
  learning: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  statusKind: "thesis" | "progress";
  problem: string;
  role: string;
  approach: string;
  limitations: string;
  technologies: string[];
  category: string;
  repo: string;
  repoNote: string;
  featured: boolean;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  citeAuthors: string[];
  myAuthorIndex: number;
  type: string;
  venue: string;
  series: string;
  volume: string;
  publisher: string;
  pages: string;
  date: string;
  year: string;
  doi: string;
  doiUrl: string;
  publisherUrl: string;
  summary: string;
  contribution: string[];
  topics: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  note: string;
  responsibilities: string[];
}
