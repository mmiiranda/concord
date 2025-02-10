const state = {
  isSidebarOpen: false,
  isMobile: window.innerWidth <= 768,
};

const getters = {
  isSidebarOpen: (state) => state.isSidebarOpen,
  isMobile: (state) => state.isMobile,
};

const mutations = {
  TOGGLE_SIDEBAR(state) {
    state.isSidebarOpen = !state.isSidebarOpen;
  },
  CLOSE_SIDEBAR(state) {
    if (state.isMobile) {
      state.isSidebarOpen = false;
      console.log("❌ Sidebar fechada por clique externo.");
    }
  },
  OPEN_SIDEBAR(state) {
    state.isSidebarOpen = true;
  },
  SET_MOBILE(state, isMobile) {
    state.isMobile = isMobile;
    state.isSidebarOpen = !isMobile; // No mobile começa fechada, no desktop aberta
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
