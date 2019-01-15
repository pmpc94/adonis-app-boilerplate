import HTTP from '@/http';

export default {
  namespaced: true,
  state: {
    products: []
  },
  getters: {

  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    }
  },
  actions: {
    fetchProducts({ commit }) {
      return HTTP().get('/products')
      .then(({ data }) => {
        commit('setProducts', data);
      });
    }
  }
};
