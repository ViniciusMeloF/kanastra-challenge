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

interface ComicsChartSectionProps {
  isLoading: boolean;
  comicsChartData: ChartData;
}

export function ComicsChartSection({
  isLoading,
  comicsChartData,
}: ComicsChartSectionProps) {
  if (isLoading) {
    return (
      <Skeleton className="flex flex-col overflow-hidden rounded-lg border flex-1 h-[500px] shadow-lg shadow-black mb-8" />
    );
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border flex-1 h-[500px] shadow-lg shadow-black mb-8">
      <div className="flex items-baseline gap-2 text-center w-full p-4">
        <span className="text-3xl font-body text-white">Comics</span>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="bg-slate-600 rounded-full cursor-default hover:bg-slate-500">
                <Info className="h-5 w-5" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Number of comics per characters listed on screen</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="w-full h-full">
        {comicsChartData.categories.length > 0 ? (
          <ComicsChart data={comicsChartData} />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
