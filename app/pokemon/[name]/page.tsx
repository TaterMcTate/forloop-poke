import Image from 'next/image';
import Link from 'next/link';
import { getPokemonDetails } from "@/lib/getPokemon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default async function PokemonDetailsPage({ params }: { params: { name: string } }) {
  const pokemon = await getPokemonDetails(params.name);
  
  if (!pokemon) {
    return <div className="text-center">Pokémon not found</div>;
  }
  
  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      {pokemon.image && <Image src={pokemon.image} alt={pokemon.name} width={250} height={250} className="mb-4" />}
      <h1 className="text-3xl font-bold text-center capitalize">{pokemon.name} <span className="text-gray-500">#{pokemon.number}</span></h1>
      
      <Card className="w-full mt-4">
        <CardContent className="p-4">{pokemon.description}</CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 w-full max-w-4xl">
        
        <Card>
          <CardHeader><CardTitle>Basic Info</CardTitle></CardHeader>
          <CardContent>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Category: {pokemon.category}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader><CardTitle>Types & Weaknesses</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {pokemon.types.length > 0 ? pokemon.types.map((type) => (
                <Badge key={type} variant="secondary" className="capitalize">{type}</Badge>
              )) : <p>No types available</p>}
            </div>
            <p className="mt-2 text-sm text-gray-500">Weaknesses: TBD</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader><CardTitle>Abilities</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.length > 0 ? pokemon.abilities.map((ability) => (
                <Badge key={ability} variant="outline" className="capitalize">{ability}</Badge>
              )) : <p>No abilities available</p>}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-full">
          <CardHeader><CardTitle>Stats</CardTitle></CardHeader>
          <CardContent>
            {pokemon.stats.length > 0 ? pokemon.stats.map((stat) => (
              <div key={stat.name} className="mb-2">
                <p className="capitalize text-sm font-medium">{stat.name}</p>
                <Progress value={stat.value} className="h-2" />
              </div>
            )) : <p>No stats available</p>}
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between w-full max-w-4xl mt-6">
        <Link href="/">
          <Button variant="outline">Return to Home</Button>
        </Link>
        <div className="flex gap-4">
          {pokemon.number > 1 && (
            <Link href={`/pokemon/${pokemon.number - 1}`}>
              <Button variant="secondary">Previous</Button>
            </Link>
          )}
          <Link href={`/pokemon/${pokemon.number + 1}`}>
            <Button variant="secondary">Next</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}