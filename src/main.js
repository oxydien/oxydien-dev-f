import "./assets/main.scss";

import { createApp } from "vue";
import Main from "./Main.vue";

import { createPinia } from "pinia";

createApp(Main)
  .use(
    createPinia({
      devtools: false,
    })
  )
  .mount("#oxydien_dev");
