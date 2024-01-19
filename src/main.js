import { createApp } from 'vue';
import Toast from 'vue-toastification';
import { createPinia } from 'pinia';
import 'vue-toastification/dist/index.css';
import './assets/style.css';
import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();
app.use(Toast);
app.use(pinia);
app.mount('#app');









