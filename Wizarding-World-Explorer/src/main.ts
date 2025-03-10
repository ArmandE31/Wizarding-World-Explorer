import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config';


const app = createApp(App);
app.use(createPinia());
app.use(VueQueryPlugin);
app.use(PrimeVue);
app.use(router);
app.mount('#app');
