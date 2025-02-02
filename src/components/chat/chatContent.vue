<template>
  <div class="h-full w-full flex flex-col gap-4 px-10 py-6">
    <h2 class="font-bold text-lg text-center md:text-left">{{ chatTitle }}</h2>

    <div 
      ref="messageContainer"
      class="h-full overflow-y-auto flex flex-col-reverse gap-2 border-t-2 border-darkblue"
      @scroll.passive="handleScroll"
    >
      <div 
        v-for="message in messages" 
        :key="message.id || message.timestamp" 
        class="message"
      >
          <MessageChat
          :name="OwnerMessage(message.fromUserId)"
          :msgTimestamp="message.timestamp"
          :src="getImageOwner(chatData.imagePath, message.fromUserId) || 'no-photo.jpg'"
          :message="message.content"
      />
      </div>
    </div>

    <div class="relative">
      <ChatInput @sendMessage="sendMessageHandler" />
    </div>
  </div>
</template>

<script>
import MessageChat from "./messageChat.vue";
import ChatInput from "../input/chatInput.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ChatContent",
  components: {
    MessageChat,
    ChatInput,
  },
  props: {
    chatData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      page: 0,
      size: 20,
      hasMoreMessages: true,
      isLoadingOlder: false, // Flag para evitar múltiplos loads ao mesmo tempo
      container: this.$refs.messageContainer
    };
  },
  computed: {
    ...mapGetters(["getToken", "getUser"]),
    ...mapGetters("websocket", ["messages", "isConnected"]),
    chatTitle() {
      return this.chatData.type === "server"
        ? `${this.chatData.name}`
        : `${this.chatData.name}`;
    },
  },
  methods: {
    ...mapActions("websocket", ["sendMessage", "fetchChatMessages"]),


    getImageOwner(imagePath, ownerId){
      if(imagePath == null) return "no-photo.jpg"
      if(ownerId == this.getUser.id) return this.getImage(this.getUser.imagePath);
      return this.getImage(this.chatData.imagePath)
    },

    getImage(imagePath){
        return imagePath ? `http://${process.env.VUE_APP_API_URL}/api/files/images?file-id=${imagePath}`: 'no-photo.jpg';
    },

    sendMessageHandler(messageContent) {
      const user = this.getUser;
      const token = this.getToken;
      if (!token || !user || !user.id) {
        console.error("Usuário não autenticado ou token ausente.");
        return;
      }
      if (!this.isConnected) {
        console.error("WebSocket não está conectado.");
        return;
      }
      const messagePayload = {
        eventType: "USER_MESSAGE",
        content: {
          message: messageContent,
          toUserId: this.chatData.id,
        },
      };
      console.log("📝 Enviando payload da mensagem:", messagePayload);
      this.sendMessage(messagePayload);

      this.$nextTick(() => {
        this.container = 0
      });

    },

    OwnerMessage(id) {
      return id == this.getUser.id ? this.getUser.username : this.chatData.name;
    },

     handleScroll() {
      const container = this.$refs.messageContainer;
      console.log(container.scrollTop)
      if (this.isLoadingOlder || !this.hasMoreMessages) return;


     
      if (!container) return;


      const offset = -799; 
      console.log(container.scrollTop)
      if (container.scrollTop <= offset * (this.page * 2)) {
        console.log(container.scrollTop)
        console.log("🔄 Scroll atingiu topo, carregando mais mensagens...");
        this.loadOlderMessages();
      }
    },


    async loadOlderMessages() {
      this.isLoadingOlder = true;

      this.page += 1;
      console.log(`🔎 Buscando página ${this.page} de mensagens antigas...`);

      try {
        const olderMessages = await this.fetchChatMessages({
          toUserId: this.chatData.id,
          fromUserId: this.getUser.id,
          page: this.page,
          size: this.size,
        });

        if (!olderMessages || olderMessages.length < this.size) {
          this.hasMoreMessages = false;
          console.log("🚫 Não há mais mensagens a carregar.");
        }

        this.$nextTick(() => {
          this.isLoadingOlder = false;
        });
      } catch (error) {
        console.error("❌ Erro ao carregar mensagens antigas:", error);
        this.isLoadingOlder = false;
      }
  }

  },

  watch: {
  chatData: {
    immediate: true,
    handler() {
      // Zera mensagens e reinicia paginação
      this.$store.commit("websocket/SET_MESSAGES", []);
      this.page = 0;
      this.hasMoreMessages = true;
      this.isLoadingOlder = false;

      // Carrega a primeira página
      this.fetchChatMessages({
        toUserId: this.chatData.id,
        fromUserId: this.getUser.id,
        page: this.page,
        size: this.size,
      }).then((msgs) => {
        if (!msgs || msgs.length < this.size) {
          this.hasMoreMessages = false;
        }
      });
    },
  },
},

};
</script>

<style scoped>
.load-more {
  text-align: center;
  padding: 0.5rem;
}
.load-more button {
  background-color: #5865f2;
  color: white;
  padding: 8px 14px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}
.load-more button:hover {
  background-color: #4752c4;
}
</style>
