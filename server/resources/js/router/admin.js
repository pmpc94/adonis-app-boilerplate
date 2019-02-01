import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/pages/admin/Login'
import Menu from '@/components/partials/admin/Menu'
import Products from '@/components/pages/admin/Products'
import ProductEdit from '@/components/pages/admin/ProductEdit'
import ProductAdd from '@/components/pages/admin/ProductAdd'
import Orders from '@/components/pages/admin/Orders'
import Order from '@/components/pages/admin/Order'
import PasswordReset from '@/components/pages/admin/PasswordReset'
import store from '@/store/admin'

Vue.use(Router)
const ifAuthenticated = (to, from, next) => {
  if (store.getters['authentication/isLoggedIn']) {
    next();
    return;
  }
  next({ name: 'Login' })
}
//
export default new Router({
  mode: 'history', // use HTML5 history instead of hashes
  routes: [
    {
      path: '/menu',
      name: 'Menu',
      component: Menu,
      children: [
        {
          path: '/products',
          name: 'Products',
          component: Products,
          beforeEnter: ifAuthenticated
        },
        {
          path: '/product-section/:id',
          name: 'ProductEdit',
          component: ProductEdit,
          beforeEnter: ifAuthenticated
        },
        {
          path: '/product-section',
          name: 'ProductAdd',
          component: ProductAdd,
          beforeEnter: ifAuthenticated
        },
        {
          path: '/orders',
          name: 'Orders',
          component: Orders,
          beforeEnter: ifAuthenticated
        },
        {
          path: '/order/:id',
          name: 'Order',
          component: Order,
          beforeEnter: ifAuthenticated
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/passwordReset/:email/:token',
      name: 'PasswordReset',
      component: PasswordReset
    }
  ]
})
