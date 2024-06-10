import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enJSON from "./locales/en/translation.json";
import ptJSON from "./locales/pt/translation.json";

const i18nConfig = {
  resources: {
    en: { ...enJSON },
    pt: { ...ptJSON },
  },
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false,
  },
};

i18n.use(initReactI18next).init(i18nConfig);

export default i18n;
