import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { nextI18NextConfig } from "./next-i18next.config.js";

const { i18n: i18nConfig, localePath } = nextI18NextConfig;

i18n.use(initReactI18next).init({
  ...i18nConfig,
  backend: {
    loadPath: `${localePath}/{{lng}}/{{ns}}.json`,
  },
});

export default i18n;
