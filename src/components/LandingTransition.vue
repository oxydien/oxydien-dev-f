<style lang="scss" scoped>

.logo-transition {
  position: relative;
  display: grid;
  place-items: center;

  .logo {
    font-size: clamp(12rem, 20vw, 30rem);
  }
  
  .logo-old {
    position: absolute;
    margin-inline: auto;
    animation: oldLogoOut forwards 2s ease-in;
    z-index: 1;
  }

  .logo:not(.logo-old) {
    font-size: clamp(18rem, 20vw, 36rem);
    animation: newLogoIn forwards 2s ease-in;
  }
}
@keyframes oldLogoOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(.4);
    }
}
@keyframes newLogoIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

<template>
  <div class="logo-transition">
    <Logo class="logo logo-old" aria-hidden="true" />
    <Axoxy class="logo" aria-hidden="true" />
  </div>
</template>

<script>
import Logo from "./icons/LogoIcon.vue";
import Axoxy from "./icons/AxoxyIcon.vue";

export default {
	name: "LandingTransition",
	components: {
		Logo,
		Axoxy,
	},
};
</script>
