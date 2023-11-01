<template>
  <contact v-if="currentRoute === 'contact'" />
  <index v-else-if="currentRoute === 'index#about'" />
  <videos v-else-if="currentRoute === 'videos'" />
  <projects v-else-if="currentRoute === 'projects'" />
  <PageSwitch v-else @page-change="handlePageChange" />
</template>
<script>
import PageSwitch from "../components/PageSwitch.vue";
import contact from "../pages/contact.vue";
import index from "../pages/index.vue";
import videos from "./videos.vue";
import projects from "./projects.vue";
import { useRouteStore } from "../stores/routes";

export default {
  components: {
    PageSwitch,
    contact,
    index,
    videos,
    projects,
  },
  data() {
    return {};
  },
  methods: {
    handlePageChange(event) {
      useRouteStore().changeRoute(event);
    },
  },
  computed: {
    currentRoute() {
      return useRouteStore().currentRoute;
    },
  },
};
</script>
