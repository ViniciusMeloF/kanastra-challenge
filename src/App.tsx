import { useEffect, useState } from "react";
import { CharacterDetails } from "./components/character-details";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { api } from "./api";
import { Info, Search } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";
import Divider from "./components/divider";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { EmptyState } from "./components/empty-state";

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
  const [comicsChart, setComicsChart] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenCharacterDetails = (open: boolean) => {
    setIsOpen(open);
    setSelectedCharacter({} as Characters);
  };

  const fetchCharacters = async (page: number, searchTerm: string = "") => {
    try {
      const offset = (page - 1) * characters.limit;

      const queryParams = {
        apikey: "3a1b49c04680bf0717ab0c222f363ffc",
        offset: offset.toString(),
        limit: characters.limit.toString(),
        ...(searchTerm && { nameStartsWith: searchTerm }),
      };
      const queryString = new URLSearchParams(queryParams).toString();

      const { data } = await api.get<MarvelApiResponse<Characters>>(
        `https://gateway.marvel.com/v1/public/characters?${queryString}`
      );
      setCharacters(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getComicsDataToChart = () => {
    const data = characters.results.map((char) => ({
      comicsQuantity: char.comics.available,
      character: char.name,
    }));

    setComicsChart(data);
  };

  useEffect(() => {
    getComicsDataToChart();
  }, [characters]);

  // useEffect(() => {
  //   fetchCharacters(currentPage);
  // }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(characters.total / characters.limit) || 1;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const renderPaginationItems = () => {
    const maxVisiblePages = 2;
    const ellipsis = -1;

    let localPages = [];

    if (totalPages > 5) {
      const start = Math.max(2, currentPage - maxVisiblePages);
      const end = Math.min(totalPages - 1, currentPage + maxVisiblePages);

      if (start > 2) {
        localPages.push(1, ellipsis);
      } else {
        localPages.push(1);
      }

      for (let i = start; i <= end; i++) {
        localPages.push(i);
      }

      if (end < totalPages - 1) {
        localPages.push(ellipsis, totalPages);
      } else {
        localPages.push(totalPages);
      }
    } else {
      localPages = pages;
    }

    return localPages.map((page, index) => (
      <PaginationItem key={index}>
        {page === ellipsis ? (
          <PaginationEllipsis />
        ) : (
          <PaginationLink
            isActive={currentPage === page}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </PaginationLink>
        )}
      </PaginationItem>
    ));
  };

  console.debug(characters);

  console.debug("comicsChart -> ", comicsChart);

  return (
    <main className="min-h-screen ">
      <div className="max-w-7xl m-auto p-6">
        <header className="flex justify-between">
          <div>
            <h1 className="text-red-500 font-display text-5xl ">
              Kanastra Marvel Challenge
            </h1>
            <p className="text-gray-400 text-2xl font-body">
              Explore the diverse and iconic Marvel characters
            </p>
          </div>
        </header>

        <Divider className="my-8" />

        <main>
          <div className="mb-8 flex gap-4">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search character by name"
              className="max-w-[250px]"
            />
            {/* <Input placeholder="Search by series" className="max-w-[250px]" /> */}

            <Button onClick={() => fetchCharacters(1, searchTerm)}>
              <Search className="w-4 h-4 mr-2" /> Filtrar
            </Button>
          </div>

          {characters.total === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* feed-item-content d-flex flex-column pt-2 pb-2 border color-border-default rounded-2 color-shadow-small width-full height-fit */}
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div className="flex flex-col overflow-hidden rounded-lg bg-neutral-800 flex-1 h-[315px] shadow-lg shadow-black md:col-span-1 lg:col-span-1">
                  <div className="flex items-baseline gap-2 text-center w-full p-4">
                    <span className="text-3xl font-body text-white">
                      Comics
                    </span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="bg-slate-600 rounded-full cursor-pointer hover:bg-slate-500">
                            <Info className="h-5 w-5" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Number of comics per characters listed on screen
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="w-full h-full flex justify-center items-center">
                    <div className="rounded-full border-[18px] border-neutral-700 w-52 h-52" />
                  </div>
                </div>

                {characters.results.map((char) => (
                  <div
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedCharacter(char);
                    }}
                    className="overflow-hidden rounded-lg bg-slate-400 flex-1 h-[315px] shadow-lg shadow-black cursor-pointer hover:transition-transform duration-300 ease-in-out hover:-translate-y-2"
                  >
                    <img
                      className="w-full h-[265px] object-cover aspect-square"
                      src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
                    />

                    <div className="bg-white w-full p-2 text-center">
                      <span className="text-red-500 font-display text-3xl text-center">
                        {char.name}
                      </span>
                    </div>
                  </div>
                ))}
                {/* <div className="rounded-lg bg-slate-400 flex-1 h-[250px] shadow-lg shadow-black"></div>
            <div className="rounded-lg bg-slate-400 flex-1 h-[250px] shadow-lg shadow-black"></div>
            <div className="rounded-lg bg-slate-400 flex-1 h-[250px] shadow-lg shadow-black"></div> */}
              </div>

              {characters.total > 0 && characters.total > 20 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        className="cursor-pointer"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      />
                    </PaginationItem>
                    {renderPaginationItems()}
                    <PaginationItem>
                      <PaginationNext
                        className="cursor-pointer"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={
                          currentPage ===
                          Math.ceil(characters.total / characters.limit)
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </main>
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
