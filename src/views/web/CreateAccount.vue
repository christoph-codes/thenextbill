<template>
  <div class="create-account">
    <section class="hero" id="home">
      <div class="content">
        <div class="narrow">
          <MainLogo />
          <h1 class="page-header">Create Account</h1>
          <form action="#">
            <input type="text" name="user_fname" placeholder="First Name">
            <input type="text" name="user_lname" placeholder="Last Name">
            <input type="email" name="user_email" placeholder="Email">
            <input type="password" name="user_password" placeholder="Password">
            <input type="password" name="user_confirm_password" placeholder="Confirm Password">
            <input type="submit" value="Create Account" class="btn prime">
          </form>
          <router-link class="link" to="/login">Already have an account? Login</router-link>
        </div>
      </div>
    </section>
    <MainFooter />
  </div>
</template>

<script>
// import firebase for authentication
import firebase from 'firebase'

// @ is an alias to /src
import MainLogo from "@/components/web/MainLogo.vue";
import MainFooter from "@/components/web/MainFooter.vue";

export default {
  name: "create-account",
  components: {
    MainLogo,
    MainFooter
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signUp () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) => {
        this.$router.replace('/login')
      }).catch((err) => {
        alert(err.message)
      });
    }
  }
};
</script>