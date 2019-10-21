<template>
  <div class="admin-add-bill">
    <h1 class="dashboard-header">Add Bill</h1>
    <div class="narrow">
      <form class="add-bill-form" @submit.prevent="addBill">
        <input type="text" placeholder="Bill Name" v-model="name" />
        <input
          type="date"
          placeholder="Bill Due Day (4)"
          min="1"
          max="31"
          v-model="due_day"
          name="dueday"
        />
        <input
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Bill Amount"
          v-model="amount"
        />
        <select required v-model="category">
          <option value="" disabled selected>Choose Bill Category</option>
          <option value="housing">Housing</option>
          <option value="food">Food</option>
          <option value="transportation">Transportation</option>
          <option value="utilities">Utilities</option>
          <option value="entertainment">Entertainment</option>
          <option value="misc">MISC</option>
        </select>
        <!-- <input
          type="number"
          min="0"
          max="3"
          step="1"
          placeholder="How Important Is This Bill To You?"
          v-model="importance"
        /> -->
        <select required v-model="importance">
          <option value="" disabled selected
            >How Important Is This Bill To You?</option
          >
          <option value="1">Very</option>
          <option value="2">Medium</option>
          <option value="3">Low</option>
        </select>
        <select required v-model="recurrence">
          <option value="" disabled selected>Bill Recurrence</option>
          <option value="weekly">Weekly</option>
          <option value="bi-weekly">Bi-weekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="annually">Annually</option>
          <option value="one-time">One-Time</option>
        </select>
        <input type="submit" value="Add Bill" class="btn prime" />
      </form>
      <router-link class="btn secon">Cancel</router-link>
      <p class="text-danger" v-if="feedback">{{ feedback }}</p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "admin-add-bill",
  data() {
    return {
      admin: {},
      bills: [],
      amount: null,
      category: null,
      due_day: null,
      name: null,
      importance: null,
      recurrence: null,
      user_id: null,
      slug: null,
      feedback: null,
      paid_status: false
    };
  },
  created() {
    this.getUserAndBills();
  },
  methods: {
    addBill() {
      if (
        this.name &&
        this.amount &&
        this.category &&
        this.importance &&
        this.due_day &&
        this.recurrence
      ) {
        this.feedback = null;
        // create a slug
        this.slug = slugify(this.name, {
          replacement: "-",
          remove: /[$*_+~>()'"!\-:@]/g,
          lower: true
        });

        // adding a new bill data to the database
        db.collection("bills")
          .add({
            amount: this.amount,
            category: this.category,
            due_day: this.fbDate,
            name: this.name,
            importance: this.importance,
            recurrence: this.recurrence,
            user_id: this.admin.user_id,
            creationdate: this.fbCreationDate,
            paid_status: false,
            slug: this.slug
          })
          .then(() => {
            this.$router.push({ name: "admin-dashboard" });
            this.feedback = "Bill Successfully Added";
            this.name = "";
            this.due_day = "";
            this.category = "";
            this.amount = "";
            this.creationdate = "";
            this.recurrence = "";
            // this.bills.$forceUpdate();
          });
      } else {
        this.feedback = "You must complete all fields!";
      }
    },
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
              this.bills.push(bill);
            }
          });
        });
      });
    },
    convertDate(timestamp) {
      let date = timestamp.toDate();
      let mm = date.getMonth() + 1;
      let dd = date.getDate();
      let yyyy = date.getFullYear();

      date = mm + "/" + dd + "/" + yyyy;
      return date;
    }
  },
  computed: {
    fbCreationDate() {
      const date = new Date();
      // console.log(date);
      return date;
    },
    // Convert Date String to Firebase Timestamp
    fbDate() {
      const date = new Date(this.due_day);
      // console.log(date);
      return date;
    }
  }
};
</script>

<style>
h1.dashboard-header {
  color: var(--prime);
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  font-size: 28px;
}
</style>
