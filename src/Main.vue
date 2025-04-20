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

  h1 {
    position: absolute;
    font-size: clamp(2rem, 3vw, 4rem);
    color: #fff;
    animation: colorTransition 2s ease-in forwards;
    bottom: -5%;
    --_offset: 2px;
    --_neg_offset: calc(-1 * var(--_offset));
    --_color: #000;
    text-shadow:
      var(--_neg_offset) var(--_neg_offset) 0 var(--_color),
      var(--_offset) var(--_neg_offset) 0 var(--_color),
      var(--_neg_offset) var(--_offset) 0 var(--_color),
      var(--_offset) var(--_offset) 0 var(--_color);
  }

  @keyframes colorTransition {
    from {
      color: #fff;
    }
    to {
      color: #dbb4bf;
    }
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
#socials,
#portfolio {
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
      <LandingTransition />
      <h1>{{ apx.getTranslation("website.title") }}</h1>
    </section>
    <section id="about">
      <p>
        {{ apx.getTranslation("website.description") }}
      </p>
    </section>
    <section id="new_project">
      <ProjectLargeView
        image_src="/assets/img/project_reb0rex_3FCI.png"
        url="https://reb0rex.oxydien.dev"
      />
    </section>
    <section id="socials">
      <SocialComponent />
    </section>
    <section id="portfolio">
      <PortfolioComponent />
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
import LandingTransition from "./components/LandingTransition.vue";
import ProjectLargeView from "./components/ProjectLargeView.vue";
import SocialComponent from "./components/SocialComponent.vue";
import PortfolioComponent from "./components/PortfolioComponent.vue";
import EmailComponent from "./components/EmailComponent.vue";
import { useAppStore } from "./stores/appStore.js";

export default {
  components: {
    LandingTransition,
    ProjectLargeView,
    SocialComponent,
    PortfolioComponent,
    EmailComponent,
  },

  data() {
    return {
      apx: useAppStore(),
    };
  },
};
</script>
