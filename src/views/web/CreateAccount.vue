<template>
  <div class="create-account">
    <section class="hero" id="home">
      <div class="content">
        <div class="narrow">
          <MainLogo />
          <h1 class="page-header">Create Account</h1>
          <form @submit.prevent="signup">
            <input 
              type="text"
              name="user_fname"
              placeholder="First Name"
              v-model="fname"
            />
            <input
              type="text"
              name="user_lname"
              placeholder="Last Name"
              v-model="lname"
            />
            <input
              type="email"
              name="user_email"
              placeholder="Email"
              v-model="email"
            />
            <input
              type="password"
              name="user_password"
              placeholder="Password"
              v-model="password"
            />
            <input
              type="password"
              name="user_confirm_password"
              placeholder="Confirm Password"
              v-model="confirmpassword"
            />
            <input type="submit" value="Create Account" class="btn prime" />
            <p v-if="feedback">{{ feedback }}</p>
          </form>
          <router-link class="link" to="/login">
            Already have an account? Login
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
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "home",
  components: {
    MainLogo,
    MainFooter
  },
  data() {
    return {
      fname: null,
      lname: null,
      email: null,
      password: null,
      confirmpassword: null,
      feedback: null,
      user_id: null
    };
  },
  methods: {
    signup() {
      if (this.email && this.fname && this.lname && this.password) {
        if (this.password === this.confirmpassword) {
          let ref = db.collection("users").doc(this.email);
          ref.get().then(doc => {
            if (doc.exists) {
              this.feedback =
                "This email is already associated with an account. Please login";
            } else {
              firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                  ref.set({
                    fname: this.fname,
                    lname: this.lname,
                    email: this.email,
                    user_id: cred.user.uid
                  });
                })
                .then(() => {
                  this.$router.push({ name: "admin-dashboard" });
                })
                .catch(err => {
                  // console.log(err);
                  this.feedback = err.message;
                });
            }
          });
        } else {
          this.feedback = "Your passwords do not match.";
        }
      } else {
        this.feedback = "You must enter all fields.";
      }
    }
  }
};
</script>
