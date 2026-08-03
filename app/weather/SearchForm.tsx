"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SearchForm() {
  const [city, setCity] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (city.trim()) {
      router.push(`/weather?city=${encodeURIComponent(city)}`);
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search a city..."
        className="bg-black/20 border border-white/25 rounded-md px-3 py-2 flex-1 text-white placeholder:text-white/60 focus:outline-none focus:border-white/70 backdrop-blur-sm transition-colors"
      />
      <button
        type="submit"
        className="bg-white/90 text-ink font-medium px-4 py-2 rounded-md hover:bg-white transition-colors"
      >
        Search
      </button>
    </form>
  );
}