import 'preline/preline'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'aos/dist/aos.css'
import 'glightbox/dist/css/glightbox.min.css'
import '@/assets/css/icons.css'
import '@/assets/css/style.css'
import axios from 'axios';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import AOS from 'aos'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {createApp} from 'vue'
import {createPinia} from 'pinia'

AOS.init()

import App from './App.vue'
import router from './router'

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.config.globalProperties.$axios = axios;
app.use(createPinia())
app.use(router)
app.use(ElementPlus)


app.mount('#app')
