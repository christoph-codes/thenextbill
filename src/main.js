import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";
import VueGtm from "vue-gtm";

Vue.config.productionTip = false;

Vue.use(VueGtm, {
  id: "GTM-KN6RDQN", // Your GTM single container ID or array of container ids ['GTM-xxxxxxx', 'GTM-yyyyyyy']
  enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
  debug: true, // Whether or not display console logs debugs (optional)
  vueRouter: router // Pass the router instance to automatically sync with router (optional)
});

let app = "";

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});
