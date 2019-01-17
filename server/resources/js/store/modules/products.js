import HTTP from '@/http';
import router from '@/router'

export default {
  namespaced: true,
  state: {
    products: [],
    currentProduct: '',
    activePage: 1,
    categories: [],
    currentCategory: '',
    pricerange: { min: 0, max: 0},
    nameOrder: undefined,
    priceOrder: undefined
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
    },
    setCategory(state, category) {
      state.activePage = 1;
      state.currentCategory = category.name;
    },
    setActivePage(state, id) {
      state.activePage = id;
    },
    showAll(state) {
      state.activePage = 1;
      state.currentCategory = '';
    }
  },
  actions: {
    fetchProducts({ commit, state }) {
      let query = '';
      if (state.currentCategory.length > 0)
        query += `&category=${state.currentCategory}`;
      if (state.nameOrder)
        query += `&order=${state.nameOrder}`;
      if (state.priceOrder) {
        query += `&price=${state.priceOrder}`;
      }
      return HTTP().get(`/products?page=${state.activePage}${query}`)
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
    fetchCategoriesCount({ commit }) {
      return HTTP().get('/categoriesCount')
      .then(({ data }) => {
        commit('setCategoriesCount', data);
      })
      .catch(() => {
        console.log('fetchCategoriesCount failed.')
      });
    }
  }
};
