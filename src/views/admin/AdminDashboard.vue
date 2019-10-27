<template>
  <div class="admin-dashboard-two">
    <div class="uk-grid">
      <div class="uk-width-1-3@m">
        <AdminBillsCard/>
      </div>
      <div class="uk-width-2-3@m">
        <AdminBillsList />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";

import AdminBillsList from "@/components/admin/AdminBillsList";
import AdminBillsCard from "@/components/admin/AdminBillsCard";

export default {
  name: "admin-dashboard-two",
  components: {
    AdminBillsList,
    AdminBillsCard
  }
};
</script>

<style scoped>

</style>
