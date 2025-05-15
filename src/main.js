import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import App from './App.vue'
import router from './router'
import './assets/global.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, {
    autoClose: 3000, // Toast auto-close duration in milliseconds
});

app.mount('#app')
