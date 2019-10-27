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
@media (max-width: 960px) {
  .admin-side-nav {
    min-height: 80px;
    height: 80px;
    padding: 0;
  }
  img.dashboard-logo {
    width: 70px;
    margin: 15px 0;
    float: left;
  }
  .admin-side-nav hr {
    display: none;
  }
  .admin-side-nav ul {
    padding: 0;
    width: calc(100% - 80px);
    float: right;
    margin: 18px 0;
  }
  .admin-side-nav li {
    padding: 10px 0 10px 40px;
    float: right;
  }
  .admin-side-nav-content {
    background: var(--lgray);
    padding: 0 50px;
    box-shadow: 0 0 10px -3px;
  }
}
@media (max-width: 600px) {
  .admin-side-nav li[data-v-16ad086d] {
    padding: 10px 0 10px 20px;
  }
}
</style>
