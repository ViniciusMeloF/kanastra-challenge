import { useState } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { debounce } from "@/utils/debounce";
import { useTranslation } from "react-i18next";

export type ComboBoxItemType = {
  value: string;
  label: string;
};

interface ComboboxProps {
  items: ComboBoxItemType[];
  value: string;
  onInputValueChange: (value: string) => void;
  onSelect: (value: string) => void;
  isLoading: boolean;
}

export function Combobox({
  items,
  value,
  onInputValueChange,
  onSelect,
  isLoading,
}: ComboboxProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleOnSearchChange = (e: string) => {
    if (e === "") {
      return;
    }

    if (onInputValueChange) {
      onInputValueChange(e);
    }
  };

  const debouncedHandleOnSearchChange = debounce(handleOnSearchChange, 1000);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          type="button"
          role="combobox"
          aria-expanded={open}
          className="w-full md:w-[300px] lg:w-[300px] justify-between "
        >
          {value ? (
            <span className="font-normal">
              {items.find((item) => item.value === value)?.label}
            </span>
          ) : (
            <span className="text-muted-foreground font-normal">
              {t("filters.searchSeries")}
            </span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            onValueChange={debouncedHandleOnSearchChange}
            placeholder={t("filters.comboboxInputPlaceholder")}
          />
          <CommandList>
            {isLoading && (
              <div className="flex justify-center items-center my-2">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("loading")}
              </div>
            )}

            {!isLoading && (
              <>
                <CommandEmpty>{t("filters.comboboxEmpty")}</CommandEmpty>
                <CommandGroup>
                  {items.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={(currentValue) => {
                        onSelect(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === item.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
