import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => {
    return {
      backend_url: "https://bg.oxydien.dev/",
      connected_to_bg: false,
    };
  },
  actions: {
    changeBackendUrl(url) {
      console.log("BG_URL", `Switching to ${url}`);
      this.backend_url = url;
    },
  },
});

export function checkBgStatus() {
  const appStore = useAppStore();
  const bg_url = appStore.backend_url;
  fetch(bg_url)
    .then((response) => {
      if (response.status === 200) {
        appStore.connected_to_bg = true;
      } else {
        console.warn(
          "_BACKEND",
          `Server responded with weird status: ${response.status}`
        );
      }
    })
    .catch((error) => console.error("Error:", error));
  return appStore.connected_to_bg;
}
