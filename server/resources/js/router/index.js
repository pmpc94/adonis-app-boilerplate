import Vue from 'vue'
import Router from 'vue-router'
import Shop from '@/components/pages/shop/Shop'
import Product from '@/components/pages/shop/Product'
import Cart from '@/components/pages/shop/Cart'
import Checkout from '@/components/pages/shop/Checkout'
import ThankYou from '@/components/pages/shop/ThankYou'
import Error from '@/components/pages/shop/Error'
import SecretPage from '@/components/pages/shop/SecretPage'
import Login from '@/components/pages/admin/Login'
import VendorProducts from '@/components/pages/admin/VendorProducts'

Vue.use(Router)
//
export default new Router({
  mode: 'history', // use HTML5 history instead of hashes
  routes: [
    // SHOP
    {
      path: '/',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/product/:slug',
      name: 'Product',
      component: Product
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout
    },
    {
      path: '/thank-you',
      name: 'ThankYou',
      component: ThankYou
    },
    {
      path: '/error',
      name: 'Error',
      component: Error
    },
    {
      path: '/404',
      name: 'SecretPage',
      component: SecretPage
    },
    {
      path: '*',
      redirect: '/404'
    },
    // BACK OFFICE
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/products',
      name: 'VendorProducts',
      component: VendorProducts
    },
  ]
})
