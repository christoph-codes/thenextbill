import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/web/Login.vue";
import CreateAccount from "./views/web/CreateAccount.vue";
import ForgotPassword from "./views/web/ForgotPassword.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/create-account",
      name: "create-account",
      component: CreateAccount
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: ForgotPassword
    }
  ]
});
