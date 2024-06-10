import { useTranslation } from "react-i18next";
import Divider from "./divider";
import { LanguageSelector } from "@/lib/i18n/language-selector";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <>
      <header className="flex flex-col gap-4 justify-between md:flex-row lg:flex-row">
        <div>
          <h1 className="text-red-500 font-display text-5xl ">
            Kanastra Marvel Challenge
          </h1>
          <p className="text-gray-400 text-2xl font-body">{t("welcome")}</p>
        </div>

        <LanguageSelector />
      </header>

      <Divider className="my-8" />
    </>
  );
}
