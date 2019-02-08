import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import authentication from './modules/admin/authentication';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: false,
  state: {
    baseUrl: '/api'
  },
  modules: {
    authentication
  },
  plugins: [
    createPersistedState()
  ]
});
