import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import BooksStore from '../views/BooksStore.vue'
import Cart from '../views/Cart.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Books Store',
    component: BooksStore
  },
  {
    path: '/my-cart',
    name: 'My Cart',
    component: Cart
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
