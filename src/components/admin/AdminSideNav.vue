<template>
  <div class="admin-side-nav">
    <div class="admin-side-nav-content uk-sticky" uk-sticky>
      <img
        class="dashboard-logo"
        alt="The Next Bill Dashboard"
        src="@/assets/side-nav-logo-gray@2x.png"
      />
      <hr />
      <ul>
        <li><router-link to="/admin/dashboard">Dashboard</router-link></li>
        <li><router-link to="/admin/add-bill">Add Bill</router-link></li>
        <li><router-link to="/admin/settings">Settings</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "admin-side-nav"
};
</script>

<style scoped>
.admin-side-nav {
  background: var(--lgray);
  text-align: center;
  padding: 0 30px;
  min-height: 100vh;
  height: 100%;
}
.admin-side-nav hr {
  border-top: 1px solid var(--gray);
}
.admin-side-nav ul {
  padding: 0;
  list-style: none;
  text-align: center;
}
.admin-side-nav li {
  padding: 30px 0;
}
.admin-side-nav li a {
  color: var(--gray);
  font-size: 16px;
}
img.dashboard-logo {
  width: 70%;
  margin: 60px auto 30px;
}
</style>
