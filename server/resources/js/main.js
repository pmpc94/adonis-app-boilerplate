import Vue from 'vue'
// Docs: https://github.com/axios/axios
import axios from 'axios'
// Docs: https://baianat.github.io/vee-validate/
import VeeValidate from 'vee-validate'
import App from '@/components/layout/App'
import router from '@/router'
import components from '@/components'
import store from '@/store'
import Vuetify from 'vuetify'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart } from '@fortawesome/pro-solid-svg-icons'

library.add(faShoppingCart)
Vue.component('font-awesome-icon', FontAwesomeIcon)
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
  data: {
    showModal: false
  },
  router,
  store,
  components: { App },
  template: '<App/>'
})
