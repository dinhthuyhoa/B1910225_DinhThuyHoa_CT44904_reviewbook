<template>
  <nav class="nav flex-column">
    <router-link class="nav-link" :to="{ name: 'users' }" active-class="active">
      Users
    </router-link>
    <router-link class="nav-link" :to="{ name: 'books' }" active-class="active">
      Books
    </router-link>
    <router-link class="nav-link" :to="{ name: 'reviews' }" active-class="active">
      Review
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'AdminSidebar'
}
</script>

<style scoped>
.nav {
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
}

.nav-link {
  color: #6c757d;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  margin-bottom: 0.3rem;
  transition: background-color 0.2s ease-in-out;
}

.nav-link.active,
.nav-link:hover {
  background-color: #007bff;
  color: #fff;
}
</style>
