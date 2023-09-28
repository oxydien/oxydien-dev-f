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
  .right-arrow {
    transform: translateX(-0.4ch) scale(1.6);
  }
  .left-arrow {
    transform: translateX(0.4ch) scale(1.6);
  }
  &.anim {
    animation: title_spin 3s ease-in-out infinite;
    .title {
      margin-bottom: -8px;
      animation: titleAnim 3s ease-in-out forwards infinite;
    }
    .right-arrow {
      animation: rightArrowAnim 3s forwards infinite;
    }
    .left-arrow {
      animation: leftArrowAnim 3s ease-in-out forwards infinite;
    }
  }
}
@keyframes title_spin {
  0% {
    transform: rotate(-120deg) scale(0);
  }
  17% {
    transform: rotate(12deg) scale(1.1);
  }
  28% {
    transform: rotate(0deg) scale(1);
  }
  70% {
    transform: rotate(0deg) scale(1);
  }
  100% {
    transform: rotate(360deg) scale(0);
  }
}
@keyframes titleAnim {
  0%,
  10% {
    width: 0;
  }
  35% {
    width: 100%;
  }
  45% {
    width: 100%;
  }
  65%,
  100% {
    width: 0;
  }
}

@keyframes leftArrowAnim {
  0%,
  5% {
    transform: translateX(-1ch) scale(1);
  }
  35% {
    transform: translateX(0.4ch) scale(1.6);
  }
  50% {
    transform: translateX(0.4ch) scale(1.6);
  }
  80%,
  100% {
    transform: translateX(-1ch) scale(1);
  }
}
@keyframes rightArrowAnim {
  0%,
  5% {
    transform: translateX(1ch) scale(1);
  }
  35% {
    transform: translateX(-0.4ch) scale(1.6);
  }
  50% {
    transform: translateX(-0.4ch) scale(1.6);
  }
  80%,
  100% {
    transform: translateX(1ch) scale(1);
  }
}
</style>

<template>
  <h1 :class="{ anim: animatable }">
    <div>
      <svg
        class="right-arrow"
        width="12"
        height="20"
        viewBox="0 0 12 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M10 2L2 10L10 18"
          stroke="url(#paint0_linear_12_3)"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_12_3"
            x1="29"
            y1="10"
            x2="1"
            y2="10"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#00FF1A" />
            <stop offset="1" stop-color="#FFB800" />
          </linearGradient>
        </defs>
      </svg>
      <span class="title"
        ><span>{{ getTranstatedL("website.title") }}</span>
        <em>{{ getTranstatedL("website.description") }}</em>
      </span>
      <svg
        class="left-arrow"
        width="12"
        height="20"
        viewBox="0 0 12 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M2 2L10 10L2 18"
          stroke="url(#paint0_linear_12_4)"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_12_4"
            x1="11"
            y1="10"
            x2="-17"
            y2="10"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#00FF1A" />
            <stop offset="1" stop-color="#FFB800" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getTranstated } from "../stores/lang";

export default defineComponent({
  name: "WebTitle",
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
