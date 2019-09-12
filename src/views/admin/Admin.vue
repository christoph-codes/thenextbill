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
}
.dashboard-view {
  padding: 0 50px 0;
  height: 100%;
}
.dashboard {
  padding-bottom: 50px;
}
</style>
