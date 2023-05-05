<template>
  <div class="admin-layout">
    <AdminSidebar />
    <div class="admin-layout__content">
      <AdminNavbar />
      <div class="admin-layout__main">
        <slot />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import AdminNavbar from "@/components/AdminNavbar.vue";
import AdminSidebar from "@/components/AdminSidebar.vue";

export default {
  name: "AdminLayout",
  components: {
    AdminNavbar,
    AdminSidebar,
  },
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
}

.admin-layout__content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.admin-layout__main {
  flex: 1;
  padding: 20px;
}
</style>
