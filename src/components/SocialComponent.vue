<style lang="scss" scoped>
.social-wrapper {
  min-width: min(480px, 100vw);
  width: fit-content;
  padding: 1rem;
  background-color: var(--color-foreground);
  border-radius: 0.5rem;

  .social-holder {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    gap: 1rem;
    margin-top: 0.6rem;

    .social {
      width: 100px;
      height: 100px;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: space-between;
      transition: all 120ms;
      gap: 0.5rem;
      background-color: var(--color-button);
      color: var(--color-txt-highlight);
      border-radius: 0.5rem;
      padding: 0.7rem;

      &:focus-visible,
      &:hover {
        background-color: var(--color-button-hover);
        svg {
          filter: grayscale(0) brightness(100%) contrast(100%);
        }
      }

      svg {
        width: 100%;
        height: 100%;
        transition: all 120ms;
        filter: grayscale(100%) brightness(150%) contrast(150%);
      }
    }
  }
}
</style>

<template>
  <div class="social-wrapper">
    <h2>{{ apx.getTranslation("section.social.title") }}</h2>
    <div class="social-holder">
      <a
        v-for="social in socials"
        :key="social.name"
        :href="social.url"
        target="_blank"
        class="social"
      >
        <component :is="social.component" />
        {{ social.name }}
      </a>
    </div>
  </div>
</template>

<script>
import { markRaw } from "vue";
import { useAppStore } from "../stores/appStore.js";

import GithubIcon from "./icons/GithubIcon.vue";
import BSkyIcon from "./icons/BSkyIcon.vue";
import DiscordIcon from "./icons/DiscordIcon.vue";
import GitlabIcon from "./icons/GitlabIcon.vue";

export default {
  name: "SocialComponent",
  data() {
    return {
      apx: useAppStore(),
      socials: [
        {
          name: "GitHub",
          url: "https://github.com/oxydien",
          component: markRaw(GithubIcon),
        },
        {
          name: "Discord",
          url: "https://discord.com/users/715126873784582214",
          component: markRaw(DiscordIcon),
        },
        {
          name: "BlueSky",
          url: "https://bsky.app/profile/oxydien.dev",
          component: markRaw(BSkyIcon),
        },
        {
          name: "GitLab",
          url: "https://gitlab.com/oxydien",
          component: markRaw(GitlabIcon),
        },
      ],
    };
  },
};
</script>
