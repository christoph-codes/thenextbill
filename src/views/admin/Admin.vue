<template>
  <div id="adminHome">
    <div class="uk-grid uk-grid-small">
      <div class="uk-width-1-6">
        <AdminSideNav />
      </div>
      <div class="uk-width-5-6">
        <div class="dashboard-view">
          <AdminNav />
          <div class="dashboard">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNav from "@/components/admin/AdminNav";
import AdminSideNav from "@/components/admin/AdminSideNav";

export default {
  name: "admin",
  components: {
    AdminNav,
    AdminSideNav
  },
  data() {
    return {};
  }
};
</script>

<style>
div#adminHome {
  background: var(--wgray);
  min-height: 100vh;
}
.dashboard-view {
  padding: 0 50px 0;
  height: 100%;
}
.dashboard {
  padding-bottom: 50px;
}
.category-tag {
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
}
.greenbg {
  background: var(--secon);
}
.orangebg {
  background: #ff4f0f;
}
.purplebg {
  background: #9e25f6;
}
.bluebg {
  background: #21c6f7;
}
.redbg {
  background: #b12929;
}
</style>
