import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/goods',
  },
  {
    path: '/goods',
    name: 'goods',
    component: () => import('../components/goods/GoodsVue')
  },
  {
    path: '/ratings',
    name: 'ratings',
    component: () => import('../components/ratings/RatingsVue')
  },
  {
    path: '/seller',
    name: 'seller',
    component: () => import('../components/seller/SellerVue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass:'active'
})

export default router
