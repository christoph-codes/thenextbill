<template>
  <div class="admin-bills">
    <h1 class="dashboard-header">Bills</h1>
    <div class="bills-table">
      <table
        class="uk-table uk-table-hover uk-table-responsive uk-table-divider"
      >
        <thead>
          <tr>
            <th>Bill Name</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Category</th>
            <th>Importance</th>
            <th>Recurrence</th>
            <th>Paid Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bill in bills" :key="bill.id">
            <td class="bold-table-data">{{ bill.name }}</td>
            <td>${{ bill.amount }}</td>
            <td>
              <div v-if="typeof bill.due_day === 'object'">
                {{ convertTimestamp(bill.due_day) }}
              </div>
            </td>
            <td>
              <span
                :class="{
                  orangebg: bill.category === 'entertainment',
                  bluebg: bill.category === 'food',
                  purplebg: bill.category === 'transportation',
                  greenbg: bill.category === 'utilities',
                  redbg: bill.category === 'housing'
                }"
                class="category-tag"
                >{{ bill.category }}</span
              >
            </td>
            <td>
              <div v-if="bill.importance == '3'">
                <img
                  src="@/assets/low-importance-icon@2x.png"
                  :alt="bill.name"
                  class="importance_icon"
                />
              </div>
              <div v-if="bill.importance == '2'">
                <img
                  src="@/assets/medium-importance-icon@2x.png"
                  :alt="bill.name"
                  class="importance_icon"
                />
              </div>
              <div v-if="bill.importance == '1'">
                <img
                  src="@/assets/high-importance-icon@2x.png"
                  :alt="bill.name"
                  class="importance_icon"
                />
              </div>
            </td>
            <td>{{ bill.recurrence }}</td>
            <td v-if="!bill.paid_status">
              <a
                class="modal"
                uk-toggle="target: #toggle-bill-modal"
                @click="sendBill(bill)"
                ><span
                  class="past-due-tag"
                  v-if="pastDueCheck(bill.due_day) && !bill.paid_status"
                  >Past Due</span
                ><span v-else>Mark as Paid</span></a
              >
            </td>
            <td v-else>
              <b>Paid</b>
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
            <div
              id="toggle-bill-modal"
              class="add-bill-modal uk-flex-top"
              uk-modal
            >
              <div
                class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical"
              >
                <h2 v-if="selectedBill.paid_status" class="uk-modal-title">
                  Are you sure you want to mark {{ selectedBill.name }} as
                  unpaid?
                </h2>
                <h2 v-if="!selectedBill.paid_status" class="uk-modal-title">
                  Are you sure you want to mark {{ selectedBill.name }} as Paid?
                </h2>
                <a
                  class="uk-modal-close btn prime"
                  @click="toggle(selectedBill)"
                  href=""
                  >Confirm</a
                >
                <a
                  class="uk-modal-close btn secon"
                  @click="selectedBill = ''"
                  href=""
                  >Cancel</a
                >
                <a
                  class="uk-modal-close-default"
                  @click="selectedBill = ''"
                  href=""
                  uk-close
                ></a>
              </div>
            </div>
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
      feedback: null,
      selectedBill: ""
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
          .orderBy("paid_status")
          .orderBy("due_day")
          .orderBy("amount")
          .orderBy("importance");
        bills.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            let bill = change.doc.data();
            bill.id = change.doc.id;
            if (change.type === "added") {
              // console.log("New bill: ", bill.name);
              this.bills.push(bill);
            }
            if (change.type === "modified") {
              // console.log("Bill updated: " + bill.name);
            }
          });
        });
      });
    },
    sendBill(bill) {
      this.selectedBill = bill;
      // console.log(this.selectedBill);
    },
    toggle(bill) {
      db.collection("bills")
        .doc(bill.id)
        .update({
          // toggle paid status on server
          paid_status: !this.selectedBill.paid_status
        })
        .then(() => {
          // toggle paid status on local
          bill.paid_status = !bill.paid_status;
          // ********* USE THIS CONSOLE LOG FOR TESTING *********console.log(bill.name);
          // console.log("Paid Status Updated");
          this.selectedBill = "";
        })
        .catch(err => {
          // catch errors if something goes wrong
          // console.log(err);
          this.feedback = err;
        });
    },
    convertTimestamp(timestamp) {
      if (!timestamp) return;
      let date = new Date(timestamp.seconds * 1000);

      let yyyy = date.getFullYear();
      let mm = (parseInt(date.getMonth()) + 1).toString().slice(-2);
      let dd = date.getDate();

      date = mm + "/" + dd + "/" + yyyy;
      return date;
    },
    pastDueCheck(dueday) {
      let billsdate = dueday.toDate();
      let currentDate = new Date();

      // console.log(billsdate);
      // console.log(currentDate);

      if (billsdate < currentDate) {
        return true;
      } else {
        return false;
      }
    }
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
.uk-table td {
  padding: 10px 12px;
  font-size: 12px;
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
.uk-table-hover > tr:hover,
.uk-table-hover tbody tr:hover {
  background: #e5e6f0;
}
span.past-due-tag {
  border: solid 1px var(--danger);
  border-radius: 3px;
  padding: 3px;
  background: #ffebf0;
  color: var(--danger);
  font-weight: bold;
}
</style>
