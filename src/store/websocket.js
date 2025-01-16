import WebSocketService from "@/services/websocketService";

const state = {
  isConnected: false,
};

const mutations = {
  SET_CONNECTED(state, status) {
    state.isConnected = status;
  },
};

const actions = {
  connectWebSocket({ commit }, token) {
    if (!token) {
      console.error("⚠️ Token JWT ausente. WebSocket não será conectado.");
      return;
    }

    // Conecta ao serviço
    WebSocketService.connect(token);

    // Registra listeners só uma vez
    WebSocketService.onOpen(() => {
      console.log("✅ WebSocket conectado!");
      commit("SET_CONNECTED", true);
    });

    WebSocketService.onClose(() => {
      console.log("❌ WebSocket desconectado!");
      commit("SET_CONNECTED", false);
    });

    WebSocketService.onError((error) => {
      console.error("⚠️ Erro no WebSocket:", error);
    });
  },

  disconnectWebSocket({ commit }) {
    WebSocketService.disconnect();
    commit("SET_CONNECTED", false);
  },

  sendMessage(_, message) {
    // Agora enviamos o objeto "cru"
    WebSocketService.sendMessage(message);
    console.log("📤 Mensagem enviada (via Vuex):", message);
  },
};

const getters = {
  isConnected: (state) => state.isConnected,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
