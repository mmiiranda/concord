import { createStore } from "vuex";
import chatModule from "./chat";
import websocket from "./websocket";
import rightsidebar from "./rightsidebar";
import mobile from "./mobile"
import router from "@/router";

export default createStore({
  state: {
    loading: false,
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("UserSetting")) || null,
    friendsList: [],
    serversList: [],
    pendingRequestsCount: 0,
    pendingRequests: [],
  },

  getters: {
    isLoading: (state) => state.loading,
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    getFriends: (state) => state.friendsList,
    getServers: (state) => state.serversList,
    isLoggedIn: (state) => !!state.token,

    // Contador de solicitações de amizade pendentes
    pendingRequestsCount: (state) => state.pendingRequestsCount,
    // Lista completa de solicitações pendentes
    getPendingRequests: (state) => state.pendingRequests,

    // Amigos com mensagens pendentes (unread)
    getFriendsWithPendingMessages: (state, getters, rootState, rootGetters) => {
      const unreadChats = rootGetters["websocket/unreadChats"];
      const activeChat = rootGetters["chat/getActiveChat"];

      return state.friendsList.filter((friend) => {
        if (activeChat && activeChat.type !== "server" && activeChat.id === friend.id) {
          return false;
        }
        return unreadChats.some(
          (chat) => chat.fromUserId === friend.id && chat.unreadMessagesCount > 0
        );
      });
    },
  },

  mutations: {
    TOGGLE_LOADING(state) {
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
      state.pendingRequests = [];
      state.pendingRequestsCount = 0;
      localStorage.removeItem("UserSetting");
      localStorage.removeItem("token");
    },
    SET_FRIENDS(state, friends) {
      state.friendsList = friends;
    },
    SET_SERVERS(state, servers) {
      state.serversList = servers;
    },
    SET_PENDING_REQUESTS(state, requests) {
      state.pendingRequests = requests;
      state.pendingRequestsCount = requests.length;
    },
    REMOVE_FRIEND(state, friendId) {
      state.friendsList = state.friendsList.filter((friend) => friend.id !== friendId);
    },
  },

  actions: {
    toogleLoading({ commit }) {
      commit("TOGGLE_LOADING");
    },

    async validateToken({getters}){
      const token = getters.getToken;

      try{
        const response = await fetch("http://localhost:8080/api/auth/validade-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({token:token})
        })
        console.log(response)
        return response

      }catch(err){
        console.log(err)
      }
    },

    // Realiza login e configura store + WebSocket
    async login({ commit, dispatch }) {
      commit("SET_USER", JSON.parse(localStorage.getItem("UserSetting")) || null);
      commit("SET_TOKEN", localStorage.getItem("token") || null);
    
      const token = localStorage.getItem("token");
      if (token) {
        console.log(token);
    
        try {
          const response = await dispatch("validateToken"); // Aguarda a resposta correta
          const isValid = await response.json(); // Converte a resposta para JSON
    
          console.log("🚀 Token válido?", isValid);
    
          if (!isValid) {
            console.log("🚨 Token inválido, redirecionando para login...");
            router.push("/login");
            return;
          }
    
          dispatch("fetchFriends");
          dispatch("fetchPendingRequests");
          dispatch("websocket/connectWebSocket", token, { root: true });
    
          console.log("✅ WebSocket conectado após login.");
        } catch (error) {
          console.error("❌ Erro ao validar o token:", error);
          router.push("/login");
        }
      }
    }
    ,

    // Busca solicitações pendentes de amizade
    async fetchPendingRequests({ commit, getters }) {
      const token = getters.getToken;
      if (!token) {
        console.error("⚠️ Token JWT ausente. Não foi possível buscar pendências.");
        return [];
      }

      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${getters.getUser.username}/pending-friendships`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Solicitações pendentes recebidas:", data);

          const pendingList = data.map((friendship) => {
            const isRequester = friendship.from.id === getters.getUser.id;
            return {
              id: friendship.id,
              origin: friendship.from.id,
              friend: isRequester ? friendship.to : friendship.from,
            };
          });

          commit("SET_PENDING_REQUESTS", pendingList);
          return pendingList;
        } else {
          console.error("Erro ao buscar pendências: Resposta não OK");
          return [];
        }
      } catch (error) {
        console.error("Erro ao buscar pendências:", error);
        return [];
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
          commit("SET_USER", updatedUser);
          console.log(`✅ ${field} atualizado com sucesso.`);
        } else {
          const errorData = await response.json();
          console.error(`Erro ao atualizar ${field}:`, errorData);
        }
      } catch (err) {
        console.error(`Erro na requisição para atualizar ${field}:`, err);
      }
    },

    async updateUserImage({commit, getters}, imagePath){
      try{
        console.log("to no vuex:", imagePath);
        const payload = {
          imageTempPath: imagePath
        }

        console.log("o pay ai", payload);

        const response = await fetch(
          `http://localhost:8080/api/users/${getters.getUser.username}/image`,
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
          commit("SET_USER", updatedUser);
        } else {
          const errorData = await response.json();

          console.error(`Erro ao atualizar`, response);
          console.error(`Erro ao atualizar`, errorData);
        }
      }catch(err){
        console.log(err)
      }
    },

    // Busca lista de amigos
    async fetchFriends({ commit, getters }) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${getters.getUser.username}/friendships`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getters.getToken}`,
            },
          }
        );
    
        if (response.ok) {
          const data = await response.json();
    
          const friendsList = data.map((friendship) => ({
            ...friendship.from.id === getters.getUser.id
              ? friendship.to
              : friendship.from,
            friendshipId: friendship.id, // Incluindo o ID da amizade
          }));
    
          console.log("Amigos recebidos com ID da amizade:", friendsList);
          commit("SET_FRIENDS", friendsList);
        } else {
          console.error("Erro ao buscar amigos.");
        }
      } catch (error) {
        console.error("Erro ao buscar amigos:", error);
      }
    },

    // Busca lista de servidores
    async fetchServers({ commit, getters }) {
      try {
        const token = getters.getToken;
        if (!token) {
          console.error("⚠️ Token JWT ausente. Não foi possível buscar servidores.");
          return;
        }

        const response = await fetch(
          `http://localhost:8080/api/users/${getters.getUser.username}/servers`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const servers = await response.json();
          commit("SET_SERVERS", servers);
        } else {
          console.error("Erro ao buscar servidores.");
        }
      } catch (error) {
        console.error("Erro ao buscar servidores:", error);
      }
    },

    async removeFriend({ commit, getters,dispatch }, friendshipId) {
      try {
        const token = getters.getToken;
        if (!token) {
          console.error("⚠️ Token JWT ausente. Não foi possível remover amigo.");
          return;
        }

        const response = await fetch(
          `http://localhost:8080/api/friendships/${friendshipId}/remove`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          console.log("✅ Amizade removida com sucesso no backend.");
          dispatch("fetchFriends")
          commit("REMOVE_FRIEND", friendshipId); 
        } else {
          console.error("Erro ao remover amigo no backend:", await response.text());
        }
      } catch (error) {
        console.error("Erro ao remover amigo:", error);
      }
    },
    getImage(imagePath){
      console.log(imagePath)
      return imagePath ? `http://localhost:8080/api/files/images?file-id=${imagePath}`: 'no-photo.jpg';
    },
  },

  modules: {
    chat: chatModule,
    websocket,
    rightsidebar,
    mobile
  },
});
