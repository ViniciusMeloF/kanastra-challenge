import { useState } from "react";
import { Search } from "lucide-react";

import { useCharacters } from "@/contexts/CharactersContext";
import { MARVEL_API_URL, MARVEL_PUBLIC_KEY, api } from "@/api";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ComboBoxItemType, Combobox } from "./ui/combobox";

export function Filters() {
  const { STATE_CONTROLLER } = useCharacters();

  const [isLoading, setIsLoading] = useState(false);
  const [series, setSeries] = useState<ComboBoxItemType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [seriesId, setSeriesId] = useState<string>("");

  const fetchSeries = async (value = "") => {
    try {
      setIsLoading(true);

      const queryParams = {
        apikey: MARVEL_PUBLIC_KEY,
        ...(value && { titleStartsWith: value }),
      };
      const queryString = new URLSearchParams(queryParams).toString();

      const { data } = await api.get<MarvelApiResponse<Series>>(
        `${MARVEL_API_URL}/series?${queryString}`
      );

      const formattedSeries = data.results.map((item) => ({
        value: item.id.toString(),
        label: item.title,
      }));

      setSeries(formattedSeries);
    } catch {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSeriesSearchChanged = async (value: string) => {
    await fetchSeries(value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSeriesId("");
    setSeries([]);

    STATE_CONTROLLER.fetchCharacters(1);
  };

  return (
    <div className="mb-8 flex gap-4">
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search character by name"
        className="max-w-[250px]"
      />

      <Combobox
        items={series}
        value={seriesId}
        onInputValueChange={handleSeriesSearchChanged}
        onSelect={(value) => {
          setSeriesId(value);
        }}
        isLoading={isLoading}
      />

      <Button
        onClick={() =>
          STATE_CONTROLLER.fetchCharacters(1, searchTerm, seriesId)
        }
      >
        <Search className="w-4 h-4 mr-2" /> Filter
      </Button>
      <Button variant="secondary" onClick={clearFilters}>
        Clear filters
      </Button>
    </div>
  );
}
