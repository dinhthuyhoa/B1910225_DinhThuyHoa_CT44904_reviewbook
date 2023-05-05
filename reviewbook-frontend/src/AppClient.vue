<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import Login from "@/components/Login.vue";
import Home from "@/views/Home.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
    Login,
    Home,
  },
};
</script>

<template>
  <div>
    <AppHeader />
    <div class="">
      <div class="container-fluid p-0">
        <router-view />
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<style>
.page {
  max-width: 400px;
  margin: auto;
}

.hidden {
  display: none;
}
</style>
