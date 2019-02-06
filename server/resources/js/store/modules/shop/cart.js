import HTTP from '@/http/shop';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    products: []
  },
  getters: {
    products(state) {
      return state.products;
    },
    cartLength(state) {
      return state.products.reduce((accumulator, currentValue) => accumulator + (currentValue.quantity), 0)
    }
  },
  mutations: {
    add(state, { product, quantity, index }) {
      Vue.set(state.products, index, state.products[index]);
    },
    update(state, { product, quantity, index }) {
      state.products[index].quantity = quantity;
    },
    remove(state, product) {
      state.products.splice(state.products.indexOf(product), 1);
    },
    empty(state) {
      state.products = [];
    }
  },
  actions: {
    addToCart({ commit, state }, payload) {
      const index = state.products.findIndex(obj => obj.id === payload.product.id);
      index === -1 ? payload.product.quantity = quantity : '';
      index === -1 ? state.products.push(product) : state.products[index].quantity += payload.quantity;
      payload.index = index;
      payload.index !== -1 ? commit('add', payload) : '';
    },
    updateCart({ commit, state }, payload) {
      const index = state.products.findIndex(obj => obj.id === payload.product.id);
      payload.index = index;
      commit('update', payload);
    },
    removeFromCart({ commit }, payload) {
      commit('remove', payload);
    },
    emptyCart({ commit }) {
      commit('empty');
    }
  },
};
