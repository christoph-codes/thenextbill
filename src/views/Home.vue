<template>
  <div class="home">
    <MainLogo />
    <!-- <HelloWorld msg="The Next Bill App is Here!" /> -->

    <h1 class="header">The Next Bill</h1>
    <p>
      The app that prioritizes your bills to properly keep you on track for financial success.
    </p>
    <router-link to="/create-account">Create </router-link>
    <MainFooter />
  </div>
</template>

<script>
// @ is an alias to /src
import MainLogo from "@/components/web/MainLogo.vue";
import MainFooter from "@/components/web/MainFooter.vue";

export default {
  name: "home",
  components: {
    MainLogo,
    MainFooter
  }
};
</script>

<style>
:root {
  --prime: #3b4557;
  --secon: #21f787;
  --terti: #f48b22;
  --danger: #f22552;
}
html {
  background: var(--prime);
}
</style>
