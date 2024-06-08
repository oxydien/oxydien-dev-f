import { defineStore } from "pinia";
import { translations } from "./lang";

export const useAppStore = defineStore("app", {
	state: () => {
		return {
			lang: "en-us",
			langData: {},
		};
	},
	actions: {
		setLang(lang) {
			this.lang = lang;
			this.langData = translations[lang] || translations["en-us"];
			localStorage.setItem("language", lang);
		},
		getTranslation(key) {
			return this.langData[key] || key;
		},
	},
});
