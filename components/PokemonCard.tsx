// components/PokemonCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pokemon } from "@/types";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const pokemonNumber = pokemon.url.split("/").slice(-2, -1)[0];

  return (
    <Card className="flex flex-col items-center p-4">
      <Image src={pokemon.image} alt={pokemon.name} width={120} height={120} className="mb-4" />
      <CardHeader className="text-center">
        <CardTitle className="capitalize text-lg">{pokemon.name}</CardTitle>
        <p className="text-sm text-gray-500">#{pokemonNumber}</p>
      </CardHeader>
      <CardContent className="text-center">
        <div className="flex gap-2 justify-center mt-2">
          {pokemon.types.map((type) => (
            <Badge key={type.name} variant="secondary" className="capitalize">
              {type.name}
            </Badge>
          ))}
        </div>
        <Link href={`/pokemon/${pokemon.name}`}>
          <Button className="mt-4">View Details</Button>
        </Link>
      </CardContent>
    </Card>
  );
}