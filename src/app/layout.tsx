import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import profile from "@/data/profile.json";
import links from "@/data/links.json";
import { siteUrl } from "@/lib/site";

// Self-hosted fonts: no runtime request to Google Fonts.
const spaceGrotesk = localFont({
  src: "./fonts/SpaceGrotesk.ttf",
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = localFont({
  src: "./fonts/Inter.ttf",
  variable: "--font-inter",
  display: "swap",
});

const plexMono = localFont({
  src: [
    { path: "./fonts/PlexMono-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/PlexMono-Medium.ttf", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

const title = `${profile.name} | ${profile.roleLine}`;
const description =
  "Researcher in AI security, LLM privacy and cybersecurity. M.Sc. Cybersecurity (2025). Author of a Springer paper on privacy by design for LLMs.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${profile.name}` },
  description,
  keywords: [
    "AI security",
    "LLM security",
    "privacy-preserving machine learning",
    "cybersecurity",
    "Arabic NLP",
    "Algerian dialect",
    profile.name,
  ],
  authors: [{ name: profile.name, url: links.github }],
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: profile.name,
    type: "profile",
  },
  twitter: { card: "summary", title, description },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b1020" },
    { media: "(prefers-color-scheme: light)", color: "#f5f7fc" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.roleLine,
  url: siteUrl,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Université Ferhat Abbas Sétif 1",
  },
  sameAs: [links.github, links.linkedin, links.googleScholar, links.orcid].filter(Boolean),
  knowsAbout: [
    "AI security",
    "LLM privacy",
    "Privacy-preserving machine learning",
    "Cybersecurity",
    "Natural language processing",
  ],
};

// Applies the stored theme (or the system preference) before first paint.
const themeInitScript = `(function(){try{var s=localStorage.getItem('theme');var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable} antialiased`}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
