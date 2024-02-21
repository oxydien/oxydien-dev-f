<style lang="scss" scoped>
#projects {
  overflow: auto;
  overflow-x: clip;
  width: calc(100% - 16px);
  margin-inline: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, and Opera */
  }
  .grid-wrapper {
    display: grid;
    margin: 60px auto;
    width: min(calc(100% - 16px), 1200px);
    grid-template-columns: repeat(auto-fill, minmax(max(300px, 20vw), 1fr));
    grid-auto-rows: 250px;
    gap: 1rem;

    .project-wrapper {
      display: flex;
      flex-flow: nowrap column;
      gap: 20px;

      background: var(--color-bg-highlight);
      background: linear-gradient(
        149deg,
        var(--color-bg-highlight) 0%,
        var(--color-bg-highlight) 60%,
        var(--color-button-bg) 75%,
        var(--color-bg-highlight) 90%,
        var(--color-bg-highlight) 100%
      );
      outline: 0px solid var(--color-highlighted);

      border-radius: 15px;
      box-sizing: border-box;
      padding: 10px;

      transition: outline 60ms;

      text-decoration: none;
      color: var(--color-txt);

      isolation: isolate;
      z-index: 0;

      &:first-child {
        grid-column: 1 / span 2;
        grid-row: 1 / span 2;
      }
      &:hover,
      &:hover .top-project-wrapper > * {
        outline: 3px solid var(--color-highlighted);
      }

      .top-project-wrapper {
        position: relative;
        max-height: calc(100% - 100px);

        .external-link {
          display: block;
          position: absolute;
          top: 0;
          right: 0;
          transition: outline 60ms;
          padding: 10px;
          border-radius: 0 12px 0 12px;
          background-color: black;
          svg {
            color: var(--color-txt-highlight);
            width: 24px;
            height: 24px;
          }
        }

        img {
          width: 100%;
          height: 100%;
          transition: outline 60ms;
          object-fit: cover;
          border-radius: 12px;
        }
      }
      .project-text {
        h2 {
          color: var(--color-txt-highlight);
          margin: 0 0 3px 0;
        }
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .grid-wrapper {
    grid-auto-rows: 300px !important;
    .project-wrapper:first-child {
      grid-column: 1 !important;
      grid-row: 1 !important;
    }
  }
}
@media screen and (max-width: 430px) {
  .grid-wrapper {
    width: calc(100vw - 16px) !important;
    grid-auto-rows: 350px !important;
    grid-template-columns: repeat(
      auto-fill,
      minmax(max(200px, 20vw), 1fr)
    ) !important;
  }
}
</style>

<template>
  <div id="projects">
    <Header :slash="true"
      ><template #page>{{
        getTranstatedL("header.links.projects")
      }}</template></Header
    >
    <div class="grid-wrapper">
      <a
        v-for="(project, index) in projects.data"
        :href="project.link"
        target="_blank"
        class="project-wrapper"
      >
        <div class="top-project-wrapper">
          <img :src="project.image" :alt="project.summary" />
          <div v-if="project.link.startsWith('http')" class="external-link">
            <ExternalIcon />
          </div>
        </div>
        <div class="project-text">
          <h2>{{ project.name }}</h2>
          <span>{{ project.summary }}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import ExternalIcon from "../components/icons/ExternalIcon.vue";

import { getTranstated } from "../stores/lang";
import { useRouteStore } from "../stores/routes";

export default {
  data() {
    return {
      projects: {
        loaded: 2,
        data: [
          {
            name: "Solaris-12 SCP:SL server",
            summary:
              "A Czech SCP:SL modded server featuring custom plugins, coins, and more.",
            link: "https://solaris.oxydien.dev/",
            image: "https://imgur.com/hVn15kN.png",
          },
          {
            name: "Requester",
            summary:
              "A Tauri app made for simple HTTP requesting, measuring, and testing APIs.",
            link: "https://github.com/oxydien/requester/",
            image: "https://imgur.com/dCzTgaO.png",
          },
          {
            name: "Minecraft Server Manager",
            summary:
              "A concept Tauri app for easy creation of Minecraft servers.",
            link: "https://github.com/oxydien/mc-server-manager/",
            image: "https://imgur.com/kukrOL3.png",
          },
          {
            name: "Swift (Cooking)",
            summary: "Third season of the Swift Minecraft server.",
            link: "about:blank",
            image: "https://imgur.com/d7Yflwa.png",
          },
          {
            name: "more...",
            summary: "Look at my GitHub profile to see my other projects!",
            link: "https://github.com/oxydien",
            image: "https://imgur.com/Yehy1hc.png",
          },
        ],
      },
    };
  },

  components: {
    Header,
    ExternalIcon,
  },

  methods: {
    getTranstatedL(key) {
      return getTranstated(key);
    },
    changeRouteL(route) {
      return useRouteStore().changeRoute(route);
    },
  },
};
</script>
