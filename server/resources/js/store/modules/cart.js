import HTTP from '@/http';
import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    products: []
  },
  actions: {
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
    getCartLength(state) {
      return state.products.reduce((accumulator, currentValue) => accumulator + (currentValue.quantity), 0)
    }
  },
  mutations: {
    addToCart(state, product, vm) {
      state.products.push(product);
    },
    updateCart(state, product) {
      if (product.quantity >= 1) {
        const product_index = state.products.findIndex(obj => obj.id === product.id);
        state.products[product_index].quantity = product.quantity;
      }
    },
    removeFromCart(state, product) {
      state.products.splice(state.products.indexOf(product), 1);
    }
  }
};
