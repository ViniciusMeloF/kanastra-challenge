import { useEffect, useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { api } from "@/api";

import { CharacterMediaList } from "./character-media-list";

interface CharacterDetailsProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  character: Characters;
}

// TODO: Adicionar tratativa de erro, separar a listagem de series/comics em um componente unico e adicionar um skeleton loading nesse componente
export function CharacterDetails({
  character,
  open,
  setOpen,
}: CharacterDetailsProps) {
  const [loadingComics, setLoadingComics] = useState(true);
  const [loadingSeries, setLoadingSeries] = useState(true);
  const [comics, setComics] = useState<MarvelApi<Comics>>({
    offset: 0,
    limit: 20,
    total: 0,
    count: 0,
    results: [],
  });
  const [series, setSeries] = useState<MarvelApi<Series>>({
    offset: 0,
    limit: 20,
    total: 0,
    count: 0,
    results: [],
  });

  const fetchComics = async (offset = 0) => {
    try {
      setLoadingComics(true);
      const { data } = await api.get<MarvelApiResponse<Comics>>(
        `${character.comics?.collectionURI}?apikey=3a1b49c04680bf0717ab0c222f363ffc&offset=${offset}`
      );

      setComics((prevComics) => ({
        ...data,
        results: [...prevComics.results, ...data.results],
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingComics(false);
    }
  };

  const fetchSeries = async (offset = 0) => {
    try {
      setLoadingSeries(true);
      const { data } = await api.get<MarvelApiResponse<Series>>(
        `${character.series?.collectionURI}?apikey=3a1b49c04680bf0717ab0c222f363ffc&offset=${offset}`
      );

      setSeries((prevSeries) => ({
        ...data,
        results: [...prevSeries.results, ...data.results],
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSeries(false);
    }
  };

  useEffect(() => {
    fetchComics();
    fetchSeries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px] max-h-[95%] max-w-[90%] overflow-y-auto">
        <header className="flex gap-4 flex-col sm:flex-row">
          <img
            src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
            alt={character?.name}
            width={400}
            height={500}
            className="rounded-3xl object-cover w-full self-center max-w-[200px] items-center sm:w-[150px] sm:self-auto"
          />

          <div className="w-full">
            <h2 className="text-3xl font-bold font-display text-red-500">
              {character.name}
            </h2>
            <p className="text-gray-400 text-md font-body">
              {character.description}
            </p>
          </div>
        </header>

        <main className="grid md:grid-cols-2 gap-6">
          <CharacterMediaList
            title="Comics"
            media={comics}
            isLoading={loadingComics}
            handleShowMore={fetchComics}
          />

          <CharacterMediaList
            title="Series"
            media={series}
            isLoading={loadingSeries}
            handleShowMore={fetchSeries}
          />
        </main>
      </DialogContent>
    </Dialog>
  );
}
