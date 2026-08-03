"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface WatchListMovie {
  id: number;
  title: string;
  poster_path: string | null;
}

export default function WatchlistPage() {
  const [movies, setMovies] = useState<WatchListMovie[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from localStorage on mount, not derivable from props/state
    setMovies(JSON.parse(localStorage.getItem("watchlist") || "[]"));
    setLoaded(true);
  }, []);

  return (
    <main className="theme-movies film-grain min-h-[calc(100vh-56px)] px-5 sm:px-8 py-10">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-[11px] tracking-[0.2em] text-[color:var(--accent)] mb-2">
          SAVED
        </p>
        <h1 className="font-display text-3xl font-semibold text-paper mb-6">
          Want to Watch
        </h1>

        {loaded && movies.length === 0 && (
          <div className="border border-dashed border-line rounded-lg py-16 text-center">
            <p className="text-dim">Nothing saved yet.</p>
            <Link
              href="/movies"
              className="inline-block mt-3 font-mono text-xs px-4 py-2 rounded-md border border-line text-paper hover:border-[color:var(--accent)] transition-colors"
            >
              browse movies →
            </Link>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {movies.map((movie) => (
            <Link key={movie.id} href={`/movies/${movie.id}`} className="group">
              <div className="relative rounded-md overflow-hidden border border-line group-hover:border-[color:var(--accent)]/60 transition-colors">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full aspect-[2/3] object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                ) : (
                  <div className="bg-panel aspect-[2/3] flex items-center justify-center text-xs text-dim">
                    No poster
                  </div>
                )}
              </div>
              <p className="text-sm font-medium text-paper mt-2 line-clamp-1">
                {movie.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}