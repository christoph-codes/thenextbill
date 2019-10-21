<template>
  <div class="admin-edit-settings" v-if="admin">
    <h1 class="dashboard-header">Edit Settings</h1>
    <div class="bills-table">
      <form class="edit-bill-form" @submit.prevent="editSettings">
        <table
          class="uk-table uk-table-hover uk-table-responsive uk-table-divider"
        >
          <tr>
            <td class="setting-label uk-width-1-4"><b>First Name:</b></td>
            <td>
              <input type="text" v-model="admin.fname" />
            </td>
          </tr>
          <tr>
            <td class="setting-label uk-width-1-4"><b>Last Name:</b></td>
            <td>
              <input type="text" v-model="admin.lname" />
            </td>
          </tr>
          <tr>
            <td class="setting-label uk-width-1-4"><b>Email:</b></td>
            <td>
              <input type="text" v-model="admin.email" />
            </td>
          </tr>
        </table>

        <input type="submit" value="Update Settings" class="btn prime" />
        <router-link to="/admin/settings" class="link"
          ><i class="uk-icon-close"></i>Cancel</router-link
        >
      </form>
    </div>

    <p class="text-danger uk-text-center" v-if="feedback">{{ feedback }}</p>
  </div>
</template>

<script>
import db from "@/firebase/init.js";
import firebase from "firebase";

export default {
  name: "admin-edit-settings",
  data() {
    return {
      admin: {}
    };
  },
  methods: {
    getUser() {
      // get current user
      let admin = firebase.auth().currentUser;

      // find the logged in user record and grab its data
      let user = db.collection("users").where("user_id", "==", admin.uid);

      user.get().then(snapshot => {
        snapshot.forEach(doc => {
          (this.admin = doc.data()), (this.admin.id = doc.id);
        });
      });
    },
    editSettings() {
      if (this.admin) {
        // adding a new bill data to the database
        db.collection("users")
          .doc(this.admin.id)
          .update({
            fname: this.admin.fname,
            lname: this.admin.lname,
            email: this.admin.email
          })
          .then(() => {
            this.$router.push({ name: "admin-settings" });
            this.feedback = "User Successfully Updated";
          })
          .catch(err => {
            // console.log(err);
            this.feedback = err;
          });
      } else {
        this.feedback = "You must complete all fields!";
      }
    }
  },
  created() {
    this.getUser();
  }
};
</script>

<style scoped>
td.setting-label {
  text-align: right;
}
</style>
