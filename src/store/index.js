import { createStore } from "vuex";
import chatModule from "./chat";
import websocket from "./websocket"; 
import rightsidebar from './rightsidebar'; // Importando corretamente

export default createStore({
  state: {
    loading: false,
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("UserSetting")) || null,
    friendsList: [],
    serversList: []
  },
  getters: {
    isLoading: (state) => state.loading,
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    getFriends: (state) => state.friendsList,
    getServers: (state) => state.serversList, // Adicione esta linha
    isLoggedIn: (state) => !!state.token,
  
    // Getter para listar amigos com mensagens pendentes
    getFriendsWithPendingMessages: (state, getters, rootState, rootGetters) => {
      const unreadChats = rootGetters["websocket/unreadChats"];
      const activeChat = rootGetters["chat/getActiveChat"];
      
      return state.friendsList.filter(friend => {
        // Se o chat ativo for DM e tiver o mesmo ID, ignora
        if (activeChat && activeChat.type !== "server" && activeChat.id === friend.id) {
          return false;
        }
        // Retorna true somente se encontrar esse amigo em unreadChats com msgs não lidas
        return unreadChats.some(
          chat => chat.fromUserId === friend.id && chat.unreadMessagesCount > 0
        );
      });
    },

  },
  mutations: {
    TOOGLE_LOADING(state) {
      state.loading = !state.loading;
    },
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem("UserSetting", JSON.stringify(user));
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    LOGOUT(state) {
      state.user = null;
      state.token = null;
      state.friendsList = [];
      state.serversList = [];
      localStorage.removeItem("UserSetting");
      localStorage.removeItem("token");
    },
    UPDATE_LOCALHOST(state) {
      state.user = JSON.parse(localStorage.getItem("UserSetting")) || null;
      state.token = localStorage.getItem("token") || null;
    },
    SET_FRIENDS(state, friends) {
      state.friendsList = friends;
    },
    SET_SERVERS(state, servers) {
      state.serversList = servers;
    },
    UPDATE_USER_FIELD(state, { field, value }) {
      if (state.user) {
        state.user[field] = value;
        localStorage.setItem("UserSetting", JSON.stringify(state.user));
      }
    }
  },
  actions: {
    toogleLoading({ commit }) {
      commit("TOOGLE_LOADING");
    },
    login({ commit, dispatch }) {
      commit("UPDATE_LOCALHOST");
      const token = localStorage.getItem("token");

      if (token) {
        dispatch("websocket/connectWebSocket", token, { root: true });
        console.log("✅ WebSocket conectado após login.");
      }
    },
    logout({ commit, dispatch }) {
      // Desconecta o WebSocket ao fazer logout
      dispatch("websocket/disconnectWebSocket", null, { root: true });
      commit("LOGOUT");
      console.log("🔴 WebSocket desconectado após logout.");
    },
    async fetchFriends({ commit, getters }) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${getters.getUser.username}/friendships`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getters.getToken}`
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          commit(
            "SET_FRIENDS",
            data.map((friendship) =>
              friendship.from.id === getters.getUser.id
                ? friendship.to
                : friendship.from
            )
          );
        }
      } catch (err) {
        console.error("Erro ao buscar amigos:", err);
      }
    },
    async fetchServers({ commit, getters }) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${getters.getUser.username}/servers`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getters.getToken}`
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          commit("SET_SERVERS", data);
        }
      } catch (err) {
        console.error("Erro ao buscar servidores:", err);
      }
    },
    async updateUser({ commit, getters }, { field, value }) {
      try {
        const payload = {
          [field]: value
        };

        const response = await fetch(
          `http://localhost:8080/api/users/${getters.getUser.username}/${field}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getters.getToken}`
            },
            body: JSON.stringify(payload)
          }
        );

        if (response.ok) {
          const updatedUser = await response.json();
          console.log(updatedUser)
          commit("SET_USER", updatedUser);
          console.log(`✅ ${field} atualizado com sucesso.`);

        } else {
          const errorData = await response.json();
          console.error(`Erro ao atualizar ${field}:`, errorData);
        }
      } catch (err) {
        console.error(`Erro na requisição para atualizar ${field}:`, err);
      }
    }
  },
  modules: {
    chat: chatModule,
    websocket,
    rightsidebar // Registrando o módulo com o namespace correto
  }
});
