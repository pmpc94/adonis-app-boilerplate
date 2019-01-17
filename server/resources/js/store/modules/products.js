import HTTP from '@/http';
import router from '@/router'

export default {
  namespaced: true,
  state: {
    products: [],
    currentProduct: '',
    activeIndex: 1,
    categories: [],
    currentCategory: 'all'
  },
  getters: {

  },
  mutations: {
    setProducts(state, products) {
      state.products = products.data.data === undefined ? products : products.data; //ugly line of code :-(
    },
    setProduct(state, product) {
      state.currentProduct = product.data;
    },
    setCategoriesCount(state, categories) {
      state.categories = categories.data;
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
      return HTTP().get(`/products?page=${id}&category=${state.currentCategory}`)
      .then(({ data }) => {
        state.activeIndex = id;
        commit('setProducts', data);
      })
      .catch(() => {
        console.log('fetchPage failed.')
      });
    },
    fetchCategoriesCount({ commit }) {
      return HTTP().get('/categoriesCount')
      .then(({ data }) => {
        commit('setCategoriesCount', data);
      })
      .catch(() => {
        console.log('fetchCategoriesCount failed.')
      });
    },
    fetchProductsByCategory({ commit, state }, category) {
      return HTTP().get(`/categoriesFilter?name=${category.name}`)
      .then(({ data }) => {
        state.currentCategory = category.name;
        commit('setProducts', data);
      })
      .catch(() => {
        console.log('fetchProductsByCategory failed.')
      });
    }
  }
};
