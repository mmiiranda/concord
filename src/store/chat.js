const chatModule = {
  namespaced: true,
  state: {
    activeChat: null,
  },
  getters: {
    getActiveChat: (state) => state.activeChat,
    isSocketConnected: (state) => state.socketConnected
  },
  mutations: {
    SET_ACTIVE_CHAT(state, chat) {
      state.activeChat = chat;
    },
    SET_SOCKET_CONNECTED(state, status) {
      state.socketConnected = status;
    }
  },
  actions: {
    setActiveChat({ commit }, chat) {
      commit("SET_ACTIVE_CHAT", chat);
    }
  }
};

export default chatModule;
