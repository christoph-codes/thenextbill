<template>
  <div id="adminHome">
    <div class="uk-grid">
      <div class="uk-width-1-6">
        <p>SideNav Component</p>
      </div>
      <div class="uk-width-5-6">
        <AdminNav />
        <div class="dashboard">
          <router-view/>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import AdminNav from "@/components/admin/AdminNav";
import UIkit from "uikit";


export default {
  name: "admin",
  components: {
    AdminNav,
    UIkit
  },
  data() {
    return {
    };
  }
};
</script>
