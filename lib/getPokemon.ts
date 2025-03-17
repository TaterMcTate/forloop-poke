import { Pokemon, PokemonDetails } from "@/types";

export async function getPokemon(offset = 0, limit = 10) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await res.json();
    
    return Promise.all(
      data.results.map(async (pokemon: { name: string; url: string }) => {
        const detailsRes = await fetch(pokemon.url);
        const details = await detailsRes.json();
        return {
          name: pokemon.name,
          image: details.sprites.front_default,
          url: pokemon.url,
          types: details.types.map((t: any) => ({ name: t.type.name })), // Fetching types correctly as objects
        };
      })
    );
  }

  export async function getPokemonDetails(name: string) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) return null;
    const details = await res.json();
    
    const speciesRes = await fetch(details.species?.url || "");
    const species = speciesRes.ok ? await speciesRes.json() : {};
    
    const descriptionEntry = species?.flavor_text_entries?.find((entry: any) => entry.language.name === 'en');
    const description = descriptionEntry ? descriptionEntry.flavor_text.replace(/\f/g, ' ') : 'No description available.';
    
    return {
      name: details.name || "Unknown",
      image: details.sprites?.other?.["official-artwork"]?.front_default || "",
      number: details.id || 0,
      height: details.height || 0,
      weight: details.weight || 0,
      types: details.types?.map((t: any) => t.type.name) || [],
      abilities: details.abilities?.map((a: any) => a.ability.name) || [],
      stats: details.stats?.map((s: any) => ({ name: s.stat.name, value: s.base_stat })) || [],
      weaknesses: [], // Placeholder (can be fetched with further logic)
      category: species?.genera?.find((g: any) => g.language.name === 'en')?.genus || 'Unknown',
      description,
    };
  }