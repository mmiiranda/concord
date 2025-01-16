import websocketService from "@/services/websocketService";

const chatModule = {
  namespaced: true,
  state: {
    activeChat: null,
    socketConnected: false
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
    },
    connectWebSocket({ commit, rootGetters }) {
      const token = rootGetters.getToken;
      if (!token) {
        console.error("Token ausente, WebSocket não pode conectar.");
        return;
      }

      websocketService.connect(token); // 🔹 Agora passamos apenas o token puro

      websocketService.onMessage((message) => {
        console.log("Mensagem WebSocket recebida:", message);
      });

      websocketService.onOpen(() => {
        console.log("WebSocket conectado!");
        commit("SET_SOCKET_CONNECTED", true);
      });

      websocketService.onClose(() => {
        console.log("WebSocket desconectado!");
        commit("SET_SOCKET_CONNECTED", false);
      });

      websocketService.onError((error) => {
        console.error("Erro no WebSocket:", error);
      });
    },
    disconnectWebSocket({ commit }) {
      websocketService.disconnect();
      commit("SET_SOCKET_CONNECTED", false);
    }
  }
};

export default chatModule;
