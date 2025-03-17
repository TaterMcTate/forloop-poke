import { Input } from "@/components/ui/input";

interface SearchProps {
  onSearch: (query: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  return (
    <div className="flex justify-center mb-4">
      <Input placeholder="Search Pokémon..." onChange={(e) => onSearch(e.target.value)} />
    </div>
  );
}