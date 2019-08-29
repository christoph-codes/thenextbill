import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";

/* eslint-disable */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

// wait for firebase auth to init before creating the app
firebase.auth().onAuthStateChanged(() => {
  // init app if not already created
  if (!App) {
    /* eslint-disable no-new */
    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});
