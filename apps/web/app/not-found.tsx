import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-24">
      <section className="max-w-xl text-center">
        <p className="scene-label justify-center">404 / signal lost</p>
        <h1 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-6xl">
          This route drifted out of range.
        </h1>
        <p className="mt-5 text-base leading-8 text-[rgb(var(--muted))]">
          The portfolio is still running. Head back to the main experience and
          pick up the thread there.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] px-5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(var(--accent))]"
        >
          Back to portfolio
        </Link>
      </section>
    </main>
  );
}
