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
  <div id="app">
    <router-view />
  </div>
</template>
