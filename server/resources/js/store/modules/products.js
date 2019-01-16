import HTTP from '@/http';
import router from '@/router'

export default {
  namespaced: true,
  state: {
    products: [],
    currentProduct: ''
  },
  getters: {

  },
  mutations: {
    setProducts(state, products) {
      state.products = products.data;
    },
    setProduct(state, product) {
      state.currentProduct = product.data;
      console.log("currentProduct", currentProduct)
    }
  },
  actions: {
    fetchProducts({ commit }) {
      return HTTP().get('/products')
      .then(({ data }) => {
        commit('setProducts', data);
      })
      .catch(() => {
        console.log("Error fetching the products.")
      });
    },
    fetchProduct({ commit, state }, id) {
      return HTTP().get(`/products/${id}`)
      .then(({ data }) => {
        commit('setProduct', data);
      })
      .catch((e) => {
        console.log("Error fetching the products.", e)
      });
    }
  }
};
