<style lang="scss" scoped>
.center {
  display: grid;
  place-items: center;
  width: var(--overlay-width);
  height: 100%;

  .contact-wrapper {
    display: flex;
    flex-flow: nowrap column;

    & > span {
      font-size: 1.2rem;
      margin: 10px 0 2px 0;
    }

    .social {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 15px;

      .box {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        width: 100px;
        aspect-ratio: 1/1;
        border-radius: 10px;
        background-color: var(--color-button-bg);
        color: var(--color-txt-highlight);
        text-decoration: none;
        transition: background-color 120ms;

        cursor: pointer;
        svg {
          height: 60px;
          width: 60px;
        }
        &:hover {
          background-color: var(--color-bg-highlight);
        }
      }
    }
    .email {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      font-size: 1.2rem;
      border-radius: 10px;
      background-color: var(--color-button-bg);

      .buttons button {
        all: unset;
        padding: 4px;
        width: 24px;
        height: 24px;
        margin-left: 3px;
        border-radius: 4px;
        transition: background-color 120ms;
        color: var(--color-txt-m-muted);
        cursor: pointer;

        &:hover {
          background-color: var(--color-bg-highlight);
        }
        &:focus-visible {
          outline: 1px solid var(--color-highlighted);
        }
      }
    }
  }
}
</style>

<template>
  <div id="contact">
    <Header :slash="true"><template #page>{{getTranstatedL("header.links.contact")}}</template></Header>
    <div class="center">
      <div class="contact-wrapper">
        <span>{{ getTranstatedL("contact.platforms.text") }}</span>
        <div class="social">
          <a
            class="box"
            target="_blank"
            href="https://discord.com/users/715126873784582214"
            aria-label="Contact me on Discord"
            ><DiscordIcon />discord</a
          >
          <a
            class="box"
            target="_blank"
            href="https://github.com/oxydien"
            aria-label="Contact me on Github"
            ><GithubIcon />github</a
          >
          <a
            class="box"
            target="_blank"
            href="https://gitlab.com/oxydien"
            aria-label="Contact me on Gitlab"
            ><GitlabIcon />gitlab</a
          >
          <a
            class="box"
            target="_blank"
            href="https://x.com/oxydien"
            aria-label="Contact me on X (twitter)"
            ><XTwitterIcon />x</a
          >
        </div>
        <span>{{ getTranstatedL("contact.email.text") }}</span>
        <div class="email">
          <span class="email-adress">{{ email }}</span>
          <div class="buttons">
            <button @click="sendMail"><MailIcon /></button>
            <button @click="copyMail">
              <CopyIcon v-if="!email_copied" /><CheckIcon v-else />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import XTwitterIcon from "../components/icons/XTwitterIcon.vue";
import DiscordIcon from "../components/icons/DiscordIcon.vue";
import GithubIcon from "../components/icons/GithubIcon.vue";
import GitlabIcon from "../components/icons/GitlabIcon.vue";
import CopyIcon from "../components/icons/CopyIcon.vue";
import CheckIcon from "../components/icons/CheckIcon.vue";
import MailIcon from "../components/icons/MailIcon.vue";

import { getTranstated } from "../stores/lang";

export default {
  data() {
    return {
      email: "oxydien@protonmail.com",
      email_copied: false,
    };
  },
  components: {
    Header,
    XTwitterIcon,
    DiscordIcon,
    GithubIcon,
    GitlabIcon,
    CopyIcon,
    CheckIcon,
    MailIcon,
  },
  methods: {
    sendMail() {
      const mailtoLink = `mailto:${this.email}`;

      const anchor = document.createElement("a");
      anchor.href = mailtoLink;
      anchor.target = "_blank";

      anchor.click();
    },
    copyMail() {
      navigator.clipboard
        .writeText(this.email)
        .then(() => {
          this.email_copied = true;
          setTimeout(() => {
            this.email_copied = false;
          }, 1200);
        })
        .catch((error) => {
          console.error("Error copying to clipboard:", error);
        });
    },
    getTranstatedL(key) {
      return getTranstated(key);
    },
  },
};
</script>
