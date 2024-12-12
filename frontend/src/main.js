import { createApp } from 'vue';
import App from './App.vue';
import {createPinia} from 'pinia'
import components from './components/global';
import Router from './router/index';

import "@/assets/css/tailwind.css";
import "@/assets/global.less";

import naive from 'naive-ui'

const app = createApp(App)
const pina = createPinia()
app.config.productionTip = false

for (const i in components) {
  app.component(i, components[i])
}

app.use(Router).use(pina).use(naive).mount('#app')
