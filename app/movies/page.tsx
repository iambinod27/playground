import Link from "next/link";
import SearchForm from "./SearchForm";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
}

async function getMovies(query?: string) {
  const url = query
    ? `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}`
    : `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`;

  const res = await fetch(
    url,
    query ? { cache: "no-store" } : { next: { revalidate: 3600 } },
  );
  if (!res.ok) throw new Error("Failed to fetch movies");
  const data = await res.json();
  return data.results as Movie[];
}

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const movies = await getMovies(q);

  return (
    <main className="theme-movies film-grain min-h-[calc(100vh-56px)] px-5 sm:px-8 py-10">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-[11px] tracking-[0.2em] text-[color:var(--accent)] mb-2">
          {q ? "SEARCH RESULTS" : "NOW TRENDING"}
        </p>
        <h1 className="font-display text-3xl font-semibold text-paper mb-6">
          {q ? `"${q}"` : "Trending This Week"}
        </h1>
        <SearchForm />

        {movies.length === 0 && (
          <p className="text-dim">No titles found. Try another search.</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movies/${movie.id}`}
              className="group"
            >
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
                <span className="absolute top-1.5 right-1.5 font-mono text-[10px] bg-ink/80 text-[color:var(--accent)] px-1.5 py-0.5 rounded backdrop-blur-sm">
                  ★ {movie.vote_average.toFixed(1)}
                </span>
              </div>
              <p className="text-sm font-medium text-paper mt-2 line-clamp-1">
                {movie.title}
              </p>
              <p className="font-mono text-[11px] text-dim">
                {movie.release_date?.slice(0, 4) || "—"}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}