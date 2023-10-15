<style lang="scss" scoped>
.nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  display: flex;
  justify-content: space-between;

  .logo {
    height: 50px;
    text-decoration: none;
    margin-left: 5px;
  }

  .menu-closed {
    width: 50px;
    height: 50px;

    background-color: transparent;
    border: none;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
.open-nav {
  position: absolute;
  inset: 2px;
  width: calc(100% - 4px);
  border-radius: 12px;
  background-color: var(--color-bg-highlight);
  box-sizing: border-box;
  // transition: height 0ms;
  transition: height 60ms;
  overflow-y: auto;
  z-index: 65;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-txt-muted);
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-txt-m-muted);
  }

  &.open {
    height: calc(100% - 4px) !important;
    transition: height 120ms;
  }

  .inner-nav {
    margin: 3px;
    height: calc(100% - 50px);
  }

  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      margin-left: 5px;
    }

    .menu-icon {
      width: 40px;
      height: 40px;

      background-color: transparent;
      border: none;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .menu-content {
    display: grid;
    grid-template-rows: 1fr 60px;
    height: 90%;
    padding: 5px;

    .section {
      & > span {
        font-weight: 600;
        margin-top: 5px;
      }
      .link-grid {
        margin-top: 5px;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 16px;
      }

      &:not(.settings) {
        min-height: 350px;
        overflow: auto;
        &::-webkit-scrollbar {
          width: 4px;
        }

        &::-webkit-scrollbar-track {
          background: transparent;
        }

        &::-webkit-scrollbar-thumb {
          background: var(--color-txt-muted);
          border-radius: 5px;
        }

        &::-webkit-scrollbar-thumb:hover {
          background: var(--color-txt-m-muted);
        }
      }

      &.settings {
        height: 100px;
        .switches {
          display: flex;
          justify-content: space-between;
          font-weight: 600;
          font-size: 1.2rem;

          .lang {
            display: flex;
            gap: 5px;
            .lang-buttons {
              button {
                background-color: var(--color-button-bg);
                color: var(--color-txt-highlight);
                border: none;
                padding: 7px 9px;
                border-radius: 5px;
                margin-right: 8px;
                cursor: pointer;
              }
            }
          }
        }
        .app-info {
          strong {
            display: inline-block;
            min-width: 100px;
          }
          a {
            color: var(--color-highlighted);
            text-decoration: none;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="nav" v-bind:aria-hidden="this.actuallyOpen" role="navigation">
    <a href="/" aria-label="go to index page" class="logo"
      ><Logo :size="40"
        ><span v-if="slash || app_info.dev" class="slash">/ </span
        ><slot name="page"> </slot> <span v-if="app_info.dev">dev</span></Logo
      ></a
    >
    <button
      aria-label="toggle navigation"
      class="menu-closed menu-icon"
      @click="this.actuallyOpen = !this.actuallyOpen"
    >
      <img src="../assets/icons/menu_icon.svg" alt="menu" />
    </button>
  </div>
  <div
    class="open-nav"
    v-bind:aria-hidden="!this.actuallyOpen"
    :class="{ open: actuallyOpen }"
    style="height: 0"
    role="navigation"
  >
    <div class="inner-nav">
      <div class="top-bar">
        <Logo :size="40" class="logo"><span>oxydien</span></Logo>
        <button
          aria-label="toggle navigation"
          class="menu-opened menu-icon"
          @click="this.actuallyOpen = !this.actuallyOpen"
        >
          <img src="../assets/icons/menu_icon_close.svg" alt="menu" />
        </button>
      </div>
      <div class="menu-content">
        <div class="section">
          <span>List of routes:</span>
          <div class="link-grid">
            <RouteButton
              v-for="route in routes"
              :highlighted="isCurrentRoute(route.loc)"
              @click="changeRouteTo(route.loc)"
              :key="currentRoute"
            >
              <template #icon><component :is="route.icon" /></template>
              <template #content>
                {{ getTranstatedL(`header.links.${route.name}`) }}</template
              >
            </RouteButton>
          </div>
        </div>
        <div class="section settings">
          <div class="hr"></div>
          <div class="switches">
            <div class="lang">
              <span>{{ getTranstatedL("header.settings.lang") }}: </span>
              <div class="lang-buttons">
                <button
                  v-for="(lang, index) in Object.keys(translationsL)"
                  @click="setLanguageL(lang)"
                >
                  {{ lang }}
                </button>
              </div>
            </div>
            <div class="theme" style="display: none">
              <!-- Themes are done, just not the buttons -->
              <span>{{ getTranstatedL("header.settings.theme") }}: </span>
            </div>
          </div>
          <div class="app-info">
            <span
              ><strong>version:</strong>
              <a
                href="https://github.com/oxydien/oxydien-dev-f"
                target="_blank"
              >
                {{ app_info.version + app_info.version_addons }}
              </a> </span
            ><br />
            <span
              ><strong>hosted on:</strong>
              <a href="https://vercel.com" target="_blank">vercel</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RouteButton from "./nav/RouteButton.vue";
import Logo from "./Logo.vue";
import HomeIcon from "./icons/HomeIcon.vue";
import UserIcon from "./icons/UserIcon.vue";
import ChatIcon from "./icons/ChatIcon.vue";
import MoreIcon from "./icons/MoreIcon.vue";
import VideoIcon from "./icons/VideoIcon.vue";
import WindowIcon from "./icons/WindowIcon.vue";
import { useStore, routeList } from "../stores/routes";

import { getTranstated, translations, setLanguage } from "../stores/lang";

import app from "../../package.json";

export default {
  components: {
    Logo,
    RouteButton,
    HomeIcon,
    UserIcon,
    ChatIcon,
    WindowIcon,
    VideoIcon,
    MoreIcon,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    slash: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      actuallyOpen: false,
      app_info: app,
      translationsL: translations,
    };
  },
  mounted() {
    this.actuallyOpen = this.open;
  },
  methods: {
    isCurrentRoute(route) {
      return useStore().currentRoute === route;
    },
    changeRouteTo(route) {
      useStore().changeRoute(route);
    },
    setLanguageL(lang) {
      setLanguage(lang);
      window.location.href =
        window.location.href + `?route=${useStore().currentRoute}`;
    },
    getTranstatedL(key) {
      return getTranstated(key);
    },
  },
  computed: {
    currentRoute() {
      return useStore().currentRoute;
    },
    routes() {
      return routeList.sort((a, b) => b.priority - a.priority).slice(0, 6);
    },
  },
};
</script>
