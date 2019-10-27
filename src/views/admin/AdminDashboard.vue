<template>
  <div class="admin-dashboard-two">
    <div class="uk-grid">
      <div class="uk-width-medium-1-3 uk-width-small-1-2">
        <AdminBillsCard/>
      </div>
      <div class="uk-width-medium-2-3 uk-width-small-1-2">
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
