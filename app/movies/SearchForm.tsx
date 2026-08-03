"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/movies?q=${encodeURIComponent(query)}`);
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2 mb-8">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search titles..."
        className="bg-panel border border-line rounded-md px-3 py-2 flex-1 text-paper placeholder:text-dim focus:outline-none focus:border-[color:var(--accent)] transition-colors"
      />
      <button
        type="submit"
        className="bg-[color:var(--accent)] text-ink font-medium px-4 py-2 rounded-md hover:brightness-110 transition-[filter]"
      >
        Search
      </button>
    </form>
  );
}