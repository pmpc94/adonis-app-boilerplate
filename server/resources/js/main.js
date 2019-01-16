import Vue from 'vue'
// Docs: https://github.com/axios/axios
import axios from 'axios'
// Docs: https://github.com/alfhen/vue-cookie
import VueCookie from 'vue-cookie'
// Docs: https://baianat.github.io/vee-validate/
import VeeValidate from 'vee-validate'
import App from '@/components/layout/App'
import router from '@/router'
import components from '@/components'
import store from '@/store'
import vueSlider from 'vue-slider-component'

Vue.use(VueCookie)
Vue.use(components)
Vue.use(VeeValidate)

Vue.config.productionTip = false
window.axios = axios
window.axios.defaults.headers.common = { 'X-Requested-With': 'XMLHttpRequest' }
window.axios.defaults.baseURL = `http://127.0.0.1:3333/`
/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */
let token = document.querySelector('[name="csrf-token"]')
if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content
} else {
  console.error(
    'CSRF token not found: https://adonisjs.com/docs/4.1/csrf-protection'
  )
}

new Vue({
  el: '#app',
  data: () => ({
    showModal: false,
    count: 0
  }),
  router,
  store,
  components: { App },
  template: '<App/>',
  methods: {
    recount() {
      try {
        let cart = JSON.parse(this.$cookie.get('cart'))
        this.count = cart.products.reduce((t, p) => {
          return t + p.quantity
        }, 0)
      } catch (e) {
        this.count = 0
      }
    }
  }
})
