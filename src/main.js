import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/styles/common.less"
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css'
import "./assets/iconfont/iconfont.js"
import axios from "axios"
import animate from 'animate.css'
import lazyPlugin from 'vue3-lazy'
createApp(App).use(store).use(router).use(ElementPlus).use(animate).use(lazyPlugin, {loading: require('@/assets/image/loading-bars.svg')}).mount('#app')
axios.defaults.withCredentials = true;
