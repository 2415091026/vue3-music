import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/styles/common.less"
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css'
import "./assets/iconfont/iconfont.js"
import axios from "axios"
import animated from 'animate.css'
createApp(App).use(store).use(router).use(ElementPlus).use(animated).mount('#app')
axios.defaults.withCredentials = true;
