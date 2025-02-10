import { createStore } from "vuex";
import chatModule from "./chat";
import websocket from "./websocket";
import rightsidebar from "./rightsidebar";
import mobile from "./mobile"
import router from "@/router";
import register from "./register";
import modalForgetPassword from "./modalForgetPassword";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default createStore({
  state: {
    loading: false,
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("UserSetting")) || null,
    friendsList: [],
    serversList: [],
    pendingRequestsCount: 0,
    pendingRequests: [],
    firstAcess: false,
    apiUrl: process.env.VUE_APP_API_URL,
  },

  getters: {
    isLoading: (state) => state.loading,
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    getFriends: (state) => state.friendsList,
    getServers: (state) => state.serversList,
    isLoggedIn: (state) => !!state.token,
    getFirstAcess: (state) => state.firstAcess,
    getModalForgetPassword: (state) => state.ModalForgetPassword,

    
    pendingRequestsCount: (state) => state.pendingRequestsCount,
    
    getPendingRequests: (state) => state.pendingRequests,

    
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
    SET_FIRST_ACESS(state, value){
      state.firstAcess = value
    },
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
    setFirstAcess({commit}, value){
      commit("SET_FIRST_ACESS", value);
    },

    setModalForgetPassword({commit}, value){
      commit("SET_MODALFORGETPASSWORD", value);
    },

    toogleLoading({ commit }) {
      commit("TOGGLE_LOADING");
    },

    async validateToken({getters, state}){
      const token = getters.getToken;

      if(!token) return false

      try{
        const response = await fetch(`${state.apiUrl}/api/auth/validade-token`, {
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

    
    async login({ commit, dispatch }) {
      const token = localStorage.getItem("token");
      
      if (token) {
        commit("SET_USER", JSON.parse(localStorage.getItem("UserSetting")));
        commit("SET_TOKEN", localStorage.getItem("token"));
    
        try {
          const response = await dispatch("validateToken"); 
          const isValid = await response.json(); 
    
          if (!isValid) {
            router.push("/login");
            return false;
          }
    
          dispatch("fetchFriends");
          dispatch("fetchServers")
          dispatch("fetchPendingRequests");
          dispatch("websocket/connectWebSocket", token, { root: true });
          dispatch("websocket/fetchUnreadChats", { root: true }); 
          return true;
    
        } catch (error) {
          router.push("/login");
          return false;
        }
      }else{
        console.log("nao tem token");
        router.push("/login");
        return false;
      }
    },

    logout({commit}){
      commit("LOGOUT")
    },

    
    async fetchPendingRequests({ commit, getters, state }) {
      const token = getters.getToken;
      if (!token) {
        return [];
      }

      try {
        const response = await fetch(
          `${state.apiUrl}/api/users/${getters.getUser.username}/pending-friendships`,
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

    async updateUser({ commit, getters,state }, { field, value }) {
      try {
        const payload = {
          [field]: value
        };

        const response = await fetch(
          `${state.apiUrl}/api/users/${getters.getUser.username}/${field}`,
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
          toast.success(`${field} Updated Successfully`, {
            autoClose: 1000,
            position: "top-right",
            theme: "dark",
          });
        } else {
          const errorData = await response.json();
          console.error(`Erro ao atualizar ${field}:`, errorData.message);

          toast.error(`${errorData.message}. `, {
            autoClose: 1000,
            position: "top-right",
            theme: "dark",
          });
        }
      } catch (err) {
        console.error(`Erro na requisição para atualizar ${field}:`, err);
      }
    },

    async updateUserImage({commit, getters,state}, imagePath){
      try{
        console.log("to no vuex:", imagePath);
        const payload = {
          imageTempPath: imagePath
        }

        console.log("o pay ai", payload);

        const response = await fetch(
          `${state.apiUrl}/api/users/${getters.getUser.username}/image`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getters.getToken}`
            },
            body: JSON.stringify(payload)
          }
        );

        console.log("oaaa", getters.getToken);

        if (response.ok) {
          const updatedUser = await response.json();
          commit("SET_USER", updatedUser);
          toast.success("Photo Updated Successfully", {
            autoClose: 1000,
            position: "top-right",
            theme: "dark",
          });
        } else {
          const errorData = await response.json();

          console.error(`Erro ao atualizar`, response);
          console.error(`Erro ao atualizar`, errorData);
          toast.error("Error Photo Updated", {
            autoClose: 1000,
            position: "top-right",
            theme: "dark",
          });
        }
      }catch(err){
        console.log(err)
      }
    },

    // Busca lista de amigos
    async fetchFriends({ commit, getters, state }) {
      try {
        const response = await fetch(
          `${state.apiUrl}/api/users/${getters.getUser.username}/friendships`,
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
    async fetchServers({ commit, getters, state }) {
      try {
        const token = getters.getToken;
        if (!token) {
          console.error("⚠️ Token JWT ausente. Não foi possível buscar servidores.");
          return;
        }

        const response = await fetch(
          `${state.apiUrl}/api/users/${getters.getUser.username}/servers`,
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

    async removeFriend({ commit, getters,dispatch,state }, friendshipId) {
      try {
        const token = getters.getToken;
        if (!token) {
          console.error("⚠️ Token JWT ausente. Não foi possível remover amigo.");
          return;
        }

        const response = await fetch(
          `${state.apiUrl}/api/friendships/${friendshipId}/remove`,
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
    getImage({state},imagePath){
      console.log(imagePath)
      return imagePath ? `${state.apiUrl}/api/files/images?file-id=${imagePath}`: 'no-photo.jpg';
    },

    missing(){
      toast.info("Sheiely didn't do it", {
        autoClose: 1000,
        position: "top-right",
        theme: "dark",
      });
    }
  },


  modules: {
    chat: chatModule,
    websocket,
    rightsidebar,
    mobile,
    register,
    modalForgetPassword
  },
});
