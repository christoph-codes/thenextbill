<template>
  <div class="admin-dashboard">
    <div class="uk-grid dashboard-bills">
      <div v-for="bill in bills" :key="bill.id" class="uk-width-1-3">
        <div v-if="!bill.paid_status" class="bill-card">
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
              <a class="btn" href="#" @click="toggleBillPaid">Mark as Paid</a>
            </div>
          </div>
        </div>
      </div>
      <div class="uk-width-1-3">
        <div class="add-bill-card">
          <div class="add-bill-content">
            <h3>
              <router-link to="/admin/add-bill" class="add-bill-title"
                >Add Bill</router-link
              >
            </h3>
            <p>
              <router-link to="/admin/add-bill" class="add-icon">+</router-link>
            </p>
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
      paid_status: false
    };
  },
  created() {
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
        .where("user_id", "==", this.admin.user_id);
      bills.get().then(snapshot => {
        snapshot.forEach(doc => {
          let bill = doc.data();
          bill.id = doc.id;
          this.bills.push(bill);
        });
      });
    });
  },
  methods: {
    toogle() {
      this.paid_status = !this.paid_status;
    }
  }
};
</script>

<style>
.uk-width-1-3:nth-child(3n + 4) {
  margin-top: 40px;
}
.bill-card {
  background: white;
  box-shadow: 0 0 30px -20px var(--gray);
  text-align: center;
  min-height: 480px;
}
.bill-content {
  padding: 30px;
}
.bill-card h1 {
  font-size: 21px;
  text-transform: uppercase;
  font-weight: bold;
  color: var(--prime);
  text-align: center;
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
.uk-width-1-3:first-child .bill-card {
  background: var(--wsecon);
}
.uk-width-1-3:first-child .bill-message {
  background: var(--prime);
}
.uk-width-1-3:first-child .bill-message p {
  color: var(--secon);
}
.uk-width-1-3:first-child .bill-paid-btn .btn {
  background: var(--secon);
  color: white;
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
.uk-width-1-3:first-child .bill-paid-btn .btn:hover {
  background: var(--gray);
  color: white;
}
.add-bill-card {
  padding: 30px;
  background: white;
  box-shadow: 0 0 30px -20px var(--gray);
  text-align: center;
}
.add-bill-content {
  padding: 20px 0 0;
}
.add-bill-content * {
  margin: 0;
}
.add-bill-content a.add-bill-title {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 18px;
  color: var(--gray);
  margin: 0;
}
.add-bill-content a.add-icon {
  font-size: 150px;
  color: var(--gray);
  margin: 0;
  line-height: 60px;
}
.add-bill-content a.add-icon:hover,
.add-bill-content a.add-bill-title:hover {
  text-decoration: none;
  color: var(--prime);
}
</style>
