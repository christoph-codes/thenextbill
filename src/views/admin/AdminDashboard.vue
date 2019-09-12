<template>
  <div class="admin-dashboard">
    <div class="uk-grid dashboard-bills">
      <div
        v-for="bill in unpaidBills"
        :key="bill.id"
        class="uk-width-1-3@m uk-width-1-1@s bill"
      >
        <div class="bill-card">
          <div class="bill-message">
            <p>{{ bill_message }}</p>
          </div>
          <div class="bill-content">
            <h1 class="bill-name">{{ bill.name }}</h1>
            <p class="bill-due-date">
              <span class="bill-label">Due Date</span><br />
              {{ bill.due_day }}
            </p>
            <p class="bill-amount">
              <span class="bill-label">Amount</span><br />
              ${{ bill.amount }}
            </p>
            <hr />
            <div class="bill-details">
              <div class="uk-grid">
                <div class="uk-width-1-2">
                  <ul class="bill-details-label">
                    <li>Category:</li>
                    <li>Recurrence:</li>
                    <li>Priority:</li>
                  </ul>
                </div>
                <div class="uk-width-1-2">
                  <ul class="bill-details-value">
                    <li>{{ bill.category }}</li>
                    <li>{{ bill.recurrence }}</li>
                    <li>{{ bill.priority }}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="bill-paid-btn">
              <a class="btn" @click="toggle(bill)">Mark as Paid</a>
              <a class="btn modal" uk-toggle="target: #add-bill-modal"
                >Open Modal</a
              >
            </div>
            <div
              id="add-bill-modal"
              class="add-bill-modal uk-flex-top"
              uk-modal
            >
              <div
                class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical"
              >
                <h2 class="uk-modal-title">
                  Are you sure you want to mark {{ bill.name }} as paid?
                </h2>
                <a
                  class="uk-modal-close btn prime"
                  @click="toggle(bill)"
                  href=""
                  >Confirm</a
                >
                <a class="uk-modal-close btn secon" href="">Cancel</a>
                <a href="" uk-close></a>
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
      bill_message: "Pay this today!"
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
              // console.log("Bill updated: " + bill.name);
              this.bills.push(bill);
            }
          });
        });
      });
    },
    toggle(bill) {
      db.collection("bills")
        .doc(bill.id)
        .update({
          // toggle paid status on server
          paid_status: !bill.paid_status
        })
        .then(() => {
          // toggle paid status on local
          bill.paid_status = !this.paid_status;
          // console.log("Paid Status Updated");
        })
        .catch(err => {
          // catch errors if something goes wrong
          // console.log(err);
          this.feedback = err;
        });
    }
  },
  created() {
    this.getUserAndBills();
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
.bill:last-child {
  margin-top: 40px;
}
.bill-card {
  background: white;
  box-shadow: 0 0 30px -20px var(--gray);
  text-align: center;
  min-height: 450px;
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
.bill-card h1 {
  font-size: 21px;
  text-transform: uppercase;
  font-weight: bold;
  color: var(--prime);
  text-align: center;
  margin: 0;
}
.bill-message {
  padding: 15px;
  text-align: center;
  background: var(--lgray);
}
.bill-message p {
  color: var(--gray);
  margin: 0px;
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
.bill:first-child .bill-card {
  background: var(--wsecon);
}
.bill:first-child .bill-message {
  background: var(--prime);
}
.bill:first-child .bill-message p {
  color: var(--secon);
}
.bill:first-child .bill-paid-btn .btn {
  background: var(--secon);
  color: white;
}
.bill:nth-child(1n + 4) {
  margin-top: 30px;
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
.add-bill-card {
  padding: 50px 30px;
  background: white;
  box-shadow: 0 0 30px -20px var(--gray);
  text-align: center;
}
.add-bill-content .add-bill-title {
  text-transform: uppercase;
  font-size: 21px;
  font-weight: bold;
  margin: 0;
  padding: 50px 0;
}
.add-bill-title a {
  position: relative;
  color: var(--lgray);
  cursor: pointer;
  text-decoration: none;
}
.add-bill-title a:hover {
  position: relative;
  color: var(--gray);
  cursor: pointer;
}
</style>
