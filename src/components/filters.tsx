import { Search } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useCharacters } from "@/contexts/CharactersContext";

export function Filters() {
  const { STATE_CONTROLLER } = useCharacters();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [seriesId, setSeriesId] = useState<number>();

  return (
    <div className="mb-8 flex gap-4">
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search character by name"
        className="max-w-[250px]"
      />
      {/* <Input placeholder="Search by series" className="max-w-[250px]" /> */}

      <Button
        onClick={() =>
          STATE_CONTROLLER.fetchCharacters(1, searchTerm, seriesId?.toString())
        }
      >
        <Search className="w-4 h-4 mr-2" /> Filter
      </Button>
    </div>
  );
}
