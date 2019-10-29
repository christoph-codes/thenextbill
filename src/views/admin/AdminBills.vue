<template>
  <div class="admin-bills">
    <!-- <div v-if="bills.length == 0" class="bounce animated first-bill">
      <h2>Welcome, Be sure to <br />add your first bill!</h2>
      <img src="@/assets/add-first-bill@2x.png" alt="Add your first bill" />
    </div> -->
    <div class="bill-list-view">
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
              <!-- <th>Recurrence</th> -->
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
                    redbg: bill.category === 'housing',
                    yellowbg: bill.category === 'misc'
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
              <!-- <td>{{ bill.recurrence }}</td> -->
              <td v-if="!bill.paid_status">
                <a
                  class="modal"
                  uk-toggle="target: #toggle-bill-modal"
                  @click="sendBill(bill)"
                  ><span
                    class="past-due-tag"
                    v-if="pastDueCheck(bill.due_day) && !bill.paid_status"
                    >Past Due</span
                  ><span
                    class="due-today-tag"
                    v-else-if="dueTodayCheck(bill.due_day) && !bill.paid_status"
                    >Due Today</span
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
                    Are you sure you want to mark {{ selectedBill.name }} as
                    Paid?
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
    },
    dueTodayCheck(dueday) {
      let billsdate = dueday.toDate();
      let currentDate = new Date();

      // console.log(billsdate);
      // console.log(currentDate);

      if (
        billsdate.getDate() == currentDate.getDate() &&
        billsdate.getMonth() == currentDate.getMonth()
      ) {
        return true;
      }
    }
  },
  created() {
    this.getUserAndBills();
  }
};
</script>

<style></style>
