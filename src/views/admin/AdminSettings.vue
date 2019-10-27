<template>
  <div class="admin-settings">
    <h1 class="dashboard-header">Settings</h1>
    <div class="settings-table">
      <table
        class="uk-table uk-table-hover uk-table-responsive uk-table-divider"
      >
        <tr>
          <td class="setting-label uk-width-1-4"><b>First Name:</b></td>
          <td>{{ admin.fname }}</td>
        </tr>
        <tr>
          <td class="setting-label uk-width-1-4"><b>Last Name:</b></td>
          <td>{{ admin.lname }}</td>
        </tr>
        <tr>
          <td class="setting-label uk-width-1-4"><b>Email:</b></td>
          <td>{{ admin.email }}</td>
        </tr>
        <tr>
          <td class="setting-label uk-width-1-4"><b>Total Bill Count:</b></td>
          <td>{{ billcount }}</td>
        </tr>
        <tr>
          <td class="setting-label uk-width-1-4">
            <b>Bills Marked As Paid:</b>
          </td>
          <td>{{ paidbillcount }}</td>
        </tr>
      </table>
    </div>
    <div class="uk-text-center">
      <h3>
        <router-link class="btn prime" to="/admin/edit-settings"> Edit Settings </router-link>
      </h3>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";

export default {
  name: "admin-settings",
  data() {
    return {
      admin: {},
      billcount: null,
      paidbillcount: null
    };
  },
  methods: {
    getUserAndBills() {
      // get current user
      let admin = firebase.auth().currentUser;

      // find the logged in user record and grab its data
      let user = db.collection("users").where("user_id", "==", admin.uid);

      user.get().then(snapshot => {
        snapshot.forEach(doc => {
          (this.admin = doc.data()), (this.admin.id = doc.id);
        });

        // get current user's bills
        let totalbills = db
          .collection("bills")
          .where("user_id", "==", this.admin.user_id);

        totalbills.get().then(bill => {
          this.billcount = bill.size;
        });

        // get current user's paid bills
        let paidbills = db
          .collection("bills")
          .where("user_id", "==", this.admin.user_id)
          .where("paid_status", "==", true);

        paidbills.get().then(paidbill => {
          this.paidbillcount = paidbill.size;
        });
      });
    }
  },
  created() {
    this.getUserAndBills();
  }
};
</script>

<style scoped>
td.setting-label {
  text-align: center;
}
.settings-table tr {
    margin: 0;
    text-align: center;
}
</style>
