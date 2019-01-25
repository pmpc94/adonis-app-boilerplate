import HTTP from '@/http';
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
      product.hasOwnProperty('quantity') === true ? '' : product['quantity'] = 1;
      const product_index = state.products.findIndex(obj => obj.id === product.id);
      product_index === -1 ? state.products.push(product) : state.products[product_index].quantity += product.quantity;
    },
    update(state, product) {
        const product_index = state.products.findIndex(obj => obj.id === product.id);
        state.products[product_index].quantity = product.quantity;
    },
    remove(state, product) {
      state.products.splice(state.products.indexOf(product), 1);
    },
    empty(state) {
      state.products = [];
    }
  },
  actions: {
    addToCart({ commit }, product) {
      commit('add', product);
    },
    updateCart({ commit }, product) {
      commit('update', product);
    },
    removeFromCart({ commit }, product) {
      commit('remove', product);
    },
    emptyCart({ commit }) {
      commit('empty');
    }
  },
};
