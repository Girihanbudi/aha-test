import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AUTH_EN_ERROR_LIST from '@modules/auth/error/auth-en-error-list'

export const resources = {
  en: {
    translation: {
      // AUTH ERROR CODE
      ...AUTH_EN_ERROR_LIST,
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng:"en", //default language
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n