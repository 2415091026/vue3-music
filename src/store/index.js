import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// 导入三个模块

import user from './modules/user'
import utils from "./modules/utils"
import music from "./modules/music"
import search from "./modules/search"
export default createStore({
  modules: {
    music,
    user,
    utils,
    search
  },
  plugins: [createPersistedState({
    key: 'music',
    path: ['user', 'cart']
  })]
})
