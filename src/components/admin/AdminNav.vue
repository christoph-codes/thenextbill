<template>
    <div class="admin-nav">
        <h1 class="page-header">Admin Navigation</h1>
        <a class="link" @click="logout">Logout</a>
    </div>
</template>

<script>
import firebase from "firebase";

export default {
    name: "admin-nav",
    methods: {
        logout() {
            firebase.auth().signOut().then(() => {
                this.$router.push({ name: "login" });
            })
        }
    }
}
</script>