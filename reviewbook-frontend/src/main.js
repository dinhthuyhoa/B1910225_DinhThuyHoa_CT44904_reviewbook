import { createApp } from 'vue';
import App from './App.vue';
import "bootstrap/dist/css/bootstrap.min.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import 'bootstrap/dist/js/bootstrap';
import './assets/main.css';
import router from './router';
import 'vue-awesome-sidebar/dist/vue-awesome-sidebar.css'

library.add(fas)
createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app');
