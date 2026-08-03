"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="theme-space min-h-[calc(100vh-56px)] px-5 sm:px-8 py-10">
      <div className="max-w-md mx-auto text-center pt-16">
        <p className="font-mono text-[11px] tracking-[0.2em] text-[color:var(--accent-2)] mb-3">
          SIGNAL LOST
        </p>
        <p className="text-paper mb-6">
          Couldn&apos;t reach today&apos;s photo. NASA&apos;s feed might be down, or the date is out of range.
        </p>
        <button
          onClick={() => reset()}
          className="font-mono text-sm px-4 py-2 rounded border border-line text-paper hover:border-[color:var(--accent-2)] transition-colors"
        >
          try again
        </button>
      </div>
    </main>
  );
}