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
    add(state, { product, quantity }) {
      const index = state.products.findIndex(obj => obj.id === product.id);
      index === -1 ? product.quantity = 1 : '';
      index === -1 ? state.products.push(product) : state.products[index].quantity += quantity;
    },
    update(state, { product, quantity }) {
      const index = state.products.findIndex(obj => obj.id === product.id);
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
    addToCart({ commit, state }, product, quantity) {
      commit('add', product, quantity);
    },
    updateCart({ commit, state }, product, quantity) {
      commit('update', product, quantity);
    },
    removeFromCart({ commit }, product) {
      commit('remove', product);
    },
    emptyCart({ commit }) {
      commit('empty');
    }
  },
};
