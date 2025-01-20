
const state = {
    isOpen: false,          
    selectedFriend: null    
  };
  
  const mutations = {
    SET_IS_OPEN(state, payload) {
      state.isOpen = payload;
    },
    SET_SELECTED_FRIEND(state, payload) {
      state.selectedFriend = payload;
    }
  };
  
  const actions = {
    openSidebarWithFriend({ commit }, friend) {
      commit('SET_SELECTED_FRIEND', friend);
      commit('SET_IS_OPEN', true);
    },
    closeSidebar({ commit }) {
      commit('SET_IS_OPEN', false);
      commit('SET_SELECTED_FRIEND', null);
    }
  };
  
  const getters = {
    isOpen: (state) => state.isOpen,
    selectedFriend: (state) => state.selectedFriend
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };
  