// store/modules/websocket.js

import WebSocketService from "@/services/websocketService";

const state = {
  isConnected: false,
  messages: [],
};

const mutations = {
  SET_CONNECTED(state, status) {
    state.isConnected = status;
  },
  SET_MESSAGES(state, messages) {
    state.messages = messages;
  },
  ADD_MESSAGE(state, message) {
    // Evita duplicações
    const exists = state.messages.some(msg => msg.id === message.id);
    if (!exists) {
      state.messages.unshift(message);
    } else {
      console.log("⚠️ Mensagem duplicada ignorada:", message.id);
    }
  },
};

const actions = {
  connectWebSocket({ commit, rootGetters, state }, token) {
    if (state.isConnected) {
      console.log("⚠️ WebSocket já está conectado.");
      return;
    }

    if (!token) {
      console.error("⚠️ Token JWT ausente. WebSocket não será conectado.");
      return;
    }

    WebSocketService.connect(token);

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

    WebSocketService.onMessage((message) => {
      if (message.eventType === "USER_MESSAGE") {
        const user = rootGetters["getUser"];
        const newMsg = {
          id: message.content.id || message.content.timestamp, // Use ID único se disponível
          timestamp: message.content.timestamp || new Date().toISOString(),
          senderName: message.content.fromUserId === user.id ? "Você" : "Outro Usuário",
          senderAvatar: message.content.senderAvatar || "no-photo.jpg",
          content: message.content.message,
        };
        commit("ADD_MESSAGE", newMsg);
      }
    });
  },

  disconnectWebSocket({ commit }) {
    WebSocketService.disconnect();
    commit("SET_CONNECTED", false);
  },

  sendMessage(_, message) {
    WebSocketService.sendMessage(message);
    console.log("📤 Enviada (via Vuex):", message);
  },

  async fetchChatMessages({ commit, state, rootGetters }, { toUserId, fromUserId, page = 0, size = 10 }) {
    const token = rootGetters["getToken"];
    if (!token || !fromUserId) {
      console.error("Usuário não autenticado ou token ausente.");
      return [];
    }

    // Adicione o parâmetro de ordenação aqui
    const endpoint = `http://localhost:8080/api/messages/chat?toUserId=${toUserId}&fromUserId=${fromUserId}&page=${page}&size=${size}&sort=timestamp,desc`;
    try {
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar mensagens.");
      }

      const data = await response.json();
      // Não reverte mais, pois a API já retorna das mais recentes para as mais antigas
      const newerMessages = data.content; // Mensagens das mais recentes para as mais antigas
      commit("SET_MESSAGES", [...newerMessages, ...state.messages]); // Prepend as mensagens
      return newerMessages; // Retorna as mensagens carregadas
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
      return [];
    }
  },
};

const getters = {
  isConnected: (state) => state.isConnected,
  messages: (state) => state.messages,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
  