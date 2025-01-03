import { createStore } from 'vuex';

export default createStore({
  state: {
    loading: false, 
  },
  getters: {
    isLoading: (state) => state.loading, 
  },
  mutations: {
    TOGGLE_LOADING(state) {
      state.loading = !state.loading;
    },
  },
  actions: {

    toogleLoading({ commit }) {
      commit('TOGGLE_LOADING');
    },
    
    setLoading({ commit }, value) {
      commit('SET_LOADING', value);
    },
  },
  modules: {
  },
});
