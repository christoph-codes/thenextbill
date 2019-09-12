<template>
  <div class="home">
    <!-- <HelloWorld msg="The Next Bill App is Here!" /> -->
    <section class="hero" id="home">
      <div class="content">
        <div class="narrow">
          <MainLogo />
          <p>
            The app that prioritizes your bills to properly keep you on track
            for financial success.
          </p>
          <router-link class="btn prime" to="/create-account">
            Create an Account
          </router-link>
          <router-link class="btn secon" to="/login">
            Login
          </router-link>
        </div>
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
