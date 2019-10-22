<template>
  <div class="admin-add-bill">
    <h1 class="dashboard-header">Add Bill</h1>
    <div class="narrow">
      <form class="add-bill-form" @submit.prevent="addBill">
        <label>Bill Name:</label>
        <input type="text" placeholder="Rent" v-model="name" />
        <label>Bill Due Date:</label>
        <input type="date" v-model="due_day" name="dueday" />
        <label>Bill Amount:</label>
        <input
          type="number"
          step="0.01"
          placeholder="Bill Amount"
          v-model="amount"
        />
        <label>Bill Category</label>
        <select required v-model="category">
          <option disabled value=" ">Please Choose</option>
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
        <label>How Important Is This Bill To You?</label>
        <select required v-model="importance">
          <option disabled value=" ">Please Choose</option>
          <option value="1">Very</option>
          <option value="2">Medium</option>
          <option value="3">Low</option>
        </select>
        <!-- <label>Bill Recurrence</label
        ><select required v-model="recurrence">
          <option value=" " disabled>Please Choose</option>
          <option value="weekly">Weekly</option>
          <option value="bi-weekly">Bi-weekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="annually">Annually</option>
          <option value="one-time">One-Time</option>
        </select> -->
        <input
          type="submit"
          value="Add Bill"
          class="btn prime modal"
          uk-toggle="target: #toggle-another-bill-modal"
        />

        <router-link to="/admin/dashboard" class="link">Cancel</router-link>
      </form>

      <div
        id="toggle-another-bill-modal"
        class="add-bill-modal uk-flex-top"
        v-if="
          this.name &&
            this.amount &&
            this.category &&
            this.importance &&
            this.due_day
        "
        uk-modal
      >
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
          <h2 class="uk-modal-title">
            Bill Successfully Added! Would you like to add another bill?
          </h2>
          <a
            class="btn prime add-another uk-modal-close"
            @click="addAnotherBill"
            >Add Another Bill</a
          >
          <router-link to="/admin/dashboard" class="btn secon uk-modal-close"
            >Dashboard</router-link
          >
          <!-- <a class="uk-modal-close-default" href="" uk-close></a> -->
        </div>
      </div>

      <p class="text-terti uk-text-center" v-if="feedback">{{ feedback }}</p>
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
      // recurrence: null,
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
        this.due_day
        // this.recurrence
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
            // recurrence: this.recurrence,
            user_id: this.admin.user_id,
            creationdate: this.fbCreationDate,
            paid_status: false,
            slug: this.slug
          })
          .then(() => {
            // this.$router.push({ name: "admin-dashboard" });
            // this.name = "";
            // this.due_day = "";
            // this.category = "";
            // this.amount = "";
            // this.creationdate = "";
            // this.recurrence = "";
            // this.bills.$forceUpdate();
          });
      } else {
        this.feedback = "You must complete all fields!";
      }
    },
    addAnotherBill() {
      this.name = "";
      this.due_day = "";
      this.category = "";
      this.amount = "";
      this.creationdate = "";
      // this.recurrence = "";
      this.importance = "";
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
          .where("user_id", "==", this.admin.user_id);
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
