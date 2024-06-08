import { Loader2 } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { EmptyState } from "./empty-state";
import { Skeleton } from "./ui/skeleton";

interface CharacterMediaListProps {
  title: string;
  media: MarvelApi<Comics | Series>;
  handleShowMore: (offset?: number) => Promise<void>;
  isLoading: boolean;
}

const MediaListSkeleton = () => {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="w-16 h-16 min-w-16 min-h-16 rounded-lg" />
      <Skeleton className="h-6 w-full" />
    </div>
  );
};

export function CharacterMediaList({
  media,
  title,
  handleShowMore,
  isLoading,
}: CharacterMediaListProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-display">{`${title} - ${media.total}`}</h3>

      {media.results.length === 0 && !isLoading && (
        <EmptyState
          title={`No ${title} Found`}
          description="It looks like there are no comics to display at the moment."
        />
      )}

      {media.results.length === 0 &&
        isLoading &&
        Array.from({ length: 4 }).map(() => <MediaListSkeleton />)}

      {media.results.length > 0 && !isLoading && (
        <ScrollArea className="max-h-[300px] pr-3">
          <ul className="grid gap-2">
            {media.results.map((item) => (
              <li className="flex items-center gap-2">
                <img
                  src={`${item?.thumbnail?.path}.${item?.thumbnail?.extension}`}
                  width={64}
                  height={64}
                  className="w-16 h-16 min-w-16 min-h-16 rounded-lg"
                />
                <span className="font-body text-md">{item.title}</span>
              </li>
            ))}
          </ul>

          {media.results.length < media.total && (
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleShowMore(media.offset + media.limit)}
              className="text-sm text-white w-full bg-neutral-600 rounded-sm my-2 transition-colors hover:bg-neutral-800  disabled:bg-neutral-400"
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Carregando
                </div>
              ) : (
                "Show more"
              )}
            </button>
          )}
        </ScrollArea>
      )}
    </div>
  );
}
