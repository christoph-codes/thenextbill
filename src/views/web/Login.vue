<template>
  <div class="login">
    <section class="hero" id="home">
      <div class="content">
        <div class="narrow">
          <MainLogo />
          <h1 class="page-header">Login</h1>
          <form action="#">
            <input type="email" name="user_email">
            <input type="password" name="user_password">
            <input type="submit" class="btn prime">
          </form>
          <router-link class="link" to="/create-account">Create Account</router-link>
          <router-link class="link" to="/forgot-password">Forgot Password?</router-link>
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
