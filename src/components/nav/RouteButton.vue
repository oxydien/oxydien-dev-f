<style lang="scss">
.route-button {
  display: flex;
  align-items: center;
  background-color: var(--color-button-bg);
  color: var(--color-txt-highlight);
  border-radius: 10px;
  padding: 1rem;
  border: none;
  cursor: pointer;
  font-size: 1.4rem;

  .icon > svg {
    height: 30px;
    width: 30px;
  }
  .content {
    margin-left: 5px;
    font-family: Consolas, sans-serif;
  }
  &:hover:not(.highlighted) {
    outline: 2px solid var(--color-highlighted);
  }
  &.highlighted {
    background-color: var(--color-highlighted);
  }
}
</style>

<template>
  <button class="route-button" :class="{ highlighted }">
    <div class="icon">
      <slot name="icon" aria-hidden="true"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    highlighted: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
