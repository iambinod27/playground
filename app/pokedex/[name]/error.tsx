"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="min-h-screen p-8 max-w-md mx-auto">
      <p className="text-red-500 mb-4">
        Something went wrong loding this Pokemon.
      </p>
      <button
        onClick={() => reset()}
        className="bg-black text-white px-4 py-2 rounded-md"
      >
        Try again
      </button>
    </main>
  );
}
