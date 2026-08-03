import Link from "next/link";
import WatchlistButton from "./WatchlistButton";

interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: { id: number; name: string }[];
}

interface Video {
  key: string;
  site: string;
  type: string;
}

async function getMovie(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`,
    { next: { revalidate: 3600 } },
  );
  if (!res.ok) throw new Error("Movie not found");
  return res.json() as Promise<MovieDetail>;
}

async function getTrailer(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}`,
    { next: { revalidate: 3600 } },
  );
  if (!res.ok) return null;
  const data = await res.json();
  const trailer = data.results.find(
    (v: Video) => v.site === "YouTube" && v.type === "Trailer",
  );
  return trailer?.key ?? null;
}

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [movie, trailerKey] = await Promise.all([getMovie(id), getTrailer(id)]);

  return (
    <main className="theme-movies film-grain min-h-[calc(100vh-56px)] px-5 sm:px-8 py-10">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/movies"
          className="font-mono text-[11px] text-dim hover:text-[color:var(--accent)] transition-colors"
        >
          ← back to movies
        </Link>

        <div className="flex flex-col sm:flex-row gap-6 mt-5">
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg w-40 border border-line shrink-0"
            />
          )}
          <div>
            <h1 className="font-display text-3xl font-semibold text-paper">
              {movie.title}
            </h1>
            <p className="font-mono text-[11px] text-dim mt-1.5">
              {movie.release_date} · {movie.runtime} min · ★{" "}
              {movie.vote_average.toFixed(1)}
            </p>
            <div className="flex gap-2 flex-wrap mt-3">
              {movie.genres.map((g) => (
                <span
                  key={g.id}
                  className="font-mono text-[10px] tracking-wide border border-line px-2 py-1 rounded-full text-dim"
                >
                  {g.name.toUpperCase()}
                </span>
              ))}
            </div>
            <WatchlistButton
              movie={{
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
              }}
            />
          </div>
        </div>

        <p className="mt-8 text-sm leading-relaxed text-dim max-w-2xl">
          {movie.overview}
        </p>

        {trailerKey && (
          <div className="mt-8">
            <p className="font-mono text-[11px] tracking-[0.2em] text-[color:var(--accent)] mb-2">
              TRAILER
            </p>
            <div className="hud-corners rounded-lg overflow-hidden border border-line">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}`}
                className="w-full aspect-video"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}