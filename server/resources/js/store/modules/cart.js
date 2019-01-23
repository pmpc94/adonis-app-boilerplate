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
      return state.products.length;
    }
  },
  mutations: {
    addToCart(state, product) {
      state.products.push(product);
      // this.$cookies.set('carLength', state.products.length, 1)
      // this.$cookies.set('carProducts', state.products, 1)
    },
    updateCart(state, product) {
      if (product.quantity >= 1) {
        const product_index = state.products.findIndex(obj => obj.id === product.id);
        state.products[product_index].quantity = product.quantity;
        console.log("PROD", product.quantity)
        console.log("PROD QUANTITY", state.products[product_index].quantity )
      }
    },
    removeFromCart(state, product) {
      console.log("REMOVE", product)
      state.products.splice(state.products.indexOf(product), 1);
    }
  }
};
