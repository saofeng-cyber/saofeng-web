import { createApp } from 'vue';
import { usePinia } from '@/store';
import App from './App.vue';
import router from './router';
import { createRouterGuards } from './router/guards';
import 'virtual:svg-icons-register';
import './styles/tailwindcss.css';
import { VueDraggable } from 'vue-draggable-plus';
import { initDirectives } from './directives';
// 通用字体
import 'vfonts/Lato.css';
// 等宽字体
import 'vfonts/FiraCode.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const app = createApp(App);
initDirectives(app);
usePinia(app);
createRouterGuards(router);
app.use(router);
app.use(VueSweetalert2);
app.component('Draggable', VueDraggable);
app.mount('#app');
