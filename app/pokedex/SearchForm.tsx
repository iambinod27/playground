"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SearchForm() {
  const [name, setName] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim()) {
      router.push(`/pokedex/${name.toLowerCase()}`);
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2 mb-6">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Search a Pokemon..."
        className="border rounded-md px-3 py-2 flex-1"
      />
      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded-md"
      >
        Search
      </button>
    </form>
  );
}
