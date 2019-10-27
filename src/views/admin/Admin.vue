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
    <MainFooter />
  </div>
</template>

<script>
import AdminNav from "@/components/admin/AdminNav";
import AdminSideNav from "@/components/admin/AdminSideNav";
import MainFooter from "@/components/web/MainFooter.vue";

export default {
  name: "admin",
  components: {
    AdminNav,
    AdminSideNav,
    MainFooter
  },
  data() {
    return {};
  }
};
</script>

<style>
#adminHome {
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
.greenbg {
  background: var(--secon);
}
.orangebg {
  background: #ff4f0f;
}
.purplebg {
  background: #4D06AA;
}
.bluebg {
  background: #21c6f7;
}
.redbg {
  background: #b12929;
}
.yellowbg {
  background: #ffdf49;
}
.tealbg {
  background: #1DDDD8;
}
.magentabg {
  background: #D3188E;
}
</style>
