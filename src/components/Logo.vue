<style lang="scss">
.logo {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: var(--color-txt-highlight);

  font-family: Consolas, sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  .slash {
    font-size: 0.8rem;
    color: var(--color-txt-m-muted);
    margin-right: 5px;
  }
}
</style>

<template>
  <div class="logo">
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 7L3 12L8 17"
        stroke="url(#oxy_1)"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15 7L20 12L15 17"
        stroke="url(#oxy_1)"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <linearGradient
          id="oxy_1"
          x1="19.875"
          y1="12"
          x2="2.375"
          y2="12"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#00FF1A" />
          <stop offset="1" stop-color="#FFB800" />
        </linearGradient>
      </defs>
    </svg>
    <div class="slash" v-if="slash">&sol;</div>
    <slot> </slot>
  </div>
</template>
<script>
export default {
  props: {
    slash: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 50,
    },
  },
};
</script>
