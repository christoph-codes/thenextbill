<template>
    <div class="admin-dashboard">
        <AdminNav />
        <h1 class="page-header">This is the dashboard</h1>
    </div>
</template>

<script>
import AdminNav from "@/components/admin/AdminNav.vue"

export default {
    name: "admin-dashboard",
    components: {
        AdminNav
    }
}
</script>