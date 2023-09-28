import { en_us_translation } from "./lang/en-us";
import { cs_cz_translation } from "./lang/cs-cz";

export const translations = {
  "en-us": en_us_translation,
  "cs-cz": cs_cz_translation,
};

export var lang = localStorage.getItem("language") || "en-us";

export function getTranstated(key) {
  const translatedText = translations[lang]
    ? translations[lang][key]
    : translations["en-us"][key];

  return translatedText || key;
}

export function setLanguage(language) {
  localStorage.setItem("language", language);
}
