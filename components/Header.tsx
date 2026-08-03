"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/pokedex", label: "Pokédex", code: "PKX" },
  { href: "/space", label: "Space", code: "SPC" },
  { href: "/movies", label: "Movies", code: "MOV" },
  { href: "/watchlist", label: "Watchlist", code: "WL" },
  { href: "/weather", label: "Weather", code: "WTR" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-ink/85 backdrop-blur supports-[backdrop-filter]:bg-ink/70">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 h-14 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <span className="font-display font-semibold tracking-wide text-sm uppercase text-paper">
            Playground
          </span>
        </Link>

        <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 text-[11px] tracking-wide px-2.5 py-1.5 rounded transition-colors ${
                  active
                    ? "text-signal bg-signal/10"
                    : "text-dim hover:text-paper hover:bg-panel-raised"
                }`}
              >
                {active ? "[ " : "  "}
                {item.label.toUpperCase()}
                {active ? " ]" : "  "}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}