import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueFire from "vuefire";
import firebase from "firebase";

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
