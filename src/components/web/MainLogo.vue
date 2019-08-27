<template>
  <div class="main-logo">
    <router-link to="/">
      <img alt="The Next Bill Logo" src="@/assets/full_logo_light.png" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "MainLogo"
};
</script>

<style scoped>
.main-logo {
  text-align: center;
}
.main-logo img {
  width: 200px;
}
</style>
