// src/store/modules/websocket.js

import WebSocketService from "@/services/websocketService";

const state = {
  isConnected: false,
  messages: [],
  unreadChats: [],
  users: [],
};

const mutations = {
  SET_CONNECTED(state, status) {
    state.isConnected = status;
  },
  SET_MESSAGES(state, messages) {
    state.messages = messages;
  },
  ADD_MESSAGE(state, message) {
    const exists = state.messages.some(msg => msg.id === message.id);
    if (!exists) {
      state.messages.unshift(message);
    } else {
      console.log("⚠️ Mensagem duplicada ignorada:", message.id);
    }
  },
  SET_UNREAD_CHATS(state, unreadChats) {
    state.unreadChats = unreadChats;
  },
  SET_USERS(state, users) {
    state.users = users;
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
          id: message.content.id || message.content.timestamp,
          timestamp: message.content.timestamp || new Date().toISOString(),
          senderName: message.content.fromUserId === user.id ? "Você" : "Outro Usuário",
          senderAvatar: message.content.senderAvatar || "no-photo.jpg",
          content: message.content.message,
        };
        commit("ADD_MESSAGE", newMsg);

        if (message.content.toUserId === user.id && !message.content.isRead) {
          const activeChat = rootGetters["chat/activeChat"];

          console.log("Recebendo mensagem:");
          console.log("fromUserId:", message.content.fromUserId, typeof message.content.fromUserId);
          console.log("activeChat.id:", activeChat ? activeChat.id : null, activeChat ? typeof activeChat.id : null);

          const isActiveChat =
            activeChat &&
            activeChat.type === "dm" &&
            Number(activeChat.id) === Number(message.content.fromUserId); // Conversão para número

          console.log("isActiveChat:", isActiveChat);

          if (!isActiveChat) {
            const existingChat = state.unreadChats.find(chat => chat.fromUserId === message.content.fromUserId);
            if (existingChat) {
              existingChat.unreadMessagesCount += 1;
              existingChat.latestMessageTimestamp = message.content.timestamp;
            } else {
              state.unreadChats.push({
                fromUserId: message.content.fromUserId,
                latestMessageTimestamp: message.content.timestamp,
                unreadMessagesCount: 1,
              });
            }
            commit("SET_UNREAD_CHATS", [...state.unreadChats]);
          } else {
            console.log(`📖 Mensagem de ${message.content.fromUserId} recebida na conversa ativa. Não incrementando unread count.`);
          }
        }
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
      const newerMessages = data.content; 
      commit("SET_MESSAGES", [...newerMessages, ...state.messages]); 
      return newerMessages; 
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
      return [];
    }
  },

  async fetchUnreadChats({ commit, rootGetters }) {
    const token = rootGetters["getToken"];
    if (!token) {
      console.error("⚠️ Token JWT ausente. Não foi possível buscar chats não lidos.");
      return;
    }

    const endpoint = `http://localhost:8080/api/messages/unread-chats`;
    try {
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar chats não lidos.");
      }

      const data = await response.json();
      console.log("Chats não lidos recebidos:", data);
      commit("SET_UNREAD_CHATS", data);
      return data;
    } catch (error) {
      console.error("Erro ao buscar chats não lidos:", error);
      return [];
    }
  },

  async fetchUsers({ commit, rootGetters }) {
    const token = rootGetters["getToken"];
    if (!token) {
      console.error("⚠️ Token JWT ausente. Não foi possível buscar usuários.");
      return;
    }

    const endpoint = `http://localhost:8080/api/users`; // Ajuste conforme sua API
    try {
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar usuários.");
      }

      const data = await response.json();
      commit("SET_USERS", data);
      return data;
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return [];
    }
  },

  async markMessagesAsRead({ commit, state, rootGetters }, { fromUserId }) {
    const token = rootGetters["getToken"];
    if (!token) {
      console.error("⚠️ Token JWT ausente. Não foi possível marcar mensagens como lidas.");
      return;
    }

    const endpoint = `http://localhost:8080/api/messages/read`; // Atualizado para o novo endpoint
    try {
      const response = await fetch(endpoint, {
        method: "PATCH", // Alterado para PATCH
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fromUserId }), // Certifique-se de que o payload corresponde ao backend
      });

      if (!response.ok) {
        throw new Error("Erro ao marcar mensagens como lidas.");
      }

      console.log(`✅ Mensagens de ${fromUserId} marcadas como lidas.`);

      // Atualiza o estado no Vuex
      const existingChat = state.unreadChats.find(chat => chat.fromUserId === fromUserId);
      if (existingChat) {
        existingChat.unreadMessagesCount = 0;
        commit("SET_UNREAD_CHATS", [...state.unreadChats]);
      }
    } catch (error) {
      console.error("Erro ao marcar mensagens como lidas:", error);
    }
  },
};

const getters = {
  isConnected: (state) => state.isConnected,
  messages: (state) => state.messages,
  unreadChats: (state) => state.unreadChats,
  users: (state) => state.users,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
