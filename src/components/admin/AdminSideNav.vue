<template>
  <div class="admin-side-nav">
    <p>Admin Side Nav</p>
    <hr />
    <ul>
      <li><router-link to="/admin/dashboard">Dashboard</router-link></li>
      <li><router-link to="/admin/add-bill">Add Bill</router-link></li>
      <li><router-link to="/admin/edit-bill">Edit Bill</router-link></li>
      <li><router-link to="/admin/settings">Settings</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "admin-side-nav"
};
</script>

<style>
.admin-side-nav {
  background: var(--lgray);
}
.admin-side-nav ul {
  padding: 0;
  list-style: none;
  text-align: center;
}
.admin-side-nav li {
  padding: 30px 0;
}
.admin-side-nav li a {
  color: var(--gray);
  font-size: 16px;
}
</style>
