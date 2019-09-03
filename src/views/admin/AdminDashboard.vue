<template>
  <div class="admin-dashboard">
    <div class="uk-grid">
      <div v-for="bill in bills" :key="bill.id" class="uk-width-1-3">
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
                  <p class="bill-priority">
                    <span class="bill-details-label">Priority </span><br />
                    {{ bill.priority }}
                  </p>
                </div>
                <div class="uk-width-1-2">
                  <p class="bill-category">
                    <span class="bill-details-label">Category </span><br />
                    {{ bill.category }}
                  </p>
                </div>
              </div>
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
  name: "admin-dashboard",
  data() {
    return {
      admin: {},
      bills: [],
      feedback: null,
      bill_message: "Pay this today!"
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
  }
};
</script>

<style>
.bill-card {
  background: white;
  box-shadow: 0 0 30px -20px var(--gray);
  text-align: center;
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
.uk-width-1-3:first-child .bill-card {
  background: var(--wsecon);
}
.uk-width-1-3:first-child .bill-message {
  background: var(--prime);
}
.uk-width-1-3:first-child .bill-message p {
  color: var(--secon);
}
span.bill-label,
span.bill-details-label {
  color: var(--lgray);
  font-weight: bold;
  text-transform: uppercase;
  font-size: 14px;
}
</style>
