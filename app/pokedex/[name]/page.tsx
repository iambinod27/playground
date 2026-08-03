import SearchForm from "../SearchForm";

async function getPokemon(name: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const pokemon = await getPokemon(name);

  return (
    <main className="min-h-screen p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Pokedex</h1>
      <SearchForm />

      {!pokemon && <p className="text-red-500">Pokemon not found.</p> }
      {pokemon && (
        <div className="border rounded-lg p-4">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mx-auto" />
            <h2 className="text-xl font-semibold capitalize text-center">{pokemon.name}</h2>
            <div className="flex gap-2 justify-center mt-2">
                {pokemon.types.map((t: any) => {
                    <span key={t.type.name} className="text-xs bg-gray-100 px-2 py-1 rounded-full capitalize">
                        {t.type.name}
                    </span>
                })}
            </div>
        </div>
      )}
    </main>
  );
}
