import Vue from 'vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate'
// Docs: https://github.com/axios/axios
import axios from 'axios'
import Admin from '@/components/layout/Admin'
import router from '@/router/admin'
import store from '@/store/admin'

Vue.use(Vuetify, {
  iconfont: 'md'
})
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
  el: '#admin',
  router,
  store,
  components: { Admin },
  template: '<Admin/>'
})
