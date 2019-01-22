import HTTP from '@/http';

export default {
  namespaced: true,
  state: {
    products: []
  },
  actions: {
    //TODO - STRIPE PAYMENTS
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
      // TODO - product['count'] = count
      state.products.push(product);
    },
    removeFromCart(state, product) {
      state.products.splice(state.products.indexOf(product), 1);
    }
  }
};
