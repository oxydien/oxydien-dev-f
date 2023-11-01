<template>
  <div :class="{ main: showOverlay }" ref="main">
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
import { useRouteStore } from "./stores/routes";
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
          useRouteStore().changeRoute(pathname.substring(0, pathname.length - 1));
        } else {
          useRouteStore().changeRoute(pathname);
        }
      } else if (params.has("route")) {
        const routeParam = params.get("route");
        // const newUrl = window.location.pathname;
        // window.history.replaceState({}, "", newUrl);  // <- hide route
        useRouteStore().changeRoute(routeParam);
      }
    },
    rescaleOverlay() {
      if (this.showOverlay) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        let overlayWidth;
        if (viewportWidth < viewportHeight) {
          overlayWidth = "90vw";
          // console.log(viewportWidth, viewportHeight, "WIDTH");
        } else {
          const aspectRatio = viewportWidth / viewportHeight;
          console.log(aspectRatio, 18 / 9);
          if (aspectRatio > 17.8 / 9) {
            overlayWidth = "90vh";
            // console.log(viewportWidth, viewportHeight, "height");
          } else {
            overlayWidth = "90vw";
            // console.log(viewportWidth, viewportHeight, "width");
          }
        }
        document.body.style.cssText += `--overlay-width: ${overlayWidth}`;
      }
    },
  },
  computed: {
    page() {
      return useRouteStore().currentRoute;
    },
    showOverlay() {
      return useRouteStore().routeDetails.overlay;
    },
  },
};
</script>
