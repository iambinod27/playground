import SearchForm from "./SearchForm";

export default async function PokedoxPage() {
  return (
    <main className="min-h-screen p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Pokédex</h1>
      <SearchForm />
      <p className="text-gray-500">Search for a Pokemon above.</p>
    </main>
  );
}
