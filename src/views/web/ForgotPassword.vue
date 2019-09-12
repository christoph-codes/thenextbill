<template>
  <div class="forgot-password">
    <section class="hero" id="home">
      <div class="content">
        <div class="narrow">
          <MainLogo />
          <h1 class="page-header">Forgot Password</h1>
          <p>
            Enter your email associated with your account and we will send you a
            link to reset your password.
          </p>
          <form action="#">
            <input type="email" placeholder="Email" name="user_email" />
            <input type="submit" value="Recover Password" class="btn prime" />
          </form>
          <router-link class="link" to="/create-account"
            >Create Account</router-link
          >
          <router-link class="link" to="/login">Login</router-link>
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
