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
      }
    ]
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
