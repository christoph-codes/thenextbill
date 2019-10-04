<template>
  <div class="admin-bills">
    <h1 class="dashboard-header">Bills</h1>
    <div class="bills-table">
      <table class="uk-table uk-table-responsive uk-table-divider">
        <thead>
          <tr>
            <th>Bill Name</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Recurrence</th>
            <th>Paid Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bill in bills" :key="bill.id">
            <td class="bold-table-data">{{ bill.name }}</td>
            <td>${{ bill.amount }}</td>
            <td>{{ bill.due_day }}</td>
            <td>{{ bill.category }}</td>
            <td>{{ bill.priority }}</td>
            <td>{{ bill.recurrence }}</td>
            <td v-if="!bill.paid_status">
              <a href="" @click="toggle(bill)">Unpaid</a>
            </td>
            <td v-else>
              <a href="" @click="toggle(bill)">Paid</a>
            </td>
            <td>
              <router-link
                :to="{
                  name: 'admin-edit-bill',
                  params: { bill_slug: bill.slug }
                }"
                >Edit Bill</router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="add-to-bills">
      <h3>
        <router-link to="/admin/add-bill"> [+] Add Bill </router-link>
      </h3>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";

export default {
  name: "admin-bills",
  data() {
    return {
      admin: {},
      bills: [],
      feedback: null
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
        let bills = db
          .collection("bills")
          .where("user_id", "==", this.admin.user_id)
          .orderBy("due_day")
          .orderBy("amount")
          .orderBy("priority");
        bills.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            let bill = change.doc.data();
            bill.id = change.doc.id;
            if (change.type === "added") {
              // console.log("New bill: ", bill.name);
              this.bills.push(bill);
            }
            if (change.type === "modified") {
              console.log("Bill updated: " + bill.name);
            }
          });
        });
      });
    }
    // toggle(bill) {
    //   db.collection("bills")
    //     .doc(bill.id)
    //     .update({
    //       // toggle paid status on server
    //       // paid_status: !bill.paid_status
    //     })
    //     .then(() => {
    //       console.log("This is the new paid status" + bill.paid_status)
    //       // toggle paid status on local
    //       // bill.paid_status = !this.bill.paid_status;
    //       // push this bill to local bills
    //       // this.bills.push(bill);
    //       // console.log("Paid Status Updated");
    //     })
    //     .catch(err => {
    //       // catch errors if something goes wrong
    //       // console.log(err);
    //       this.feedback = err;
    //     });
    // }
  },
  created() {
    this.getUserAndBills();
  }
};
</script>

<style>
.uk-table th {
  color: var(--gray);
}
.add-to-bills {
  text-align: center;
  padding: 20px 0;
  background: var(--lgray);
  transition: 0.3s;
  cursor: pointer;
  position: relative;
}
.add-to-bills h3 {
  margin: 0;
}
.add-to-bills h3 a {
  text-decoration: none;
  color: var(--gray);
  text-transform: uppercase;
  font-size: 18px;
  font-weight: bold;
}
.add-to-bills h3 a:hover {
  color: var(--prime);
}
.add-to-bills:hover {
  background: white;
  box-shadow: 0 0 20px -15px;
}
td.bold-table-data {
  font-weight: bold;
  color: var(--prime);
}
tbody tr:first-child {
  background: var(--wsecon);
}
</style>
