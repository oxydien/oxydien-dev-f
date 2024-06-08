<style lang="scss" scoped>
#logo {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding-top: 20%;
  padding-top: 20vh;
  padding-top: 20svh;

  .logo {
    font-size: clamp(12rem, 20vw, 30rem);
  }
  h1 {
    position: absolute;
    font-size: clamp(2rem, 3vw, 4rem);
    color: #fff;
    bottom: -5%;
    --_offset: 2px;
    --_neg_offset: calc(-1 * var(--_offset));
    --_color: #000;
    text-shadow: var(--_neg_offset) var(--_neg_offset) 0 var(--_color),
      var(--_offset) var(--_neg_offset) 0 var(--_color),
      var(--_neg_offset) var(--_offset) 0 var(--_color),
      var(--_offset) var(--_offset) 0 var(--_color);
  }
}

#about {
  max-width: 55ch;

  margin: max(7rem, 5%) auto;
  text-align: center;
  font-size: 1.2rem;

  p {
    padding: 0 1rem;
  }
}

#contact,
#socials {
  width: fit-content;
  margin: max(7rem, 5%) auto;
}

#footer {
  margin-top: max(20rem, 15%);
  text-align: center;
  font-size: 0.6rem;
}
</style>

<template>
  <main ref="main">
    <section id="logo">
      <Logo class="logo" aria-hidden="true" />
      <h1>{{ apx.getTranslation("website.title") }}</h1>
    </section>
    <section id="about">
      <p>
        {{ apx.getTranslation("website.description") }}
      </p>
    </section>
    <section id="socials">
      <SocialComponent />
    </section>
    <section id="contact">
      <EmailComponent />
    </section>
    <section id="footer">
      <p>
        {{ apx.getTranslation("section.footer.open-source") }}
        <a href="https://github.com/oxydien/oxydien-dev-f" target="_blank"
          >open-source</a
        >
      </p>
      <p>
        {{ apx.getTranslation("section.footer.host") }}
        <a href="https://vercel.com/home" target="_blank">Vercel</a>
      </p>
      <p>
        &copy; {{ new Date().getFullYear() }}
        <a href="https://github.com/oxydien" target="_blank">oxydien</a>
      </p>
    </section>
  </main>
</template>

<script>
import Logo from "./components/icons/LogoIcon.vue";
import SocialComponent from "./components/SocialComponent.vue";
import EmailComponent from "./components/EmailComponent.vue";
import { useAppStore } from "./stores/appStore.js";

export default {
  components: { Logo, SocialComponent, EmailComponent },
  data() {
    return {
      apx: useAppStore(),
    };
  },
};
</script>
