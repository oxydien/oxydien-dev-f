<style lang="scss" scoped>
.portfolio-item {
  position: relative;

  width: 180px;
  height: 100px;

  border-radius: 0.5rem;
  overflow: hidden;
  isolation: isolate;

  &:hover {
    cursor: pointer;

    img {
      filter: saturate(1);
    }
  }
  
  img {
    width: 100%;
    height: 100%;
    transition: filter 0.2s ease-in-out;
    filter: saturate(0);
    object-fit: cover;
    z-index: -1;
  }

  .overlay {
    position: absolute;
    gap: 0.3rem;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%);
    color: #fff;
    text-decoration: none;
    opacity: 0;
    transition: all 0.2s ease-in-out;
    z-index: 5;

    &:hover {
      opacity: 1;
    }

    &>span {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      gap: 0.2rem;

      position: absolute;
      left: 0.5rem;
      bottom: 0.5rem;
      font-size: 0.7rem;

      .slash {
        font-size: 0.6rem;
        opacity: 0.8; 
        font-weight: 800;
      }

      svg {
        width: 1em;
        height: 1em;
      }
    }

    .external-icon {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
    }
  }
}
</style>

<template>
  <div class="portfolio-item">
    <img loading="lazy" :src="image" :alt="title"  />
    <a class="overlay" :href="link" target="_blank" rel="noopener noreferrer">
      <ExternalIcon class="external-icon" />
      <span>
        <GithubIcon v-if="isGithub" />
        <span v-if="isGithub" class="slash">/</span>
        {{ getLinkTitle }}
      </span>
    </a>
  </div>
</template>

<script>
import ExternalIcon from "./icons/ExternalIcon.vue";
import GithubIcon from "./icons/GithubIcon.vue";

export default {
	name: "PortfolioItem",
	components: {
		ExternalIcon,
		GithubIcon,
	},
	props: ["image", "title", "link"],
	computed: {
		isGithub() {
			const url = new URL(this.link);
			return url.hostname === "github.com";
		},
		getLinkTitle() {
			const url = new URL(this.link);
			if (this.isGithub) {
				return url.pathname.split("/").pop();
			}
			return `${url.hostname}`;
		},
	},
};
</script>
