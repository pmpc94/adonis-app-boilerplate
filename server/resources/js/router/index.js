import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import About from '@/components/pages/About'
import Arrivals from '@/components/pages/Arrivals'
import Cart from '@/components/pages/Cart'
import Catalogue from '@/components/pages/Catalogue'
import Checkout from '@/components/pages/Checkout'
import Contact from '@/components/pages/Contact'
import Shop from '@/components/pages/Shop'
import ThankYou from '@/components/pages/ThankYou'

Vue.use(Router)
//
export default new Router({
  mode: 'history', // use HTML5 history instead of hashes
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/catalogue',
      name: 'Catalogue',
      component: Catalogue
    },
    {
      path: '/arrivals',
      name: 'Arrivals',
      component: Arrivals
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/thank-you',
      name: 'ThankYou',
      component: ThankYou
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
      path: '*',
      redirect: '/'
    }
  ]
})
