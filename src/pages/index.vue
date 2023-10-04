<style lang="scss" scoped>
.index {
  height: calc(100% - 4px);
  width: calc(100% - 4px);

  overflow-y: auto;
  overflow-x: hidden;

  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 0;
  }
}
.content {
  position: relative;
  top: 50%;
  left: 50%;

  transform: translateX(-50%) translateY(-50%);
}
.about {
  display: grid;
  place-items: center;
  margin-top: 70vh;
  width: 100%;
  height: calc(100% - 1rem);

  p {
    margin: 0 auto;
    max-width: max(30vw, 200px);
    text-align: center;

    &.animate {
      animation: aboutFadeIn 2s ease-out forwards;
    }

    h3 {
      margin: 2px;
      color: var(--color-txt-muted);
      &::before {
        content: "# ";
        color: var(--color-txt-m-muted);
      }
    }
  }
}
.copyright {
  text-align: right;
  margin: 0 5px 5px 0;

  a {
    color: #00ff1a;
    text-decoration: none;
  }
}
@keyframes aboutFadeIn {
  0% {
    transform: scale(0.8) translateY(50px);
    opacity: 0;
  }
  100% {
    transform: scale(1) translateY(0px);
    opacity: 1;
  }
}
</style>

<template>
  <div class="index" ref="index">
    <Header> </Header>
    <div class="content">
      <div>
        <Title
          :animatable="false"
          :style="`transform: scale(${titleWidth});`"
        ></Title>
      </div>
    </div>
    <div ref="about" class="about">
      <p>
        <h3>
          {{ getTranstatedL("about.heading") }}
        </h3>
          {{ getTranstatedL("about.text") }}
      </p>
    </div>
    <div class="copyright" role="doc-credits">
      Made by <a target="_blank" href="https://github.com/oxydien">oxydien</a>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Title from "../components/Title.vue";
import { useStore } from "../stores/routes";
import { getTranstated } from "../stores/lang";

export default {
  components: {
    Header,
    Title,
  },
  mounted() {
    this.$refs["index"].addEventListener("scroll", this.handleScroll);
    if (useStore().currentRoute === "index#about") {
      this.$refs["index"].scrollTo({
        top: this.$refs["about"].offsetTop,
        behavior: "smooth",
      });
    }
  },
  beforeUnmount() {
    this.$refs["index"].removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll(e) {
      this.$refs["index"].removeEventListener("scroll", self);
      console.log("y");
      this.$refs["about"].firstChild.classList.add("animate");
    },
    getTranstatedL(key) {
      return getTranstated(key)
    }
  },
  computed: {
    titleWidth() {
      let scale =
        window.innerWidth / 620 >= 0.9 ? window.innerWidth / 620 : 0.9;
      return scale;
    },
  },
};
</script>
