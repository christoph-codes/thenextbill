<template>
  <div class="admin-add-bill">
    <h1 class="page-header">Add Bill</h1>
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
      priority: null,
      recurrence: null,
      user_id: null,
      slug: null,
      feedback: null
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
    addBill() {
      if (
        this.name &&
        this.amount &&
        this.category &&
        this.priority &&
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
            due_day: this.due_day,
            name: this.name,
            priority: this.priority,
            recurrence: this.recurrence,
            user_id: this.admin.user_id,
            creationdate: this.fbCreationDate
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
            this.bills.$forceUpdate();
          });
      } else {
        this.feedback = "You must enter a Bill Name!";
      }
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
    }
  }
};
</script>
