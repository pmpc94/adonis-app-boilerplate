import Vue from 'vue'
import Router from 'vue-router'
import Shop from '@/components/pages/Shop'
import Product from '@/components/pages/Product'
import Cart from '@/components/pages/Cart'
import Checkout from '@/components/pages/Checkout'
import ThankYou from '@/components/pages/ThankYou'
import Error from '@/components/pages/Error'
import SecretPage from '@/components/pages/SecretPage'

Vue.use(Router)
//
export default new Router({
  mode: 'history', // use HTML5 history instead of hashes
  routes: [
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
    }
  ]
})
