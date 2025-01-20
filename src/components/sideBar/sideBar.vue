<template>
    <div class="flex h-[90vh] bg-darkblue">
      <div class="flex flex-col items-center py-6">
        <div class="flex flex-col items-center gap-1">
          <MiniServerIcon
            name="Home"
            imagePath="logo_icon.svg"
            @click="returnMainPage"
          />
  
          <div>
            <div 
              v-for="friend in friendsWithPendingMessages" 
              :key="friend.id" 
              class="flex items-center gap-2 mb-2 animate-spawn"
              
            >
              <div class="relative flex items-center">
                <MiniServerIcon
                  :name="friend.username"
                  :imagePath="getImage(friend)"
                  @click="openChat(friend.id)"
                />
                <span class="absolute top-0 right-0 bg-red font-bold text-white rounded-full px-2 py-0.5 text-xs">
                  {{ getUnreadCount(friend.id) }}
                </span>
              </div>
            </div>
          </div>
  
          <div class="w-4/5 bg-hovergray h-[3px] mt-2"></div>
  
          <div class="flex flex-col gap-3">
            <MiniServerIcon
              v-for="server in servers"
              :key="server.id"
              :name="server.name"
              :imagePath="getServerImage(server)"
              @click="openServerChat(server)"
            />
  
            <CreateServerIcon @click="toggleModalCreateServer" />
          </div>
        </div>
      </div>

      <transition name="slide">
        <div 
          v-if="isOpen" 
          class="bg-[#363636] flex flex-col ml-2 text-white min-w-48"
        >
          <div>
            <HomeSideBarContent />
          </div>
        </div>
      </transition>
  

      <CreateServer 
        v-if="ModalCreateServer" 
        @close="toggleModalCreateServer"
        @serverCreated="fetchServers"
      />
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from "vuex";
  import MiniServerIcon from "@/components/servers/MiniServerIcon.vue";
  import CreateServerIcon from "@/components/servers/CreateServerIcon.vue";
  import CreateServer from "@/components/form/CreateServer.vue";  
  import HomeSideBarContent from "./home/homeSideBarContent.vue";
  
  export default {
    name: "SideBar",
    components: {
      MiniServerIcon,
      CreateServerIcon,
      CreateServer, 
      HomeSideBarContent
    },
    data() {
      return {
        isOpen: true,
        ModalCreateServer: false,
      };
    },
    computed: {
      ...mapGetters("websocket", ["unreadChats", "users"]),
      ...mapGetters(["getFriendsWithPendingMessages", "getServers"]),
      friendsWithPendingMessages() {
        console.log(this.$store.getters.getFriendsWithPendingMessages);
        return this.$store.getters.getFriendsWithPendingMessages;
      },
      servers() {
        return this.getServers;
      }
    },
    methods: {
      ...mapActions("websocket", ["fetchUnreadChats", "fetchUsers", "markMessagesAsRead"]),
      ...mapActions("chat", ["setActiveChat"]),
      ...mapActions(["fetchServers"]),
  
      // Função para obter a imagem do amigo
      getImage(friend) {
        return friend.avatarPath 
          ? `http://localhost:8080/api/files/images?file-id=${friend.avatarPath}` 
          : "no-photo.jpg";
      },
  
      // Função para obter a imagem do servidor
      getServerImage(server){
        return server.imagePath 
          ? `http://localhost:8080/api/files/images?file-id=${server.imagePath}` 
          : null; // Use uma imagem padrão
      },
      
      // Função para obter a contagem de mensagens não lidas
      getUnreadCount(friendId) {
        const chat = this.unreadChats.find(chat => chat.fromUserId === friendId);
        return chat ? chat.unreadMessagesCount : 0;
      },
      
      // Função para abrir o chat com um amigo
      async openChat(friendId) {
        console.log(`📤 Abrindo chat com amigo ID: ${friendId}`);
        
        // Encontrar o amigo para obter o nome correto
        const friend = this.friendsWithPendingMessages.find(f => f.id === friendId);
        if (!friend) {
            console.error(`Amigo com ID ${friendId} não encontrado.`);
            return;
        }

        // Define o chat ativo no Vuex com ID como número
        this.setActiveChat({
            id: Number(friendId), // Certifique-se que é um número
            name: friend.username, // Use o nome correto do amigo
            type: "dm",
        });

        // Marcar mensagens como lidas
        await this.markMessagesAsRead({ fromUserId: friendId });
        console.log(`✅ Mensagens de ${friendId} marcadas como lidas.`);
        },

      
      returnMainPage() {
        console.log("🔄 Retornando para a página principal");
        this.setActiveChat(null);
      },
      
      openServerChat(server) {
        console.log(`📤 Abrindo chat do servidor: ${server.name} (ID: ${server.id})`);
        // Definir o chat ativo para o servidor
        this.setActiveChat({
          id: server.id,
          name: server.name,
          type: "server"
        });
      },
      
      toggleModalCreateServer() {
        this.ModalCreateServer = !this.ModalCreateServer;
        console.log(`🔄 Modal de criação de servidor está agora: ${this.ModalCreateServer ? 'Aberto' : 'Fechado'}`);
      },
    },
    mounted() {
      const token = this.$store.getters["getToken"];
      if (token) {
        this.$store.dispatch("websocket/fetchUnreadChats");
        this.$store.dispatch("fetchServers"); 
      } else {
        console.error("⚠️ Token JWT não encontrado. Não foi possível conectar ao WebSocket.");
      }
    },
  };
  </script>
  
  <style scoped>
  .bg-darkblue {
    background-color: #23272A;
  }
  .bg-hovergray {
    background-color: #40444B;
  }
  </style>
  