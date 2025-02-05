import WebSocketService from "@/services/websocketService";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const state = {
  isConnected: false,
  messages: [],
  unreadChats: [],
  users: [],
  processedEvents: new Set(),
  apiUrl: process.env.VUE_APP_API_URL,
};

const mutations = {
  SET_CONNECTED(state, status) {
    state.isConnected = status;
  },
  SET_MESSAGES(state, olderMessages) {
    state.messages.push(...olderMessages);
  },
  ADD_MESSAGE(state, message) {
    const exists = state.messages.some((msg) => msg.id === message.id);
    if (!exists) {
      state.messages.unshift(message);
    } else {
      console.log("⚠️ Mensagem duplicada ignorada:", message.id);
    }
  },
  RESET_MESSAGES(state) {
    state.messages = [];
    state.processedEvents.clear(); // se quiser limpar também o processedEvents
  },
  SET_UNREAD_CHATS(state, unreadChats) {
    state.unreadChats = unreadChats;
  },
  SET_USERS(state, users) {
    state.users = users;
  },
};

const actions = {
  connectWebSocket({ commit, rootGetters, state, dispatch }, token) {
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
      // ADIÇÃO 2: Verifica se o evento (mensagem) possui um ID único
      const eventId =
        message?.content?.id ||
        message?.content?.timestamp ||
        new Date().getTime();
    
      // Se já processamos esse ID, ignoramos
      if (state.processedEvents.has(eventId)) {
        console.log("⚠️ Evento duplicado ignorado:", eventId);
        return;
      }
      state.processedEvents.add(eventId);
    
      const user = rootGetters["getUser"];
      const activeChat = rootGetters["chat/getActiveChat"];
    
      // Mensagem de chat privado
      if (message.eventType === "USER_MESSAGE") {
        const newMsg = {
          id: message.content.id || message.content.timestamp,
          fromUserId: message.content.fromUserId,
          toUserId: message.content.toUserId,
          timestamp: message.content.timestamp || new Date().toISOString(),
          senderAvatar: message.content.senderAvatar || "no-photo.jpg",
          content: message.content.message,
        };
    
        
        if (
          activeChat &&
          ((activeChat.type === "dm" &&
            (activeChat.id === newMsg.fromUserId || activeChat.id === newMsg.toUserId)) ||
            (activeChat.type === "server" && activeChat.id === message.content.serverId))
        ) {
          commit("ADD_MESSAGE", newMsg);
        }
    
        // Se a mensagem é para o usuário atual
        if (message.content.toUserId === user.id) {
          const fromUserId = message.content.fromUserId;
    
          if (!activeChat || activeChat.id !== fromUserId || activeChat.type === "server") {
            const existingChat = state.unreadChats.find(
              (chat) => chat.fromUserId === fromUserId
            );
    
            if (existingChat) {
              existingChat.unreadMessagesCount += 1;
            } else {
              state.unreadChats.push({
                fromUserId: fromUserId,
                latestMessageTimestamp: message.content.timestamp,
                unreadMessagesCount: 1,
              });
            }
    
            commit("SET_UNREAD_CHATS", [...state.unreadChats]);
          } else {
            console.log(`✅ Marcando mensagens de ${fromUserId} como lidas.`);
            dispatch("markMessagesAsRead", { fromUserId });
          }
        }
      }
    
      // Solicitação de amizade
      else if (message.eventType === "FRIEND_REQUEST") {
        console.log("📤 Nova solicitação de amizade recebida!");
        console.log(message.content);
    
        if (message.content.status === "PENDING") {
          toast.info("You have a new friend request!", {
            autoClose: 3000,
            position: "top-right",
            theme: "dark",
          });
        } else if (message.content.status === "ACCEPTED") {
          dispatch("fetchFriends", null, { root: true });
        }
        
        dispatch("fetchPendingRequests", null, { root: true });
      }
    })
  },
    
  disconnectWebSocket({ commit }) {
    WebSocketService.disconnect();
    commit("SET_CONNECTED", false);
  },

  sendMessage(_, message) {
    WebSocketService.sendMessage(message);
    console.log("📤 Enviada (via Vuex):", message);
  },

  async fetchChatMessages({ commit, rootGetters, state }, { toUserId, fromUserId, page = 0, size = 10 }) {
    const token = rootGetters["getToken"];
    if (!token || !fromUserId) {
      console.error("Usuário não autenticado ou token ausente.");
      return [];
    }

    const endpoint = `${state.apiUrl}/api/messages/chat?toUserId=${toUserId}&fromUserId=${fromUserId}&page=${page}&size=${size}&sort=timestamp,desc`;
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
      // commit("SET_MESSAGES", [...newerMessages, ...state.messages]);
      commit("SET_MESSAGES", newerMessages);
      // E dentro da mutação:
      return newerMessages;
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
      return [];
    }
  },

  async fetchUnreadChats({ commit, rootGetters, state }) {
    const token = rootGetters["getToken"];
    if (!token) {
      console.error("⚠️ Token JWT ausente. Não foi possível buscar chats não lidos.");
      return [];
    }

    const endpoint = `${state.apiUrl}/api/messages/unread-chats`;
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

  async markMessagesAsRead({ commit, state, rootGetters }, { fromUserId }) {
    const token = rootGetters["getToken"];
    if (!token) {
      console.error("⚠️ Token JWT ausente. Não foi possível marcar mensagens como lidas.");
      return;
    }

    const endpoint = `${state.apiUrl}/api/messages/read`;
    try {
      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fromUserId }),
      });

      if (!response.ok) {
        throw new Error("Erro ao marcar mensagens como lidas.");
      }

      console.log(`✅ Mensagens de ${fromUserId} marcadas como lidas.`);

      // Zera o contador de unreadChats no state
      const existingChat = state.unreadChats.find((chat) => chat.fromUserId === fromUserId);
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
  activeChat: (_, __, rootState) => rootState.chat.activeChat,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
