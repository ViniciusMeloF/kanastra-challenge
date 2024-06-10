import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { api, MARVEL_PUBLIC_KEY } from "@/api";
import { CHARTS_INITIAL_STATE, MARVEL_INITIAL_STATE } from "@/utils/constants";
import { ITEMS_PER_PAGE, scrollTo } from "@/utils/pagination";

interface ICharactersProviderProps {
  children: ReactNode;
}

interface ICharactersContext {
  STATE_CONTROLLER: {
    characters: MarvelApi<Characters>;
    comicsDataChart: ChartData;
    isError: boolean;
    isLoading: boolean;
    fetchCharacters: (
      page: number,
      searchTerm?: string,
      seriesId?: string
    ) => Promise<void>;
  };
  PAGINATION_CONTROLLER: {
    currentPage: number;
    handlePageChange: (page: number) => void;
  };
  DETAILS_CONTROLLER: {
    selectedCharacter: Characters;
    isOpen: boolean;
    handleOpen: (char: Characters) => void;
    handleClose: (open: boolean) => void;
  };
}

const CharactersContext = createContext<ICharactersContext>(
  {} as ICharactersContext
);

const CharactersProvider = ({ children }: ICharactersProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [comicsDataChart, setComicsDataChart] =
    useState<ChartData>(CHARTS_INITIAL_STATE);
  const [characters, setCharacters] =
    useState<MarvelApi<Characters>>(MARVEL_INITIAL_STATE);
  const [selectedCharacter, setSelectedCharacter] = useState<Characters>(
    {} as Characters
  );

  const getComicsDataToChart = (data: MarvelApi<Characters>) => {
    const series = [
      {
        name: "Comics",
        data: data.results.map((char) => char.comics.available),
      },
    ];

    const categories = data.results.map((char) => char.name);

    setComicsDataChart({
      series: series,
      categories: categories,
    });
  };

  const fetchCharacters = async (
    page: number,
    searchTerm: string = "",
    seriesId: string = ""
  ) => {
    try {
      setIsLoading(true);
      setIsError(false);

      const offset = (page - 1) * ITEMS_PER_PAGE;

      const queryParams = {
        apikey: MARVEL_PUBLIC_KEY,
        offset: offset.toString(),
        limit: ITEMS_PER_PAGE.toString(),
        ...(searchTerm && { nameStartsWith: searchTerm }),
        ...(seriesId && { series: seriesId.toString() }),
      };
      const queryString = new URLSearchParams(queryParams).toString();

      const { data } = await api.get<MarvelApiResponse<Characters>>(
        `https://gateway.marvel.com/v1/public/characters?${queryString}`
      );

      setCharacters(data);
      getComicsDataToChart(data);

      scrollTo("top");
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDetails = (char: Characters) => {
    setIsOpen(true);
    setSelectedCharacter(char);
  };

  const handleCloseDetails = (open: boolean) => {
    setIsOpen(open);
    setSelectedCharacter({} as Characters);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchCharacters(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const DETAILS_CONTROLLER = {
    selectedCharacter,
    isOpen,
    handleOpen: handleOpenDetails,
    handleClose: handleCloseDetails,
  };

  const PAGINATION_CONTROLLER = {
    currentPage,
    handlePageChange,
  };

  const STATE_CONTROLLER = {
    characters,
    comicsDataChart,
    isError,
    isLoading,
    fetchCharacters,
  };

  return (
    <CharactersContext.Provider
      value={{
        STATE_CONTROLLER,
        PAGINATION_CONTROLLER,
        DETAILS_CONTROLLER,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
};

const useCharacters = () => {
  const context = useContext(CharactersContext);

  if (!context) {
    throw new Error("useCharacters must be used within a CharactersProvider");
  }

  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useCharacters, CharactersProvider };
