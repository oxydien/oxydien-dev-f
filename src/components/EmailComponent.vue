<style lang="scss" scoped>
.email-wrapper {
  min-width: min(480px, 100vw);
  width: fit-content;
  padding: 1rem;
  background-color: var(--color-foreground);
  border-radius: 0.5rem;

  .email-holder {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    background-color: var(--color-button);
    border-radius: 0.5rem;
    padding: 0.7rem;
    margin-top: 0.6rem;

    .email-address {
      color: var(--color-txt-highlight);
    }

    .buttons {
      display: flex;
      flex-flow: row nowrap;
      gap: 0.5rem;
      margin-left: auto;

      button,
      a {
        all: unset;
        padding: 4px;
        width: 24px;
        height: 24px;
        margin-left: 3px;
        border-radius: 4px;
        transition: background-color 120ms;
        color: var(--color-txt);
        cursor: pointer;

        &:focus-visible,
        &:hover {
          color: var(--color-txt-highlight);

          &:focus-visible {
            outline: 1px solid var(--color-highlighted);
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="email-wrapper">
    <h2>{{ apx.getTranslation("section.contact.title") }}</h2>
    <div class="email-holder">
      <span class="email-address">{{ email }}</span>
      <div class="buttons">
        <a :href="`mailto:${email}`" target="_blank" aria-label="Open Email"
          ><MailIcon
        /></a>
        <button @click="copyMail" aria-label="Copy Email">
          <CopyIcon />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useAppStore } from "../stores/appStore.js";

import MailIcon from "./icons/MailIcon.vue";
import CopyIcon from "./icons/CopyIcon.vue";

export default {
  data() {
    return {
      apx: useAppStore(),
      email: "business@oxydien.dev",
    };
  },
  components: {
    CopyIcon,
    MailIcon,
  },
  methods: {
    copyMail() {
      navigator.clipboard.writeText(this.email);
    },
  },
};
</script>
