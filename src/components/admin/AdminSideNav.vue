<template>
  <div class="admin-side-nav">
    <div class="admin-side-nav-content uk-sticky" uk-sticky>
      <img
        class="dashboard-logo uk-visible@s"
        alt="The Next Bill Dashboard"
        src="@/assets/side-nav-logo-gray@2x.png"
      />
      <img
        class="mobile-dashboard-logo uk-hidden@m"
        alt="The Next Bill Dashboard"
        src="@/assets/dashboard-logo.svg"
      />
      <hr />
      <ul class="uk-visible@m">
        <li><router-link to="/admin/dashboard">Dashboard</router-link></li>
        <li><router-link to="/admin/add-bill">Add Bill</router-link></li>
        <li><router-link to="/admin/settings">Settings</router-link></li>
      </ul>

      <div class="uk-hidden@m hamburger">
        <a href="#mobile-nav" uk-toggle>
          <img src="@/assets/hamburger-icon.svg" alt="Hamburger Menu Icon - The Next Bill" />
          </a>
      </div>
      <div id="mobile-nav" uk-offcanvas="flip: true; mode: push">
        <div class="uk-offcanvas-bar">
            <button class="uk-offcanvas-close" type="button" uk-close></button>
            <ul>
              <li><router-link class="uk-offcanvas-close" to="/admin/dashboard">Dashboard</router-link></li>
              <li><router-link class="uk-offcanvas-close" to="/admin/add-bill">Add Bill</router-link></li>
              <li><router-link class="uk-offcanvas-close" to="/admin/settings">Settings</router-link></li>
            </ul>
        </div>
      </div>
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
  .admin-side-nav li {
    padding: 10px 0 10px 20px;
  }
  .uk-offcanvas-close {
    position: inherit;
  }
  .admin-side-nav-content {
    padding: 10px 20px;
    height: 60px;
  }
  .dashboard-view {
    padding: 0 20px 0;
  }
  .hamburger {
    float: right;
    width: 30%;
    text-align: right;
  }
  .hamburger a {
    padding: 5px 0;
    display: inline-block;
  }
  img.mobile-dashboard-logo {
    float: left;
    width: 70%;
  }
  .hamburger a img {
    width: 30px;
  }
}
</style>
