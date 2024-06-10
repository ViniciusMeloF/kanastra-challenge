import { Info } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Skeleton } from "./ui/skeleton";

import { ComicsChart } from "./comics-chart";
import { EmptyState } from "./empty-state";
import { useCharacters } from "@/contexts/CharactersContext";
import { useTranslation } from "react-i18next";

export function ComicsChartSection() {
  const { t } = useTranslation();
  const { STATE_CONTROLLER } = useCharacters();

  if (STATE_CONTROLLER.isLoading) {
    return (
      <Skeleton className="flex flex-col overflow-hidden rounded-lg border flex-1 h-[500px] shadow-lg shadow-black mb-8" />
    );
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border flex-1 h-[500px] shadow-lg shadow-black mb-8">
      <div className="flex items-baseline gap-2 text-center w-full p-4">
        <span className="text-3xl font-body text-white">{t("comics")}</span>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="bg-slate-600 rounded-full cursor-default hover:bg-slate-500">
                <Info className="h-5 w-5" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("tooltip.comicsChart")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="w-full h-full">
        {STATE_CONTROLLER.comicsDataChart.categories.length > 0 ? (
          <ComicsChart data={STATE_CONTROLLER.comicsDataChart} />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
