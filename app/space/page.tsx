import Link from "next/link";

interface ApodResponse {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  date: string;
  media_type: string;
  copyright?: string;
}

async function getApod(date?: string) {
  const dateParam = date ? `&date=${date}` : ``;
  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}${dateParam}`,
    { cache: "no-store" },
  );

  if (!res.ok) throw new Error("Failed to fetch APOD");
  return res.json() as Promise<ApodResponse>;
}

function shiftDate(dateStr: string, days: number) {
  const date = new Date(dateStr + "T00:00:00");
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

export default async function SpacePage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { date } = await searchParams;
  const apod = await getApod(date);
  const today = new Date().toISOString().split("T")[0];
  const isToday = apod.date === today;

  return (
    <main className="theme-space min-h-[calc(100vh-56px)] px-5 sm:px-8 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <p className="font-mono text-[11px] tracking-[0.2em] text-[color:var(--accent-2)]">
            NASA // ASTRONOMY PICTURE OF THE DAY
          </p>
          <p className="font-mono text-[11px] text-dim">{apod.date}</p>
        </div>

        <div className="hud-corners rounded-lg overflow-hidden border border-line bg-panel/60">
          {apod.media_type === "image" ? (
            <img
              src={apod.url}
              alt={apod.title}
              className="w-full max-h-[70vh] object-contain bg-black"
            />
          ) : (
            <iframe
              src={apod.url}
              className="w-full aspect-video"
              allow="encrypted-media; picture-in-picture"
            />
          )}
        </div>

        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-paper">
              {apod.title}
            </h1>
            {apod.copyright && (
              <p className="font-mono text-[11px] text-dim mt-1">
                © {apod.copyright.trim()}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0 pt-1">
            <Link
              href={`/space?date=${shiftDate(apod.date, -1)}`}
              className="font-mono text-[11px] px-2.5 py-1.5 rounded border border-line text-dim hover:text-paper hover:border-[color:var(--accent-2)] transition-colors"
            >
              ← prev
            </Link>
            {isToday ? (
              <span className="font-mono text-[11px] px-2.5 py-1.5 rounded border border-line/50 text-dim/40">
                next →
              </span>
            ) : (
              <Link
                href={`/space?date=${shiftDate(apod.date, 1)}`}
                className="font-mono text-[11px] px-2.5 py-1.5 rounded border border-line text-dim hover:text-paper hover:border-[color:var(--accent-2)] transition-colors"
              >
                next →
              </Link>
            )}
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-dim max-w-2xl">
          {apod.explanation}
        </p>
      </div>
    </main>
  );
}