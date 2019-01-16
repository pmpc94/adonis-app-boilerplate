import HTTP from '@/http';
import router from '@/router'

export default {
  namespaced: true,
  state: {
    products: [],
    currentProduct: null,
    activeIndex: 1
  },
  getters: {

  },
  mutations: {
    setProducts(state, products) {
      state.products = products.data;
    },
    setProduct(state, product) {
      state.currentProduct = product.data;
    }
  },
  actions: {
    fetchProducts({ commit }) {
      return HTTP().get('/products')
      .then(({ data }) => {
        commit('setProducts', data);
      })
      .catch(() => {
        console.log('fetchProducts failed.')
      });
    },
    fetchProduct({ commit, state }, id) {
      return HTTP().get(`/products/${id}`)
      .then(({ data }) => {
        commit('setProduct', data);
      })
      .catch(() => {
        console.log('fetchProduct failed.')
      });
    },
    fetchPage({ commit, state }, id) {
      return HTTP().get(`/products?page=${id}`)
      .then(({ data }) => {
        state.activeIndex = id;
        commit('setProducts', data);
      })
      .catch(() => {
        console.log('fetchPage failed.')
      });
    }
  }
};
