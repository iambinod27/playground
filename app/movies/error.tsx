"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="theme-movies film-grain min-h-[calc(100vh-56px)] px-5 sm:px-8 py-10">
      <div className="max-w-md mx-auto text-center pt-16">
        <p className="font-mono text-[11px] tracking-[0.2em] text-[color:var(--accent)] mb-3">
          REEL BROKE
        </p>
        <p className="text-paper mb-6">
          Couldn&apos;t load the movies. The TMDB feed might be down or rate-limited.
        </p>
        <button
          onClick={() => reset()}
          className="font-mono text-sm px-4 py-2 rounded border border-line text-paper hover:border-[color:var(--accent)] transition-colors"
        >
          try again
        </button>
      </div>
    </main>
  );
}