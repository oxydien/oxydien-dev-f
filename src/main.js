import "./assets/main.scss";

import { createApp } from "vue";
import Main from "./Main.vue";

import { createPinia } from "pinia";
import { useAppStore } from "./stores/appStore.js";

createApp(Main)
	.use(
		createPinia({
			devtools: false,
		}),
	)
	.mount("#oxydien_dev");

if (localStorage.getItem("language") != null) {
	useAppStore().setLang(localStorage.getItem("language") || "en-us");
} else {
	useAppStore().setLang(navigator.language.includes("cs") ? "cs-cz" : "en-us");
}
