import { createStore } from 'vuex';

export default createStore({
  state: {
    loading: false, 
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('UserSetting')) || null, // Corrigido para coincidir com a chave usada no localStorage
  },
  getters: {
    isLoading: (state) => state.loading, 
    getUser: (state) => state.user,
    getToken: (state) => state.token
  },
  mutations: {
    TOGGLE_LOADING(state) {
      state.loading = !state.loading;
    },
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem('UserSetting', JSON.stringify(user)); // Certifique-se de armazenar corretamente
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    LOGOUT(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('UserSetting');
      localStorage.removeItem('token');
    },
  },
  actions: {
    toggleLoading({ commit }) {
      commit('TOGGLE_LOADING');
    },
    
    setLoading({ commit }, value) {
      commit('SET_LOADING', value);
    },

    login({ commit }, { user, token }) {
      commit('SET_USER', user);
      commit('SET_TOKEN', token);
    },

    logout({ commit }) {
      commit('LOGOUT');
    },
  },
  modules: {},
});
