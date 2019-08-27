<template>
  <div class="home">
    <!-- <HelloWorld msg="The Next Bill App is Here!" /> -->
    <section class="hero" id="home">
      <div class="narrow">
        <MainLogo />
        <p>
          The app that prioritizes your bills to properly keep you on track for financial success.
        </p>
        <router-link class="btn prime" to="/create-account">Create an Account</router-link>
        <router-link class="link" to="/create-account">Login</router-link>
      </div>
    </section>
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
section.hero#home {
  padding: 25vh 0;
}
.hero#home {
  text-align: center;
}
.home p {
  font-size: 18px;
  line-height: 170%;
}
</style>
