<template>
  <div class="admin-dashboard">
    <!-- <div v-if="firstTime" class="bounce animated first-bill">
      <h2>Welcome, Be sure to <br />add your first bill!</h2>
      <img src="@/assets/add-first-bill@2x.png" alt="Add your first bill" />
    </div> -->
    <div v-if="!firstTime" class="uk-grid dashboard-bills">
      <div
        v-for="bill in unpaidBills"
        :key="bill.id"
        class="uk-width-1-3@m uk-width-1-1@s bill"
      >
        <div class="bill-card">
          <div v-if="pastDueCheck(bill.due_day)" class="bill-card-flag">
            <img src="@/assets/past-due-flag@2x.png" alt="Bill Past Due" />
          </div>
          <div v-if="dueTodayCheck(bill.due_day)" class="bill-card-flag">
            <img src="@/assets/due-today-flag@2x.png" alt="Bill Due Today" />
          </div>
          <div class="bill-message">
            <p v-if="bill.name">
              <b>{{ bill.name }}</b>
            </p>
          </div>
          <div class="bill-content">
            <!-- <h1 class="bill-name" v-if="bill.name">{{ bill.name }}</h1> -->
            <p class="bill-due-date" v-if="typeof bill.due_day === 'object'">
              <span class="bill-label">Due Date</span><br />
              {{ convertTimestamp(bill.due_day) }}
            </p>
            <p v-else>
              No due date set
            </p>
            <p class="bill-amount" v-if="bill.amount">
              <span class="bill-label">Amount</span><br />
              ${{ bill.amount }}
            </p>
            <hr />
            <div class="bill-details">
              <div class="uk-grid uk-grid-collapse">
                <div class="uk-width-1-2">
                  <ul class="bill-details-label">
                    <li>Category:</li>
                    <!-- <li>Recurrence:</li> -->
                    <li>Importance:</li>
                  </ul>
                </div>
                <div class="uk-width-1-2">
                  <ul class="bill-details-value">
                    <li>
                      <div v-if="bill.category">
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
                      </div>
                    </li>
                    <!-- <li>
                      <div v-if="bill.recurrence">{{ bill.recurrence }}</div>
                    </li> -->
                    <li>
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
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="bill-paid-btn">
              <a
                class="btn modal"
                uk-toggle="target: #toggle-bill-modal"
                @click="sendBill(bill)"
                >Mark as Paid</a
              >
              <router-link
                class="edit-bill-link"
                :to="{
                  name: 'admin-edit-bill',
                  params: { bill_slug: bill.slug }
                }"
                >Edit Bill</router-link
              >
            </div>
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
          </div>
        </div>
      </div>
      <div class="uk-width-1-3@m uk-width-1-1@s bill">
        <div class="add-bill-card">
          <div class="add-bill-content">
            <h3 class="add-bill-title">
              <router-link to="/admin/add-bill">
                [+]<br />Add Bill
              </router-link>
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";

export default {
  name: "admin-dashboard",
  data() {
    return {
      admin: {},
      bills: [],
      feedback: null,
      bill_message: "Pay this today!",
      selectedBill: "",
      firstTime: false
    };
  },
  created() {
    this.getUserAndBills();
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
              // this.bills.push(bill);
            }
          });
        });
      });
    },
    sendBill(bill) {
      this.selectedBill = bill;
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
          // ******** USE THIS CONSOLE LOG FOR TESTING! ********console.log(bill.name);
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
      let date = timestamp.toDate();
      let mm = date.getMonth() + 1;
      let dd = date.getDate();
      let yyyy = date.getFullYear();

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
  computed: {
    unpaidBills() {
      // get current user's bills
      let unpaidBills = this.bills.filter(bill => {
        return !bill.paid_status;
      });
      return unpaidBills;
    }
  }
};
</script>

<style>

</style>
