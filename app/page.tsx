import Link from "next/link";

interface Tool {
  code: string;
  name: string;
  href: string;
  description: string;
  accent: string;
  porthole: React.ReactNode;
}

function SpacePorthole() {
  const dots = [
    { top: "20%", left: "18%", size: 2, delay: "0s" },
    { top: "60%", left: "30%", size: 1.5, delay: "0.4s" },
    { top: "35%", left: "55%", size: 2, delay: "0.9s" },
    { top: "75%", left: "70%", size: 1.5, delay: "0.2s" },
    { top: "15%", left: "80%", size: 2, delay: "1.2s" },
    { top: "50%", left: "88%", size: 1.5, delay: "0.7s" },
  ];
  return (
    <div className="porthole-space absolute inset-0">
      {dots.map((d, i) => (
        <span
          key={i}
          style={{
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            animationDelay: d.delay,
          }}
        />
      ))}
    </div>
  );
}

function MoviesPorthole() {
  return (
    <div className="porthole-movies absolute inset-0">
      <div className="sprockets">
        {Array.from({ length: 4 }).map((_, row) => (
          <div key={row}>
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function WeatherPorthole() {
  return (
    <div className="porthole-weather absolute inset-0">
      <div
        className="absolute rounded-full bg-white/25"
        style={{
          width: 34,
          height: 12,
          left: "38%",
          top: "42%",
          filter: "blur(1px)",
          animation: "rise 4s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full bg-white/20"
        style={{
          width: 22,
          height: 9,
          left: "58%",
          top: "55%",
          filter: "blur(1px)",
          animation: "rise 5s ease-in-out infinite 0.6s",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 16,
          height: 16,
          left: "70%",
          top: "20%",
          background: "#fff4d6",
          boxShadow: "0 0 14px 4px rgba(255,244,214,0.7)",
        }}
      />
    </div>
  );
}

function PokedexPorthole() {
  return (
    <div className="porthole-pokedex absolute inset-0">
      <div
        className="absolute rounded-full border-4 border-white/90"
        style={{
          width: 36,
          height: 36,
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          animation: "spin-slow 6s linear infinite",
        }}
      >
        <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 bg-white/90" />
        <div
          className="absolute rounded-full bg-white border-2 border-black/40"
          style={{
            width: 12,
            height: 12,
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
      </div>
    </div>
  );
}

const tools: Tool[] = [
  {
    code: "PKX",
    name: "Pokédex",
    href: "/pokedex",
    description: "Search any Pokémon and see its stats.",
    accent: "#ff5b5b",
    porthole: <PokedexPorthole />,
  },
  {
    code: "SPC",
    name: "Space",
    href: "/space",
    description: "NASA's photo of the day, archived daily.",
    accent: "#9d8cff",
    porthole: <SpacePorthole />,
  },
  {
    code: "MOV",
    name: "Movies",
    href: "/movies",
    description: "Trending titles, trailers, and a watchlist.",
    accent: "#e8b84b",
    porthole: <MoviesPorthole />,
  },
  {
    code: "WTR",
    name: "Weather",
    href: "/weather",
    description: "Current conditions and a 7-day forecast.",
    accent: "#7cb4e8",
    porthole: <WeatherPorthole />,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen px-5 sm:px-8 py-14 max-w-5xl mx-auto">
      <p className=" text-[11px] tracking-[0.2em] text-signal mb-3">
        SYSTEM // ONLINE
      </p>
      <h1 className=" text-4xl sm:text-5xl font-semibold tracking-tight text-paper mb-3">
        Playground
      </h1>
      <p className="text-dim max-w-md mb-12">
        A console of small tools. Each one runs on a different API and lives
        in its own world — pick a channel below.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="hud-corners group relative overflow-hidden rounded-lg border border-line bg-panel hover:border-line/0 transition-colors"
            style={{ "--corner-color": tool.accent } as React.CSSProperties}
          >
            <div className="relative h-24 overflow-hidden">
              {tool.porthole}
              <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/10 to-transparent" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <span
                  className=" text-[10px] tracking-[0.15em]"
                  style={{ color: tool.accent }}
                >
                  {tool.code}
                </span>
                <span className=" text-[10px] text-dim group-hover:text-paper transition-colors">
                  open →
                </span>
              </div>
              <h2 className="font-display text-xl font-semibold text-paper">
                {tool.name}
              </h2>
              <p className="text-sm text-dim mt-0.5">{tool.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex items-center gap-2 text-xs text-dim ">
        <span>
          saved movies live in{" "}
          <Link href="/watchlist" className="text-paper hover:text-signal underline underline-offset-2">
            /watchlist
          </Link>
        </span>
      </div>
    </main>
  );
}