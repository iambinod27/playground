"use client";

import { useEffect, useState } from "react";

interface WatchlistMovie {
  id: number;
  title: string;
  poster_path: string | null;
}

export default function WatchlistButton({ movie }: { movie: WatchlistMovie }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const list: WatchlistMovie[] = JSON.parse(
      localStorage.getItem("watchlist") || "[]",
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from localStorage on mount, not derivable from props/state
    setSaved(list.some((m) => m.id === movie.id));
  }, [movie.id]);

  function toggleWatchlist() {
    const list: WatchlistMovie[] = JSON.parse(
      localStorage.getItem("watchlist") || "[]",
    );

    if (saved) {
      const updated = list.filter((m) => m.id !== movie.id);
      localStorage.setItem("watchlist", JSON.stringify(updated));
      setSaved(false);
    } else {
      list.push(movie);
      localStorage.setItem("watchlist", JSON.stringify(list));
      setSaved(true);
    }
  }

  return (
    <button
      onClick={toggleWatchlist}
      className={`mt-4 font-mono text-xs tracking-wide px-4 py-2 rounded-md border transition-colors ${
        saved
          ? "bg-[color:var(--accent)] text-ink border-[color:var(--accent)]"
          : "border-line text-paper hover:border-[color:var(--accent)]"
      }`}
    >
      {saved ? "✓ ON WATCHLIST" : "+ ADD TO WATCHLIST"}
    </button>
  );
}