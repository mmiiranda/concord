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
    TOOGLE_LOADING(state) {
      state.loading = !state.loading;
    },
    SET_USER(state, user) {
      state.user = user
      localStorage.setItem('UserSetting', JSON.stringify(user)); 
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
    UPDATE_LOCALHOST(state){
      state.user = JSON.parse(localStorage.getItem('UserSetting')) || null;
      state.token = localStorage.getItem('token') || null
    }
  },
  actions: {
    toogleLoading({ commit }) {
      commit('TOOGLE_LOADING');
    },
    
    setLoading({ commit }, value) {
      commit('SET_LOADING', value);
    },

    login({ commit }) {
      commit("UPDATE_LOCALHOST")
    },

    logout({ commit }) {
      commit('LOGOUT');
    },
    

  },
  modules: {},
});
