<template>
  <div :class="{ main: showOverlay }">
    <index v-if="page === 'index'" />
    <Router
      v-else
      @landing="
        page = 'index';
        load_two();
      "
    />
  </div>
</template>

<script>
import index from "./pages/index.vue";
import Router from "./pages/Router.vue";
import { useStore } from "./stores/routes";
export default {
  components: {
    index,
    Router,
  },
  mounted() {
    this.load();
    window.addEventListener("resize", this.rescaleOverlay);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.rescaleOverlay);
  },
  methods: {
    load() {
      this.rescaleOverlay();
      const search = window.location.search;
      const params = new URLSearchParams(search);
      var pathname = window.location.pathname.substring(1);
      if (pathname) {
        if (pathname.endsWith("/")) {
          useStore().changeRoute(pathname.substring(0, pathname.length - 1));
        } else {
          useStore().changeRoute(pathname);
        }
      } else if (params.has("route")) {
        const routeParam = params.get("route");
        // const newUrl = window.location.pathname;
        // window.history.replaceState({}, "", newUrl);  // <- hide route
        useStore().changeRoute(routeParam);
      }
    },
    rescaleOverlay() {
      if (this.showOverlay) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = getComputedStyle(document.body).getPropertyValue("height");
        document.body.style.cssText += `--overlay-width: ${
          viewportWidth <= viewportHeight ? "130svh" : "90vw"
        }`;
      }
    },
  },
  computed: {
    page() {
      return useStore().currentRoute;
    },
    showOverlay() {
      return useStore().routeDetails.overlay;
    },
  },
};
</script>
