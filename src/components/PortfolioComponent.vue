<style lang="scss" scoped>
.portfolio-wrapper {
  min-width: min(480px, 100vw);
  width: fit-content;
  padding: 1rem;
  background-color: var(--color-foreground);
  border-radius: 0.5rem;

  &:hover {
    .portfolio-holder {
      .button-left,
      .button-right {
        opacity: 0.7;
      }
    }
  }

  .portfolio-holder {
    position: relative;
    margin-top: 0.6rem;

    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 1rem;
      height: 100%;
      top: 0;
      z-index: 5;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }

    &.scrolled::before {
      left: 0;
      opacity: 1;
      background: linear-gradient(to left, transparent, var(--color-foreground));
    }

    &::after {
      right: 0;
      opacity: 1;
      background: linear-gradient(to right, transparent, var(--color-foreground));
    }

    .portfolio-list {
      display: grid;
      grid-auto-flow: column;
      gap: 1rem;
      max-width: calc(480px - 2rem);
      overflow-x: scroll;
      padding-right: 2rem;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .button-left,
    .button-right {
      position: absolute;
      top: 50%;
      display: grid;
      place-items: center;
      transform: translateY(-50%);
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      border: none;
      background-color: var(--color-button);
      transition: all 120ms;
      opacity: 0;
      color: var(--color-txt-highlight);
      cursor: pointer;
      z-index: 12;
    }

    .button-left {
      left: 0;
    }

    .button-right {
      right: 0;
    }
  }
}
</style>

<template>
  <div class="portfolio-wrapper">
    <h2>{{ apx.getTranslation("section.portfolio.title") }}</h2>
    <div class="portfolio-holder" :class="{ scrolled: scrollOffset > 0 }">
      <button class="button-left" v-if="scrollOffset > 0" @click="scrollLeft"><ArrowIcon style="rotate: 180deg;" /></button>
      <button class="button-right" @click="scrollRight"><ArrowIcon /></button>
      <div class="portfolio-list" id="portfolio-list">
        <PortfolioItem v-for="project in projects" :key="project.title" :image="project.image" :title="project.title"
          :link="project.link" />
      </div>
    </div>
  </div>
</template>

<script>
import PortfolioItem from "./PortfolioItem.vue";
import ArrowIcon from "./icons/ArrowIcon.vue";
import { useAppStore } from "../stores/appStore.js";

export default {
	name: "PortfolioComponent",
	components: {
		PortfolioItem,
		ArrowIcon,
	},
	data() {
		return {
			apx: useAppStore(),
			portfolioList: null,
			scrollOffset: 0,
			projects: [
				{
					title: "RIST server",
					image: "./assets/img/project_rist_H5W2.png",
					link: "https://github.com/oxydien/rist",
				},
				{
					title: "Unheard Studio",
					image: "./assets/img/project_unheard_U4I3.png",
					link: "https://unheard-studio.com/?ref=oxydien_dev_portfolio",
				},
				{
					title: "Diggie (discord bot utilities)",
					image: "./assets/img/project_diggie_N4E3.png",
					link: "https://github.com/oxydien/diggie",
				},
				{
					title: "Solaris-12",
					image: "./assets/img/project_solaris_K5R.png",
					link: "https://solaris.unheard-studio.com/",
				},
				{
					title: "Check my other projects on GitHub",
					image: "./assets/banner.png",
					link: "https://github.com/oxydien?tab=repositories",
				},
			],
		};
	},
	mounted() {
		this.portfolioList = document.getElementById("portfolio-list");

		this.portfolioList.addEventListener("scroll", this.onScroll);
	},
	beforeUnmount() {
		this.portfolioList.removeEventListener("scroll", this.onScroll);
	},
	methods: {
		onScroll() {
			this.scrollOffset = this.portfolioList.scrollLeft;
		},
		scrollLeft() {
			this.portfolioList.scroll({
				left: this.portfolioList.scrollLeft - 200,
				behavior: "smooth",
			});
		},
		scrollRight() {
			this.portfolioList.scroll({
				left: this.portfolioList.scrollLeft + 200,
				behavior: "smooth",
			});
		},
	},
};
</script>