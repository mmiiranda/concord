const state = {
  isSidebarOpen: false,
  isMobile: window.innerWidth <= 768,
};

const getters = {
  isSidebarOpen: (state) => state.isSidebarOpen, // Removido o `&& state.isMobile`
  isMobile: (state) => state.isMobile,
};

const mutations = {
  TOGGLE_SIDEBAR(state) {
    state.isSidebarOpen = !state.isSidebarOpen; // Permite abrir no PC também
  },
  CLOSE_SIDEBAR(state) {
    if(state.isMobile) state.isSidebarOpen = false;
  },
  OPEN_SIDEBAR(state) {
    state.isSidebarOpen = true;
  },
  SET_MOBILE(state, isMobile) {
    state.isMobile = isMobile;
    state.isSidebarOpen = false;
    if (!isMobile) {
      state.isSidebarOpen = true; // Fecha no desktop se necessário
    }
  },
};

const actions = {
  toggleSidebar({ commit }) {
    commit("TOGGLE_SIDEBAR");
  },
  closeSidebar({ commit }) {
    commit("CLOSE_SIDEBAR");
  },
  openSidebar({ commit }) {
    commit("OPEN_SIDEBAR");
  },
  detectMobile({ commit }) {
    const isMobile = window.innerWidth <= 768;
    commit("SET_MOBILE", isMobile);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
