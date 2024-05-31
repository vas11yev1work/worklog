import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import './assets/index.css';
import dayjs from 'dayjs';
import ru from 'dayjs/locale/ru';

dayjs.locale(ru);

const pinia = createPinia();

createApp(App).use(pinia).mount('#app');
