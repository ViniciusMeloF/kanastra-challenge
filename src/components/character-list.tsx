import { Skeleton } from "./ui/skeleton";

interface CharacterListProps {
  characters: MarvelApi<Characters>;
  handleCardClick: (char: Characters) => void;
  isLoading: boolean;
}

export function CharacterList({
  characters,
  handleCardClick,
  isLoading,
}: CharacterListProps) {
  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {isLoading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            className="w-full h-[315px] rounded-lg border-4 flex"
          />
        ))
      ) : (
        <>
          {characters.results.map((char) => (
            <div
              key={char.id}
              onClick={() => handleCardClick(char)}
              className="overflow-hidden rounded-lg border-4 flex flex-col h-[315px] shadow-lg shadow-black cursor-pointer hover:transition-transform duration-300 ease-in-out hover:-translate-y-2"
            >
              <img
                className="w-full h-[265px] object-cover aspect-square"
                src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
              />

              <div className="w-full p-2 text-center flex-grow flex items-center justify-center">
                <span className="text-red-500 font-display text-xl text-center">
                  {char.name}
                </span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
