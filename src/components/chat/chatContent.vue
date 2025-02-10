<template>
  <div class="h-full w-full flex flex-col gap-4 px-10 py-6 animate-spawn">
    <h2 class="font-bold text-lg text-center md:text-left">{{ chatTitle }}</h2>

    <div 
      ref="messageContainer"
      class="h-full overflow-y-auto flex flex-col-reverse gap-2 border-t-2 border-darkblue"
      @scroll.passive="handleScroll"
    >
      <div v-for="(messages, date) in groupedMessages" :key="date">

        <div class="text-center text-gray-500 text-sm font-semibold py-2">
          <span class="text-purple"> {{ formatDate(date) }}</span>
        </div>

        <div 
          v-for="(message, index) in messages" 
          :key="message.id || message.timestamp"
        >
          <MessageChat
            :name="OwnerMessage(message.fromUserId)"
            :msgTimestamp="message.timestamp"
            :src="getImageOwner(message.fromUserId) || 'no-photo.jpg'"
            :message="message.content"

            
            :showHeader="shouldShowHeader(index, messages)"
          />
        </div>
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
      isLoadingOlder: false, 
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
    
    groupedMessages() {
      if (!this.messages || this.messages.length === 0) return {};

      return this.messages.reduce((groups, message) => {
        const messageDate = new Date(message.timestamp).toLocaleDateString();
        if (!groups[messageDate]) {
          groups[messageDate] = [];
        }
        groups[messageDate].unshift(message); 
        return groups;
      }, {});
    }
  },
  methods: {
    ...mapActions("websocket", ["sendMessage", "fetchChatMessages"]),

    getImageOwner(ownerId){
      if(ownerId == this.getUser.id) return this.getImage(this.getUser.imagePath);
      return this.getImage(this.chatData.imagePath) 
    },

    getImage(imagePath){
        return imagePath ? `${process.env.VUE_APP_API_URL}/api/files/images?file-id=${imagePath}`: 'no-photo.jpg';
    },

    shouldShowHeader(index, messages) {
      // Se for a 1ª mensagem do array, mostra cabeçalho
      if (index === 0) return true;

      // Se o autor atual for diferente do autor anterior, mostra cabeçalho
      const atual = messages[index];
      const anterior = messages[index - 1];
      return atual.fromUserId !== anterior.fromUserId;
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
      if (this.isLoadingOlder || !this.hasMoreMessages) return;

      if (!container) return;

      const offset = -799; 
      if (container.scrollTop <= offset * (this.page * 2)) {
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
    },

    formatDate(dateString) {
      const today = new Date();
      
      const [day, month, year] = dateString.split("/"); 
      const messageDate = new Date(`${year}-${month}-${day}T00:00:00`); 

      today.setHours(0, 0, 0, 0);
      messageDate.setHours(0, 0, 0, 0);

      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      if (messageDate.getTime() === today.getTime()) {
        return "Today";
      }

      if (messageDate.getTime() === yesterday.getTime()) {
        return "Yesterday";
      }

      return messageDate.toLocaleDateString("en-US", {
        month: "short", 
        day: "2-digit", 
        year: "numeric", 
      });
    }


  },

  watch: {
    chatData: {
      immediate: true,
      handler() {
        this.$store.commit("websocket/RESET_MESSAGES");
        this.page = 0;
        this.hasMoreMessages = true;
        this.isLoadingOlder = false;

        if (!this.chatData.id) return;

        this.$nextTick(() => {
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
