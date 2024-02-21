<style lang="scss" scoped>
#videos {
  .center {
    display: grid;
    width: var(--overlay-width);
    height: 100%;
    place-items: center;

    .unfinished-page {
      width: min(50vw, 420px);
      text-align: center;

      img {
        width: 10vw;
      }
      h1 {
        margin-top: 0;
      }
      button {
        display: inline-flex;
        gap: 5px;
        background-color: var(--color-button-bg);
        border-radius: 15px;
        border: none;
        color: var(--color-txt);
        padding: 0.8rem;
        font-size: 1.2rem;
        cursor: pointer;

        img {
          width: 0.8em;
          transform: rotate(90deg);
        }
      }
    }
  }
}
</style>

<template>
  <div id="videos">
    <Header :slash="true"
      ><template #page>{{
        getTranstatedL("header.links.videos")
      }}</template></Header
    >
    <div class="center">
      <div class="unfinished-page">
        <img src="/assets/svg/unplugged.svg" alt="" aria-hidden="true" />
        <h1>Work in Progress</h1>
        <p>
          This page is currently under construction. You can check out the code
          on GitHub:
          <a href="https://github.com/oxydien/oxydien-dev-f" target="_blank"
            >GitHub Repository</a
          >
        </p>
        <button @click="changeRouteL('index')">
          <img src="../assets/icons/arrow.svg" aria-hidden="true" /> Back
        </button>
        <button @click="viewRaw = !viewRaw">Check raw</button>
        <div class="videos" v-show="viewRaw">
          <div class="video" v-for="video in videos.data">
            <img
              :src="`https://i.ytimg.com/vi/${video.videoId}/hq720.jpg`"
              alt=""
            />
            <h3>{{ video.name }}</h3>
            <p>{{ video.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

import { getTranstated } from "../stores/lang";
import { useRouteStore } from "../stores/routes";
import { useAppStore } from "../stores/appStore";

export default {
  data() {
    return {
      viewRaw: false,
      videos: {
        loaded: 2,
        data: [],
      },
    };
  },
  components: {
    Header,
  },
  mounted() {
    this.loadVideosFromBackend();
  },
  methods: {
    getTranstatedL(key) {
      return getTranstated(key);
    },
    changeRouteL(route) {
      return useRouteStore().changeRoute(route);
    },
    loadVideosFromBackend() {
      const appStore = useAppStore();
      const bg_url = `${appStore.backend_url}api/v1/content/youtube/videos/`;
      fetch(bg_url)
        .then(async (response) => {
          if (response.status === 200) {
            const json = await response.json();
            this.videos.data = json.data.items;
          } else {
            console.warn(
              "_BACKEND",
              `Server responded with weird status: ${response.status}`
            );
          }
        })
        .catch((error) => console.error("Error:", error));
    },
  },
};
</script>
