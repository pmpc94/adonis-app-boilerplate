import Vue from 'vue';
import Vuex from 'vuex';

import cart from './modules/cart';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: false,
  state: {
    baseUrl: '/api'
  },
  modules: {
    cart
  }
});
