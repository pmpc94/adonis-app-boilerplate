import router from '@/router/admin';
import HTTP from '@/http/admin';

export default {
  namespaced: true,
  state: {
    loginEmail: '',
    loginPassword: '',
    loginError: null,
    token: null
  },

  getters: {
    isLoggedIn(state) {
      return !!state.token;
    },
    email(state) {
      return state.loginEmail;
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setLoginError(state, error) {
      state.loginError = error;
    },
    setLoginEmail(state, email) {
      state.loginEmail = email;
    },
    setLoginPassword(state, password) {
      state.loginPassword = password;
    }
  },
  actions: {
    logout({ commit }) {
      commit('setToken', null);
      router.push('/login');
    },
    login({ commit, state }) {
      commit('setLoginError', null);

      return HTTP().post('/login', {
        email: state.loginEmail,
        password: state.loginPassword,
      })
      .then(({ data }) => {
        commit('setToken', data.data.token);
        router.push('/products');
      })
      .catch(() => {
        commit('setLoginError', 'An error has occured trying to login.');
      })
    }
  }
};
