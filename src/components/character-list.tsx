import { useCharacters } from "@/contexts/CharactersContext";
import { Skeleton } from "./ui/skeleton";

export function CharacterList() {
  const { STATE_CONTROLLER, DETAILS_CONTROLLER } = useCharacters();

  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {STATE_CONTROLLER.isLoading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            data-testid="character-list-loading"
            className="w-full h-[315px] rounded-lg border-4 flex"
          />
        ))
      ) : (
        <>
          {STATE_CONTROLLER.characters.results.map((char) => (
            <div
              key={char.id}
              onClick={() => DETAILS_CONTROLLER.handleOpen(char)}
              className="overflow-hidden rounded-lg border-4 flex flex-col h-[350px] shadow-lg shadow-black cursor-pointer hover:transition-transform duration-300 ease-in-out hover:-translate-y-2"
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
