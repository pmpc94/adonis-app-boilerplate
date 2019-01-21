import HTTP from '@/http';
import router from '@/router'

export default {
  namespaced: true,
  state: {
    currentProduct: '',
    priceRange: [0, 30],
    priceRangeMin: 0,
    priceRangeMax: 100,
    sliderOptions: {
      processStyle: {
        backgroundColor: '#7971ea'
      },
      sliderStyle: [{
        backgroundColor: '#7971ea'
      },
      {
        backgroundColor: '#7971ea'
      }
    ],
    tooltipStyle: [
      {
        backgroundColor: '#7971ea',
        borderColor: '#7971ea'
      },
      {
        backgroundColor: '#7971ea',
        borderColor: '#7971ea'
      }
    ]
  }
},
getters: {
},
mutations: {
    setProduct(state, product) {
      state.currentProduct = product.data;
    },
    setPriceRanges(state, product) {
      state.priceRangeMin = product.min_price;
      state.priceRangeMax = product.max_price;
    }
  },
  actions: {
    fetchPriceRange({ commit }) {
      return HTTP().get('/priceRange')
      .then(({ data }) => {
        commit('setPriceRanges', data);
      })
      .catch(() => {
        console.log('fetchPriceRange failed.')
      });
    }
  }
};
