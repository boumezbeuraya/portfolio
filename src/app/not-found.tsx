import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <span className="eyebrow">404</span>
      <h1 className="font-display text-5xl font-semibold mt-4">Page not found</h1>
      <p className="text-[var(--text-muted)] mt-4 max-w-md">That address doesn&apos;t match anything on this site.</p>
      <Link href="/" className="btn btn-primary mt-8">
        Back to home
      </Link>
    </main>
  );
}
