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
    add(state, product) {
      product.index === -1 ? state.products.push(product.obj) : state.products[product.index].quantity += product.obj.quantity;
    },
    update(state, product) {
      state.products[product.index].quantity = product.quantity;
    },
    remove(state, product) {
      state.products.splice(state.products.indexOf(product), 1);
    },
    empty(state) {
      state.products = [];
    }
  },
  actions: {
    addToCart({ commit, state }, product) {
      product.hasOwnProperty('quantity') === true ? '' : product['quantity'] = 1;
      const product_index = state.products.findIndex(obj => obj.id === product.id);
      commit('add', { obj: product, index: product_index });
    },
    updateCart({ commit, state }, product) {
      const product_index = state.products.findIndex(obj => obj.id === product.id);
      commit('update', { index: product_index, quantity: product.quantity });
    },
    removeFromCart({ commit }, product) {
      commit('remove', product);
    },
    emptyCart({ commit }) {
      commit('empty');
    }
  },
};
