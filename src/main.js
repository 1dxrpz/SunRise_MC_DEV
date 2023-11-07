import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './axios.js';
//import PerfectScrollbar from 'vue3-perfect-scrollbar';
//import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';

createApp(App)
	.use(router)
	.mount('#app');

