<template>
  <div class="login">
    <section class="hero" id="home">
      <div class="content">
        <div class="narrow">
          <MainLogo />
          <h1 class="page-header">Login</h1>
          <form @submit.prevent="login">
            <input type="email" name="user_email" v-model="email">
            <input type="password" name="user_password" v-model="password">
            <input type="submit" value="Login" class="btn prime">
          </form>
          <p v-if="feedback">{{ feedback }}</p>
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
import firebase from "firebase";

export default {
  name: "home",
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    }
  },
  components: {
    MainLogo,
    MainFooter
  },
  methods: {
    login() {
      console.log(this.email, this.password);
      if (this.email && this.password) {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(cred => {
          // console.log(cred.user);
          this.$router.push({ name: "admin-dashboard" });
        })
        .catch(err => {
          this.feedback = err.message;
        }) 
        this.feedback = null
      } else {
        this.feedback = "Please fill in both fields."
      }
    }
  }
};
</script>
