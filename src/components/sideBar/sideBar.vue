<template>
  <div class="flex h-[calc(100dvh-5rem)] bg-dark-gray-1 fixed z-40 md:relative  md:flex" ref="sidebar">
    <div class="flex flex-col items-center py-6 px-1">
      <div class="flex flex-col items-center  gap-1">


        <div class="relative flex items-center">
            <MiniServerIcon
            name="Home"
            imagePath="logo_icon.svg"
            @click="returnMainPage"
          />
        </div>
        
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
                @click="openChat(friend)"
                class="opacity-80 hover:opacity-100"
              />

              <span class="absolute top-0 right-0 font-bold bg-red text-white rounded-full px-2 py-0.5 text-xs">
                {{ getUnreadCount(friend.id) }}
              </span>
            </div>
          </div>
        </div>

        <div class="w-4/5 bg-medium-gray h-[3px] mt-2"></div>
        
        <div class="flex flex-col gap-3">
          <MiniServerIcon
            v-for="server in servers"
            :key="server.id"
            :name="server.name"
            :imagePath="getServerImage(server)"
            @click="openServerChat(server)"
          />

          <CreateServerIcon @click="missing" />
        </div>
      </div>
    </div>

    
    <transition name="slide">
      <div 
        v-if="isOpen" 
        class="bg-[#363636] flex flex-col  text-white min-w-48 relative"
      >
        <div>
          <!-- <div 
            class="absolute right-3 top-3 cursor-pointer block md:hidden"
            @click="closeSidebar"
          >
            X
          </div> -->
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
      mobileMenuAux: false,
    };
  },
  computed: {
    ...mapGetters("websocket", ["unreadChats", "users"]),
    ...mapGetters(["getFriendsWithPendingMessages", "getServers"]),
    ...mapGetters("mobile",["isMobile","isSidebarOpen"]),
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
    ...mapActions("mobile", ["closeSidebar"]),
    ...mapActions(["missing"]),

    // Função para obter a imagem do amigo
    getImage(friend) {
      return friend.imagePath 
        ? `${process.env.VUE_APP_API_URL}/api/files/images?file-id=${friend.imagePath}` 
        : "no-photo.jpg";
    },

    // Função para obter a imagem do servidor
    getServerImage(server){
      return server.imagePath 
        ? `${process.env.VUE_APP_API_URL}/api/files/images?file-id=${server.imagePath}` 
        : null // Use uma imagem padrão
    },
    
    // Função para obter a contagem de mensagens não lidas
    getUnreadCount(friendId) {
      const chat = this.unreadChats.find(chat => chat.fromUserId === friendId);
      return chat ? chat.unreadMessagesCount : 0;
    },
    
    // Função para abrir o chat com um amigo
   
    async openChat(friend) {
      
      // 1) Seta o chat ativo direto no Vuex
      this.setActiveChat({
        id: friend.id,
        name: friend.username,
        type: "dm",
        imagePath: friend.imagePath
      });

      // 2) Chama a action para marcar como lidas
      await this.markMessagesAsRead({ fromUserId: friend.id });

      // 3) (Opcional) Emitir para o pai, se lineainda precisar
      this.closeSidebar()
      this.$emit("openChat", friend.id);
    },

    
    returnMainPage() {
      console.log("🔄 Retornando para a página principal");
      this.closeSidebar()
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

      this.closeSidebar()
    },
    
    checkController(){
      if(this.mobileMenuAux) this.closeSidebar();
    },

    toggleModalCreateServer() {
      this.ModalCreateServer = !this.ModalCreateServer;
      console.log(`🔄 Modal de criação de servidor está agora: ${this.ModalCreateServer ? 'Aberto' : 'Fechado'}`);
    },

    handleClickOutsideSideBar(event){
      if(this.$refs.sidebar && !this.$refs.sidebar.contains(event.target) && this.isMobile && this.isSidebarOpen){
        this.checkController()
        this.mobileMenuAux = !this.mobileMenuAux
      }
      
    }
  },
  mounted() {
      document.addEventListener("click", this.handleClickOutsideSideBar);
    },
  beforeUnmount() {
      document.removeEventListener("click", this.handleClickOutsideSideBar);
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
