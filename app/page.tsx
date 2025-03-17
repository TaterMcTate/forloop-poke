"use client"
import { getPokemon } from "@/lib/getPokemon";
import PokemonCard from "@/components/PokemonCard";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import { useEffect, useState } from "react";
import { Pokemon } from "@/types";

export default function Home() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    async function fetchPokemon() {
      const data = await getPokemon(offset);
      setPokemonList(data);
    }
    fetchPokemon();
  }, [offset]);

  function handleSearch(query: string) {
    setSearchTerm(query.toLowerCase());
  }
  
  function handleNext() {
    setOffset((prev) => prev + 10);
  }
  
  function handlePrev() {
    if (offset > 0) {
      setOffset((prev) => prev - 10);
    }
  }
  
  const filteredPokemon = pokemonList.filter((p) => p.name.includes(searchTerm));
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Pokémon List</h1>
      <Search onSearch={handleSearch} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      <Pagination onNext={handleNext} onPrev={handlePrev} disablePrev={offset === 0} />
    </div>
  );
}