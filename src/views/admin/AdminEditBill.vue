<template>
  <div v-if="bill" class="admin-edit-bill">
    <h1 class="dashboard-header">Edit {{ bill.name }}</h1>
    <div class="narrow">
      <form class="edit-bill-form" @submit.prevent="editBill">
        <label>Bill Name:</label>
        <input type="text" placeholder="Rent" v-model="bill.name" />
        <label>Bill Due Date:</label>
        <input type="date" v-if="convertedDate" v-model="newDate" />
        <!-- <input type="date" v-model="fbDate" /> -->
        <label>Bill Amount:</label>
        <input
          type="number"
          step="0.01"
          placeholder="Bill Amount"
          v-model="bill.amount"
        />
        <label>Bill Category</label>
        <select required v-model="bill.category">
          <option value="" disabled>Choose Bill Category</option>
          <option value="housing">Housing</option>
          <option value="food">Food</option>
          <option value="transportation">Transportation</option>
          <option value="utilities">Utilities</option>
          <option value="entertainment">Entertainment</option>
          <option value="misc">MISC</option>
        </select>
        <label>How Important Is This Bill To You?</label>
        <select required v-model="bill.importance">
          <option disabled value=" ">Please Choose</option>
          <option value="1">Very</option>
          <option value="2">Medium</option>
          <option value="3">Low</option>
        </select>

        <label>Bill Recurrence</label>
        <select required v-model="bill.recurrence">
          <option value="" disabled selected>Bill Recurrence</option>
          <option value="weekly">Weekly</option>
          <option value="bi-weekly">Bi-weekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="annually">Annually</option>
          <option value="one-time">One-Time</option>
        </select>

        <label>Has this bill been paid?</label>
        <select required v-model="bill.paid_status">
          <option disabled value=" ">Please Choose</option>
          <option :value="true">Yes</option>
          <option :value="false">No</option>
        </select>
        <input type="submit" value="Update Bill" class="btn prime" />
        <a uk-toggle="target: #delete-bill" class="link"
          ><i class="uk-icon-close"></i>Delete Bill</a
        >
        <div id="delete-bill" uk-modal class="uk-modal-full">
          <div class="uk-modal-dialog uk-modal-body">
            <div class="narrow">
              <h2 class="uk-modal-title">
                Are you sure you want to delete the bill {{ bill.name }}?
              </h2>
              <p>
                By clicking "Delete Bill" you fully understand that you will
                lose all historical data tied to this bill.
              </p>
              <a class="btn danger" href="" @click="deleteBill(bill.id)">
                Delete Bill</a
              >
              <a class="btn terti uk-modal-close" href="">Cancel</a>
              <button
                class="uk-modal-close-full uk-close-large"
                type="button"
                uk-close
              ></button>
            </div>
          </div>
        </div>
      </form>
      <p class="text-danger uk-text-center" v-if="feedback">{{ feedback }}</p>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init.js";
import firebase from "firebase";
import slugify from "slugify";

export default {
  name: "admin-edit-bill",
  data() {
    return {
      bill: {},
      feedback: null,
      newDate: null
    };
  },
  created() {
    this.getBill();
  },
  methods: {
    getBill() {
      // get current user
      let admin = firebase.auth().currentUser;
      // get current bill
      let bill = db
        .collection("bills")
        .where("slug", "==", this.$route.params.bill_slug);
      // check to see if user has rights to edit this bill
      if (admin) {
        bill.get().then(snapshot => {
          snapshot.forEach(doc => {
            // console.log(doc.data());
            this.bill = doc.data();
            this.bill.id = doc.id;
          });
        });
      }
    },
    editBill() {
      if (this.bill) {
        this.feedback = null;
        // create a slug
        this.bill.slug = slugify(this.bill.name, {
          replacement: "-",
          remove: /[$*_+~>()'"!\-:@]/g,
          lower: true
        });

        // let toTimestamp = this.newDate.getTime();
        // let dateIt = new Date(toTimestamp);
        // console.log(dateIt);

        // adding a new bill data to the database
        db.collection("bills")
          .doc(this.bill.id)
          .update({
            amount: this.bill.amount,
            category: this.bill.category,
            // due_day: this.fbDate,
            due_day: this.fbDate,
            name: this.bill.name,
            importance: this.bill.importance,
            recurrence: this.bill.recurrence,
            paid_status: this.bill.paid_status,
            slug: this.bill.slug
          })
          .then(() => {
            this.$router.push({ name: "admin-bills" });
            this.feedback = "Bill Successfully Updated";
          })
          .catch(err => {
            // console.log(err);
            this.feedback = err;
          });
      } else {
        this.feedback = "You must complete all fields!";
      }
    },
    deleteBill(id) {
      // console.log(id);
      db.collection("bills")
        .doc(id)
        .delete()
        .then(() => {
          this.$router.push({ name: "admin-bills" });
        });
    }
  },
  computed: {
    // Convert Date String to Firebase Timestamp
    fbDate() {
      const date = new Date(this.newDate);
      // console.log(date);
      return date;
    },
    //convert firebase date to date input format
    convertedDate() {
      // convert date to html format ---------------------------vvv
      if (!this.bill.due_day) return;
      let date = new Date(this.bill.due_day.seconds * 1000);

      let yyyy = date.getFullYear();
      let mm = ("0" + parseInt(date.getMonth() + 1)).toString().slice(-2);
      // let mm = date.getUTCMonth();
      let dd = ("0" + date.getDate()).slice(-2);
      // let dd = date.getUTCDate();

      date = yyyy + "-" + mm + "-" + dd;
      // eslint-disable-next-line
      this.newDate = date;
      return date;
    }
  }
};
</script>

<style>
.uk-modal-full .uk-modal-dialog {
  height: 100%;
  padding: 40vh 0;
  text-align: center;
}
</style>
