import { Loader2 } from "lucide-react";

import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";
import { EmptyState } from "./empty-state";

import { ITEMS_PER_PAGE } from "@/utils/pagination";
import { useTranslation } from "react-i18next";

interface CharacterMediaListProps {
  title: string;
  media: MarvelApi<Comics | Series>;
  handleShowMore: (offset?: number) => Promise<void>;
  isLoading: boolean;
}

const MediaListSkeleton = () => {
  return (
    <div data-testid="loading-media-list" className="flex items-center gap-2">
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
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xl font-display">{`${title} - ${media.total}`}</h3>

      {media.results.length === 0 && !isLoading && (
        <EmptyState
          title={t("mediaEmptyState.title")}
          description={t("mediaEmptyState.description")}
        />
      )}

      {media.results.length === 0 &&
        isLoading &&
        Array.from({ length: 4 }).map((_, index) => (
          <MediaListSkeleton key={index} />
        ))}

      {media.results.length > 0 && (
        <ScrollArea className="max-h-[300px] pr-3">
          <ul className="grid gap-2">
            {media.results.map((item) => (
              <li key={item.id} className="flex items-center gap-2">
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
              onClick={() => handleShowMore(media.offset + ITEMS_PER_PAGE)}
              className="text-sm text-white w-full bg-slate-800 rounded-sm my-2 cursor-pointer transition-colors hover:bg-slate-700 disabled:bg-slate-800 disabled:opacity-50 disabled:cursor-default"
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("loading")}
                </div>
              ) : (
                <span>{t("pagination.showMoreBtn")}</span>
              )}
            </button>
          )}
        </ScrollArea>
      )}
    </div>
  );
}
