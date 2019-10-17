<template>
  <div class="admin-nav">
    <div class="uk-grid">
      <div class="uk-width-1-2">
        <div class="admin-date">
          <p>Today's Date: <b v-text="getDate()" /></p>
        </div>
      </div>
      <div class="uk-width-1-2">
        <ul v-if="admin" class="uk-nav uk-nav-default">
          <li class="uk-parent">
            <a href="#">{{ admin.fname }}</a>
            <ul class="uk-nav-sub">
              <li>
                <router-link to="/admin/settings">Settings</router-link>
              </li>
              <li><a @click="logout">Logout</a></li>
            </ul>
          </li>
        </ul>
        <p v-else>No user is signed in.</p>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";

export default {
  name: "admin-nav",
  data() {
    return {
      admin: {}
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "login" });
        });
    },
    getDate() {
      var d = new Date();
      var n = d.toDateString();
      return n;
    }
  },
  created() {
    // get current user
    let admin = firebase.auth().currentUser;

    // find the logged in user record and grab its data
    let user = db.collection("users").where("user_id", "==", admin.uid);

    user.get().then(snapshot => {
      snapshot.forEach(doc => {
        (this.admin = doc.data()), (this.admin.id = doc.id);
      });
    });
  }
};
</script>

<style>
.dashboard-nav {
  list-style-type: none;
  padding: 0 10px;
  text-align: right;
  width: 100%;
}
.admin-nav {
  padding: 20px 0;
  color: var(--gray);
}
.admin-nav p,
.admin-nav a {
  margin: 0;
  font-size: 14px;
}
.admin-nav .uk-nav {
  text-align: right;
  list-style: none;
  width: 100%;
}
.uk-parent {
  position: relative;
  display: inline-block;
  transition: opacity 2s ease-in;
}
ul.uk-nav-sub {
  padding: 20px 15px;
  position: absolute;
  background: white;
  transition: all 0.3s ease;
  top: 20px;
  right: 0;
  width: 200px;
  display: none;
  box-shadow: 0 0 21px -15px var(--gray);
  opacity: 0;
}
ul.uk-nav-sub a {
  display: block;
}
.uk-nav .uk-nav-sub a {
  color: var(--gray);
  padding: 10px;
}
.admin-nav .uk-nav > li > a {
  padding: 0;
  display: block;
}
.admin-nav .uk-parent:hover .uk-nav-sub {
  display: block;
  opacity: 1;
}
</style>
