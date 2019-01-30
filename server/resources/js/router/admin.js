import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/pages/admin/Login'
import Menu from '@/components/partials/admin/Menu'
import Products from '@/components/pages/admin/Products'
import Product from '@/components/pages/admin/Product'
import ProductAdd from '@/components/pages/admin/ProductAdd'
import Orders from '@/components/pages/admin/Orders'
import Settings from '@/components/pages/admin/Settings'

Vue.use(Router)
//
export default new Router({
  mode: 'history', // use HTML5 history instead of hashes
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/product/:id',
      name: 'Product',
      component: Product
    },
    {
      path: '/product',
      name: 'ProductAdd',
      component: ProductAdd
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    }
  ]
})
