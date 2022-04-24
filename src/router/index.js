import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    redirect: '/main/find'
  },
  {
    path: '/main',
    component: () => import("../views/main/index"),
    children: [
      {
        path: '/main/find',
        component: () => import("../views/findMusic/index"),
      },
      {
        path: '/main/find/dailySongs',
        component: () => import("../views/dailySongs/index")
      },
      {
        path: '/main/find/songList',
        component:() => import("../views/songList/index")
      },
      {
        path: '/main/test',
        component: () => import("../views/test/test")
      },
      {
        path: '/main/search',
        component: () => import("../views/search/cpns/search-list")
      },
      {
        path: '/main/userinfo',
        component: () => import('../views/userInfo/index')
      },
      {
        path: '/main/userinfo/madification',
        component: () => import ("../views/userInfo/cpns/modification")
      },
      {
        path: '/main/songerInfo',
        component: () => import('../views/songer/songerInfo')
       }
    ]
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
