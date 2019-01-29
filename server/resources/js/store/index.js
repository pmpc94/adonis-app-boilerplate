import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import cart from './modules/shop/cart';
import authentication from './modules/admin/authentication';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: false,
  state: {
    baseUrl: '/api'
  },
  modules: {
    cart,
    authentication
  },
  plugins: [
    createPersistedState()
  ]
});
