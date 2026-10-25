# Aya Boumezbeur: portfolio

Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion. All content lives in `src/data/*.json`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
npm run lint
```

Set `NEXT_PUBLIC_SITE_URL` (e.g. in Vercel) to your real domain for canonical URLs, sitemap and robots.

## Content files

| File | Powers |
|---|---|
| `profile.json` | Hero, About, availability, languages, `resumeFile` |
| `links.json` | GitHub, LinkedIn, email; Scholar/ORCID unused while empty |
| `research.json` | Research interests |
| `projects.json` | Project cards (status, role, approach, limitations, repo) |
| `publications.json` | Springer paper, DOI, citation (APA and BibTeX generated) |
| `skills.json` | Skills by hands-on / academic / learning |
| `experience.json`, `education.json` | Experience and education |

`SecureMedArchitecture.tsx` holds the SecureMed-LLM pipeline and threat model.

## Contact form

Without setup the form opens the visitor's email app (and offers a Gmail link). To send messages straight to your inbox: create a free form at formspree.io, copy the form ID (the part after `/f/`), and set `NEXT_PUBLIC_FORMSPREE_ID` in a `.env.local` file (or in Vercel settings). Restart `npm run dev` afterwards.

## Before launch

- Add a public CV (no phone or address) to `public/` and set `resumeFile` in `profile.json`, e.g. `"/Aya_Boumezbeur_CV.pdf"`. The CV buttons then appear.
- Add Scholar/ORCID URLs to `links.json` only if they exist.
- Verify the SecureMed-LLM repository URL and the Springer page URL.

## Rules this site follows

No PhD title, no unverified affiliation, no manuscript status claims, no invented metrics, no certificates until real ones are added.
