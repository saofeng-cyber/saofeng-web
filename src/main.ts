import { createApp } from 'vue';
import { usePinia } from '@/store';
import App from './App.vue';
import router from './router';
import { createRouterGuards } from './router/guards';
import 'virtual:svg-icons-register';
import './styles/tailwindcss.css';
// 通用字体
import 'vfonts/Lato.css';
// 等宽字体
import 'vfonts/FiraCode.css';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const app = createApp(App);
usePinia(app);
createRouterGuards(router);
app.use(router);
app.use(VueSweetalert2);
app.mount('#app');
