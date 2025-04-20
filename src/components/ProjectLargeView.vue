<style lang="scss" scoped>
.project-large-view {
  width: min(100vw, 500px);
  max-height: 300px;
  padding-inline: 0.5rem;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  display: block;
  margin-inline: auto;
  margin-block: 1rem;

  &:hover {
    .overlay {
      opacity: 1;
    }
  }

  .project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
    transition: transform 0.2s ease-in-out;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background-color: #00000065;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;

    & > span {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      gap: 0.2rem;

      position: absolute;
      left: 0.5rem;
      bottom: 0.5rem;
      font-size: 1.3rem;
      font-weight: 600;
      color: var(--color-txt-highlight);
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
  <a
    :href="url"
    :target="link_target"
    class="project-large-view"
    :rel="link_rel"
  >
    <img :src="image_src" alt="project" class="project-image" loading="lazy" />
    <div class="overlay">
      <ExternalIcon class="external-icon" v-if="external" />
      <span>
        <GithubIcon v-if="isGithub" />
        <span v-if="isGithub" class="slash">/</span>
        {{ getLinkTitle }}
      </span>
    </div>
  </a>
</template>

<script>
import ExternalIcon from "./icons/ExternalIcon.vue";
import GithubIcon from "./icons/GithubIcon.vue";

export default {
  name: "ProjectLargeView",
  components: {
    ExternalIcon,
    GithubIcon,
  },
  props: {
    image_src: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    external: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    isGithub() {
      const url = new URL(this.url);
      return url.hostname === "github.com";
    },
    getLinkTitle() {
      const url = new URL(this.url);
      if (this.isGithub) {
        return url.pathname.split("/").pop();
      }
      return `${url.hostname}`;
    },
    link_target() {
      return this.external ? "_blank" : "_self";
    },
    link_rel() {
      return this.external ? "noopener noreferrer" : "";
    },
  },
};
</script>
