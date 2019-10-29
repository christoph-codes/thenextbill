<template>
  <div class="admin-bills-card">
    <p class="line-header"><span>Your Next Bill</span></p>
    <div v-for="bill in firstBill" :key="bill.id" class="bill next-bill">
      <div class="bill-card">
        <div v-if="dueTodayCheck(bill.due_day)" class="bill-card-flag">
          <img src="@/assets/due-today-flag@2x.png" alt="Bill Due Today" />
        </div>
        <div v-else-if="pastDueCheck(bill.due_day)" class="bill-card-flag">
          <img src="@/assets/past-due-flag@2x.png" alt="Bill Past Due" />
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
                          magentabg: bill.category === 'utilities',
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
            <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
              <h2 v-if="selectedBill.paid_status" class="uk-modal-title">
                Are you sure you want to mark {{ selectedBill.name }} as unpaid?
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
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";

export default {
  name: "admin-bills-card",
  data() {
    return {
      admin: {},
      bills: [],
      feedback: null,
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

      if (billsdate <= currentDate) {
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
      } else {
        return false;
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
    },
    firstBill() {
      // get current user's bills
      let unpaidBills = this.bills.filter(bill => {
        return !bill.paid_status;
      });
      return unpaidBills.slice(0, 1);
    }
  }
};
</script>

<style scoped>
/*----------- Bills -------*/
.next-bill .bill-card {
  background: var(--wsecon);
}
.next-bill .bill-message {
  background: var(--prime);
}
.next-bill .bill-message p {
  color: var(--secon);
}
.next-bill .bill-paid-btn .btn {
  background: var(--secon);
  color: white;
}
span.past-due-tag {
  border: solid 1px var(--danger);
  border-radius: 3px;
  padding: 3px;
  background: #ffebf0;
  color: var(--danger);
  font-weight: bold;
}
span.due-today-tag {
  border: solid 1px var(--prime);
  border-radius: 3px;
  padding: 3px;
  background: var(--secon);
  color: var(--prime);
  font-weight: bold;
}
.bill-card-flag {
  float: right;
  margin-right: -24px;
  margin-top: 8px;
}
p.line-header {
  text-align: center;
  color: var(--prime);
  border-bottom: solid 1px var(--prime);
  line-height: 0;
}
p.line-header span {
  background: var(--wgray);
  padding: 0 10px;
}
.category-tag {
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
}
.bill-card {
  background: white;
  box-shadow: 0 0 30px -20px var(--gray);
  text-align: center;
  min-height: 420px;
}
.bill-content {
  padding: 30px;
}
.bill-content p {
  margin: 0;
}
p.bill-due-date,
p.bill-amount {
  font-weight: bold;
  color: var(--prime);
  font-size: 18px;
}
.bill-message {
  padding: 15px;
  text-align: left;
  background: var(--lgray);
}
.bill-message p {
  color: var(--prime);
  margin: 0px;
}
.bill-card-flag {
  float: right;
  margin-right: -24px;
  margin-top: 8px;
}
.bill-details ul {
  list-style: none;
  padding-left: 0;
}
.bill-details-label li {
  text-align: left;
  font-weight: bold;
}
.bill-details-value li {
  text-align: right;
}
.bill-details-value li,
.bill-details-label li {
  font-size: 12px;
  padding: 5px 0;
}
span.bill-label,
span.bill-details-label {
  color: var(--lgray);
  font-weight: bold;
  text-transform: uppercase;
  font-size: 14px;
}
.bill-paid-btn .btn {
  margin-top: 20px;
  background: var(--lgray);
  color: var(--prime);
  padding: 10px 0;
}
.bill-paid-btn .btn:hover,
.bill:first-child .bill-paid-btn .btn:hover {
  background: var(--gray);
  color: white;
}
.uk-modal .uk-modal-body {
  text-align: center;
}
.uk-modal .uk-modal-title {
  color: var(--prime);
}
img.importance_icon {
  max-height: 23px;
}
a.edit-bill-link {
  font-size: 12px;
  color: var(--gray);
}
@media (max-width: 960px) {
  a.edit-bill-link[data-v-08ea8f46] {
    display: block;
  }
}
</style>
