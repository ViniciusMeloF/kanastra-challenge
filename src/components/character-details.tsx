import { useEffect, useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCharacters } from "@/contexts/CharactersContext";
import { MARVEL_INITIAL_STATE } from "@/utils/constants";
import { MARVEL_PUBLIC_KEY, api } from "@/api";
import { ITEMS_PER_PAGE } from "@/utils/pagination";

import { CharacterMediaList } from "./character-media-list";
import { EmptyState } from "./empty-state";
import { useTranslation } from "react-i18next";

export function CharacterDetails() {
  const { t } = useTranslation();
  const { DETAILS_CONTROLLER } = useCharacters();

  const [isLoadingComics, setIsLoadingComics] = useState(true);
  const [isErrorComics, setIsErrorComics] = useState(false);

  const [isLoadingSeries, setIsLoadingSeries] = useState(true);
  const [isErrorSeries, setIsErrorSeries] = useState(false);

  const [comics, setComics] = useState<MarvelApi<Comics>>(MARVEL_INITIAL_STATE);
  const [series, setSeries] = useState<MarvelApi<Series>>(MARVEL_INITIAL_STATE);

  const fetchComics = async (offset = 0) => {
    try {
      setIsLoadingComics(true);
      setIsErrorComics(false);

      const queryParams = {
        apikey: MARVEL_PUBLIC_KEY,
        offset: offset.toString(),
        limit: ITEMS_PER_PAGE.toString(),
      };
      const queryString = new URLSearchParams(queryParams).toString();

      const { data } = await api.get<MarvelApiResponse<Comics>>(
        `${DETAILS_CONTROLLER.selectedCharacter.comics?.collectionURI}?${queryString}`
      );

      setComics((prevComics) => ({
        ...data,
        results: [...prevComics.results, ...data.results],
      }));
    } catch {
      setIsErrorComics(true);
    } finally {
      setIsLoadingComics(false);
    }
  };

  const fetchSeries = async (offset = 0) => {
    try {
      setIsLoadingSeries(true);
      setIsErrorSeries(false);

      const queryParams = {
        apikey: MARVEL_PUBLIC_KEY,
        offset: offset.toString(),
        limit: ITEMS_PER_PAGE.toString(),
      };
      const queryString = new URLSearchParams(queryParams).toString();

      const { data } = await api.get<MarvelApiResponse<Series>>(
        `${DETAILS_CONTROLLER.selectedCharacter.series?.collectionURI}?${queryString}`
      );

      setSeries((prevSeries) => ({
        ...data,
        results: [...prevSeries.results, ...data.results],
      }));
    } catch {
      setIsErrorSeries(true);
    } finally {
      setIsLoadingSeries(false);
    }
  };

  useEffect(() => {
    fetchComics();
    fetchSeries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DETAILS_CONTROLLER.selectedCharacter]);

  return (
    <Dialog
      open={DETAILS_CONTROLLER.isOpen}
      onOpenChange={DETAILS_CONTROLLER.handleClose}
    >
      <DialogContent className="sm:max-w-[700px] max-h-[95%] max-w-[90%] overflow-y-auto">
        <header className="flex gap-4 flex-col sm:flex-row">
          <img
            src={`${DETAILS_CONTROLLER.selectedCharacter?.thumbnail?.path}.${DETAILS_CONTROLLER.selectedCharacter?.thumbnail?.extension}`}
            alt={DETAILS_CONTROLLER.selectedCharacter?.name}
            width={400}
            height={500}
            className="rounded-3xl object-cover w-full self-center max-w-[200px] items-center sm:w-[150px] sm:self-auto"
          />

          <div className="w-full">
            <h2 className="text-3xl font-bold font-display text-red-500">
              {DETAILS_CONTROLLER.selectedCharacter.name}
            </h2>
            <p className="text-gray-400 text-md font-body">
              {DETAILS_CONTROLLER.selectedCharacter.description}
            </p>
          </div>
        </header>

        <main className="grid md:grid-cols-2 gap-6">
          {isErrorComics ? (
            <EmptyState
              title={t("emptyError.title")}
              description={t("emptyError.description")}
            />
          ) : (
            <CharacterMediaList
              title={t("comics")}
              media={comics}
              isLoading={isLoadingComics}
              handleShowMore={fetchComics}
            />
          )}

          {isErrorSeries ? (
            <EmptyState
              title={t("emptyError.title")}
              description={t("emptyError.description")}
            />
          ) : (
            <CharacterMediaList
              title={t("series")}
              media={series}
              isLoading={isLoadingSeries}
              handleShowMore={fetchSeries}
            />
          )}
        </main>
      </DialogContent>
    </Dialog>
  );
}
