<style lang="scss" scoped>
#page {
  font-family: Consolas, "sans-serif";
  width: 100%;
  height: 100%;

  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-height: 50px;

    a {
      text-decoration: none;
    }
    div {
      font-size: 1.4rem;
      text-align: right;
      margin-right: 10px;
    }
    .slash {
      color: var(--color-txt-m-muted);
      font-size: 0.8rem;
    }
  }

  .info {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 0 8px 5px 0;
    .animate {
      animation: fadeInOut 3s forwards;
    }
    :not(.animate) {
      opacity: 0;
    }
  }

  .content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin: 2px;
    padding: 5px;
    font-size: 1.2rem;
    align-items: center;
    height: calc(100% - 50px);

    .pages {
      display: block;
      list-style: none;
      padding: 0;
      line-height: 1.6;
      .page {
        &.selected {
          background-color: var(--color-txt-highlight);
          color: var(--color-bg);
        }
      }
    }
    .page-attributes {
      display: flex;
      flex-flow: column nowrap;

      strong {
        display: inline-block;
        min-width: 180px;
      }
    }
  }
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>

<template>
  <div id="page">
    <div class="top-bar">
      <a href="/"
        ><Logo :size="40" style="margin: 5px 0 0 10px"
          ><span class="slash">/</span><span>switch</span></Logo
        >
      </a>
      <div>
        status:
        <span v-if="currentPage === 'switch'">200</span>
        <span v-else><strong>404/500-</strong>{{ currentPage }}</span>
      </div>
    </div>
    <div class="info">
      <img
        src="../assets/icons/keyboard.svg"
        alt="use keyboard"
        width="32"
        :class="{ animate: show.keyboardIcon }"
        aria-label="Use arrow keys to navigate"
      />
    </div>
    <div class="content" @click="showKeyboardIcon">
      <ul class="pages">
        <li
          v-for="(page, index) in visiblePages"
          :key="index"
          class="page"
          :class="{ selected: page.loc === selectedPage.loc }"
        >
          {{ page.name }}
        </li>
      </ul>
      <div class="page-attributes">
        <p>Page ({{ selected }})</p>
        <span
          ><strong>translated name: </strong>
          {{ getTranstatedL(`header.links.${selectedPage.name}`) }}</span
        >
        <span><strong>name: </strong> {{ selectedPage.name }}</span>
        <span><strong>location: </strong> {{ selectedPage.loc }}</span>
        <span><strong>priority: </strong> {{ selectedPage.priority }}</span>
        <span><strong>overlay: </strong> {{ selectedPage.overlay }}</span>
        <span
          ><strong>icon?: </strong>
          {{ selectedPage.icon ? selectedPage.icon : "false" }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "./Logo.vue";
import { routeList, useStore } from "../stores/routes";

import { getTranstated } from "../stores/lang";

export default {
  components: {
    Logo,
  },
  data() {
    return {
      selectedPage: { loc: null },
      selected: 0,
      show: {
        keyboardIcon: false,
      },
    };
  },
  computed: {
    visiblePages() {
      const startIndex = Math.max(this.selected - 5, 0);
      const endIndex = Math.min(startIndex + 10, this.pages.length);

      return this.pages.slice(startIndex, endIndex);
    },
    pages() {
      return routeList.sort((a, b) => b.priority - a.priority);
    },
    currentPage() {
      return useStore().currentRoute;
    },
  },
  mounted() {
    window.addEventListener("keydown", this.handleArrowKeys);
    this.selectedPage = this.pages[0];
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleArrowKeys);
  },
  emits: ["pageChange"],
  methods: {
    handleArrowKeys(event) {
      console.log(new Date().getTime(), event.key);
      switch (event.key) {
        case "ArrowUp":
        case "w":
          this.selectPage(this.selected - 1);
          break;
        case "ArrowDown":
        case "s":
          this.selectPage(this.selected + 1);
          break;
        case "Enter":
        case "e":
          this.$emit("pageChange", this.selectedPage.loc);
          break;
        case "Escape":
        case "0":
          this.$emit("pageChange", "index");
          break;
      }
    },
    showKeyboardIcon() {
      this.show.keyboardIcon = true;
      setTimeout(() => {
        this.show.keyboardIcon = false;
      }, 3200);
    },
    selectPage(index) {
      if (index >= 0 && index < this.pages.length) {
        this.selected = index;
        this.selectedPage = this.pages[index];
      }
    },
    getTranstatedL(key) {
      return getTranstated(key);
    },
  },
};
</script>
