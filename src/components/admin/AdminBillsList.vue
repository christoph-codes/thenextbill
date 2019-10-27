<template>
    <div class="admin-bills-list">
        <div class="bills-table">
                    <table
                    class="uk-table uk-table-hover uk-table-responsive uk-table-divider"
                    >
                    <thead>
                        <tr>
                        <th class="list-hide"></th>
                        <th>Bill Name</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th class="list-hide">Category</th>
                        <!-- <th>Importance</th> -->
                        <!-- <th>Recurrence</th> -->
                        <th>Paid Status</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="bill in bills" :key="bill.id">
                        <td class="list-hide">
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
                        <td class="bold-table-data">{{ bill.name }}</td>
                        <td>${{ bill.amount }}</td>
                        <td>
                            <div v-if="typeof bill.due_day === 'object'">
                                {{ convertTimestamp(bill.due_day) }}
                            </div>
                        </td>
                        <td class="list-hide">
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
                        </td>
                        <!-- <td>{{ bill.recurrence }}</td> -->
                        <td v-if="!bill.paid_status">
                            <a
                            class="modal"
                            uk-toggle="target: #toggle-bill-modal"
                            @click="sendBill(bill)"
                            ><span
                                class="due-today-tag"
                                v-if="dueTodayCheck(bill.due_day)"
                                >Due Today »</span
                            ><span
                                class="past-due-tag"
                                v-else-if="pastDueCheck(bill.due_day)"
                                >PAST DUE »</span
                            ><span class="paid_btn" v-else>Mark as Paid »</span></a
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
                            ><img src="@/assets/edit-icon.svg"/></router-link
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
                <div class="add-bill-card">
                    <div class="add-bill-content">
                        <h3 class="add-bill-title">
                        <router-link to="/admin/add-bill">
                            [+] Add Bill
                        </router-link>
                        </h3>
                    </div>
                </div>
    </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";

export default {
    name: "admin-bills-list",
    data() {
        return {
            admin: {},
            bills: [],
            feedback: null,
            selectedBill: "",
            firstTime: false
        }
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
}
</script>

<style scoped>
.add-to-bills {
  text-align: center;
  padding: 20px 0;
  background: var(--lgray);
  transition: 0.3s;
  cursor: pointer;
  position: relative;
}
.add-to-bills h3 {
  margin: 0;
}
.add-to-bills h3 a {
  text-decoration: none;
  color: var(--gray);
  text-transform: uppercase;
  font-size: 18px;
  font-weight: bold;
}
.add-to-bills h3 a:hover {
  color: var(--prime);
}
.add-to-bills:hover {
  background: white;
  box-shadow: 0 0 20px -15px;
}
/*----------- List View -------*/
.uk-table th {
  color: var(--gray);
  padding: 6px 12px;
  font-size: 14px;
}
.uk-table td {
  padding: 10px;
  font-size: 12px;
  vertical-align: middle;
}
td.bold-table-data {
  font-weight: bold;
  color: var(--prime);
}
tbody tr:first-child {
  background: var(--wsecon);
}
.uk-table-hover > tr:hover,
.uk-table-hover tbody tr:hover {
  background: #e5e6f0;
}
.add-bill-card {
  background: white;
  box-shadow: 0 0 30px -20px var(--gray);
  text-align: center;
}
.add-bill-content .add-bill-title {
  text-transform: uppercase;
  font-size: 21px;
  font-weight: bold;
  margin: 0;
}
.add-bill-title a {
    position: relative;
    color: var(--lgray);
    cursor: pointer;
    text-decoration: none;
    padding: 10px 0;
    display: block;
}
.add-bill-title a:hover {
  position: relative;
  color: var(--gray);
  cursor: pointer;
}
span.paid_btn {
    background: var(--secon);
    padding: 5px 10px;
    border-radius: 5px;
    color: var(--prime);
    font-weight: bold;
}
span.past-due-tag {
    padding: 5px 10px;
    background: var(--danger);
    color: white;
    border-radius: 5px;
    font-weight: bolder;
}
span.due-today-tag {
    padding: 5px 10px;
    background: var(--wsecon);
    color: var(--prime);
    border-radius: 5px;
    font-weight: bolder;
    border: var(--secon) solid 2px;
}
.category-tag {
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
}
img.importance_icon {
  max-height: 23px;
}
@media(max-width: 1200px) {
    .list-hide {
        display: none;
    }
}
</style>