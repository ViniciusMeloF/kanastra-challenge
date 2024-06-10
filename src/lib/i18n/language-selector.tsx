import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BRFlag } from "@/assets/br-flag";
import { USFlag } from "@/assets/us-flag";

export function LanguageSelector() {
  const {
    t,
    i18n: { changeLanguage },
  } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState("pt");

  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "pt" : "en";

    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  };

  return (
    <Select value={currentLanguage} onValueChange={handleChangeLanguage}>
      <SelectTrigger className="w-[140px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t("language")}</SelectLabel>
          <SelectItem value="pt">
            <div className="flex gap-2">
              <BRFlag />
              PT-BR
            </div>
          </SelectItem>
          <SelectItem value="en">
            <div className="flex gap-2">
              <USFlag />
              EN-US
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
