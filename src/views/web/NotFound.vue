<template>
  <div class="page-not-found">
    <div class="main">
      <router-link to="/">
        <img
          class="tnb-logo"
          src="@/assets/tnb-official-hori-logo-dark@2x.png"
          alt="The Next Bill Logo"
        />
      </router-link>
      <h4>OOPS!</h4>
      <h3>
        We all get lost managing bills at some point.
      </h3>
      <router-link class="btn prime" to="/admin/dashboard"
        >Dashboard »</router-link
      >
      <hr />
      <p class="narrow">
        If you did not find this page your mistake and you would like to provide
        us feedback on a broken link, we'd be happy to hear from you.
        <br />Email us at
        <a href="mailto:thekirkconcept@gmail.com">TNB Support</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "page-not-found"
};
</script>

<style scoped>
.page-not-found {
  background: white;
  height: 100vh;
  text-align: center;
}
.page-not-found h4 {
  font-size: 20vw;
  font-weight: bold;
  color: var(--danger);
  margin: 0;
  line-height: 1;
}
.page-not-found h3 {
  color: var(--prime);
  margin-bottom: 20px;
}
.tnb-logo {
  margin: 10vh 0;
  width: 250px;
}
</style>
