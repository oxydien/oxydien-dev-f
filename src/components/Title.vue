<style lang="scss" scoped>
h1 {
  margin: 0 auto;
  max-width: fit-content;
  height: fit-content;
  font-family: Consolas, monospace;
  position: relative;
  white-space: nowrap;
  font-size: 32px;
  text-align: center;
  .title {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    max-width: fit-content;

    em {
      font-style: normal;
      font-size: 8px;
      color: var(--color-txt-m-muted);
    }
  }

  .title-main {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    svg {
      margin-bottom: -20px;
    }
  }
}
</style>

<template>
  <h1>
    <div class="title-main">
      <LogoBold />
      <span class="title"
        ><span>{{ getTranstatedL("website.title") }}</span>
        <em>{{ getTranstatedL("website.description") }}</em>
      </span>
    </div>
  </h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getTranstated } from "../stores/lang";
import LogoBold from "./icons/LogoBold.vue";

export default defineComponent({
  name: "WebTitle",
  components: { LogoBold },
  props: {
    animatable: {
      default: true,
      type: Boolean,
    },
  },
  methods: {
    getTranstatedL(key) {
      return getTranstated(key);
    },
  },
});
</script>
