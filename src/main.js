import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import elment from 'element-plus'
import 'element-plus/theme-chalk/index.css';

import Base from './components/Base.vue'

import 'animate.css'

const app = createApp(App)

app.component('Base',Base)
app.use(elment).use(router).mount('#app')
