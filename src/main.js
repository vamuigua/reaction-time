import { createApp } from 'vue';
import App from './App.vue';
import wb from "./registerServiceWorker";

const app = createApp(App);
app.config.globalProperties.workbox = wb;
app.mount('#app');