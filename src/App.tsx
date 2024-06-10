import { useState } from "react";
import { Search } from "lucide-react";

import { CharacterDetails } from "./components/character-details";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { EmptyState } from "./components/empty-state";
import { ComicsChartSection } from "./components/comics-chart-section";
import { CharacterListPagination } from "./components/character-list-pagination";
import { CharacterList } from "./components/character-list";
import { HeroSection } from "./components/hero-section";

import { api } from "./api";
import { ITEMS_PER_PAGE, scrollTo } from "./utils/pagination";

function App() {
  const [characters, setCharacters] = useState<MarvelApi<Characters>>({
    offset: 0,
    limit: 20,
    total: 200,
    count: 0,
    results: [
      {
        id: 0,
        thumbnail: {
          path: "https://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16",
          extension: "jpg",
        },
        description:
          "Bitten by a radioactive spider, high school student Peter Parker gained the speed, strength and powers of a spider. Adopting the name Spider-Man, Peter hoped to start a career using his new abilities. Taught that with great power comes great responsibility, Spidey has vowed to use his powers to help people.",
        name: "A-Bomb (HAS)",
        comics: {
          available: 2,
          collectionURI:
            "http://gateway.marvel.com/v1/public/characters/1009368/comics",
        },
        series: {
          available: 0,
          collectionURI:
            "http://gateway.marvel.com/v1/public/characters/1009368/series",
        },
      },
      {
        id: 0,
        thumbnail: {
          path: "https://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16",
          extension: "jpg",
        },
        description:
          "Bitten by a radioactive spider, high school student Peter Parker gained the speed, strength and powers of a spider. Adopting the name Spider-Man, Peter hoped to start a career using his new abilities. Taught that with great power comes great responsibility, Spidey has vowed to use his powers to help people.",
        name: "A-Bomb (HAS)",
        comics: {
          available: 0,
          collectionURI:
            "http://gateway.marvel.com/v1/public/characters/1009368/comics",
        },
        series: {
          available: 0,
          collectionURI:
            "http://gateway.marvel.com/v1/public/characters/1009368/series",
        },
      },
      {
        id: 0,
        thumbnail: {
          path: "https://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16",
          extension: "jpg",
        },
        description:
          "Bitten by a radioactive spider, high school student Peter Parker gained the speed, strength and powers of a spider. Adopting the name Spider-Man, Peter hoped to start a career using his new abilities. Taught that with great power comes great responsibility, Spidey has vowed to use his powers to help people.",
        name: "A-Bomb (HAS)",
        comics: {
          available: 0,
          collectionURI:
            "http://gateway.marvel.com/v1/public/characters/1009368/comics",
        },
        series: {
          available: 0,
          collectionURI:
            "http://gateway.marvel.com/v1/public/characters/1009368/series",
        },
      },
      {
        id: 0,
        thumbnail: {
          path: "https://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16",
          extension: "jpg",
        },
        description:
          "Bitten by a radioactive spider, high school student Peter Parker gained the speed, strength and powers of a spider. Adopting the name Spider-Man, Peter hoped to start a career using his new abilities. Taught that with great power comes great responsibility, Spidey has vowed to use his powers to help people.",
        name: "A-Bomb (HAS)",
        comics: {
          available: 0,
          collectionURI:
            "http://gateway.marvel.com/v1/public/characters/1009368/comics",
        },
        series: {
          available: 0,
          collectionURI:
            "http://gateway.marvel.com/v1/public/characters/1009368/series",
        },
      },
      {
        id: 0,
        thumbnail: {
          path: "https://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16",
          extension: "jpg",
        },
        description:
          "Bitten by a radioactive spider, high school student Peter Parker gained the speed, strength and powers of a spider. Adopting the name Spider-Man, Peter hoped to start a career using his new abilities. Taught that with great power comes great responsibility, Spidey has vowed to use his powers to help people.",
        name: "A-Bomb (HAS)",
        comics: {
          available: 0,
          collectionURI:
            "http://gateway.marvel.com/v1/public/characters/1009368/comics",
        },
        series: {
          available: 0,
          collectionURI:
            "http://gateway.marvel.com/v1/public/characters/1009368/series",
        },
      },
      {
        id: 0,
        thumbnail: {
          path: "https://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16",
          extension: "jpg",
        },
        description:
          "Bitten by a radioactive spider, high school student Peter Parker gained the speed, strength and powers of a spider. Adopting the name Spider-Man, Peter hoped to start a career using his new abilities. Taught that with great power comes great responsibility, Spidey has vowed to use his powers to help people.",
        name: "A-Bomb (HAS)",
        comics: {
          available: 0,
          collectionURI:
            "http://gateway.marvel.com/v1/public/characters/1009368/comics",
        },
        series: {
          available: 0,
          collectionURI:
            "http://gateway.marvel.com/v1/public/characters/1009368/series",
        },
      },
      {
        id: 0,
        thumbnail: {
          path: "https://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16",
          extension: "jpg",
        },
        description:
          "Bitten by a radioactive spider, high school student Peter Parker gained the speed, strength and powers of a spider. Adopting the name Spider-Man, Peter hoped to start a career using his new abilities. Taught that with great power comes great responsibility, Spidey has vowed to use his powers to help people.",
        name: "A-Bomb (HAS)",
        comics: {
          available: 0,
          collectionURI:
            "http://gateway.marvel.com/v1/public/characters/1009368/comics",
        },
        series: {
          available: 0,
          collectionURI:
            "http://gateway.marvel.com/v1/public/characters/1009368/series",
        },
      },
    ],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Characters>(
    {} as Characters
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [comicsChart, setComicsChart] = useState<ChartData>({
    categories: [],
    series: [
      {
        name: "",
        data: [],
      },
    ],
  });

  const [isLoading, setIsLoading] = useState(false);

  // Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [seriesId, setSeriesId] = useState<number | null>(null);

  // useEffect(() => {
  //   const root = window.document.documentElement;

  //   root.classList.remove("light", "dark");

  //   // root.classList.add("dark");
  // }, []);

  const handleOpenCharacterDetails = (open: boolean) => {
    setIsOpen(open);
    setSelectedCharacter({} as Characters);
  };

  const getComicsDataToChart = (data: MarvelApi<Characters>) => {
    const series = [
      {
        name: "Comics",
        data: data.results.map((char) => char.comics.available),
      },
    ];

    const categories = data.results.map((char) => char.name);

    setComicsChart({
      series: series,
      categories: categories,
    });
  };

  const fetchCharacters = async (page: number, searchTerm: string = "") => {
    try {
      setIsLoading(true);
      const offset = (page - 1) * ITEMS_PER_PAGE;

      const queryParams = {
        apikey: "3a1b49c04680bf0717ab0c222f363ffc",
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
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchCharacters(currentPage);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCardClick = (char: Characters) => {
    setIsOpen(true);
    setSelectedCharacter(char);
  };

  return (
    <main id="top" className="min-h-screen ">
      <div className="max-w-7xl m-auto p-6">
        <HeroSection />

        <div>
          <div className="mb-8 flex gap-4">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search character by name"
              className="max-w-[250px]"
            />
            {/* <Input placeholder="Search by series" className="max-w-[250px]" /> */}

            <Button onClick={() => fetchCharacters(1, searchTerm)}>
              <Search className="w-4 h-4 mr-2" /> Filter
            </Button>
          </div>

          {characters.total === 0 ? (
            <EmptyState />
          ) : (
            <>
              <ComicsChartSection
                isLoading={isLoading}
                comicsChartData={comicsChart}
              />

              <CharacterList
                characters={characters}
                handleCardClick={handleCardClick}
                isLoading={isLoading}
              />

              {characters.total > 20 && (
                <CharacterListPagination
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                  total={characters.total}
                />
              )}
            </>
          )}
        </div>
      </div>

      {isOpen && (
        <CharacterDetails
          open={isOpen}
          setOpen={handleOpenCharacterDetails}
          character={selectedCharacter}
        />
      )}
    </main>
  );
}

export default App;
