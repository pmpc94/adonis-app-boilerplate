import Vue from 'vue';
import Vuex from 'vuex';

import orders from './modules/orders';
import products from './modules/products';
import authentication from './modules/authentication';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    baseUrl: '/api'
  },
  modules: {
    orders,
    products,
    authentication
  }
});
