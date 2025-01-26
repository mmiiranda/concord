<template>
  <div class="h-full w-full flex flex-col gap-4 px-10 py-6">
    <h2 class="font-bold text-lg">{{ chatTitle }}</h2>

    <div class="h-full overflow-y-auto flex flex-col-reverse gap-2 border-t-2 border-darkblue">
      <div v-for="message in messages" :key="message.id || message.timestamp" class="message">
        <MessageChat
          :name="OwnerMessage(message.fromUserId)"
          :date="formatDate(message.timestamp)"
          :hour="formatHour(message.timestamp)"
          :src="message.senderAvatar || 'no-photo.jpg'"
          :message="message.content"
        />
      </div>
    </div>

    <div class="relative" >
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
      this.message = '';
    },

    formatDate(timestamp) {
      if (!timestamp) return '';
      const date = new Date(timestamp);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });
    },

    formatHour(timestamp) {
      if (!timestamp) return '';
      const date = new Date(timestamp);
      return date.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    },

    OwnerMessage(id){
      return id == this.getUser.id ? this.getUser.username : this.chatData.name
    }
  },

  watch: {
    chatData: {
      immediate: true,
      handler() {
        this.$store.commit("websocket/SET_MESSAGES", []); // Zera as mensagens no Vuex
        this.fetchChatMessages({
          toUserId: this.chatData.id,
          fromUserId: this.getUser.id,
          page: 0,
          size: 20,
        });
      },
    },
  },
};
</script>

<style scoped>
.status {
  font-size: 0.8rem;
  color: gray;
  margin-left: 8px;
}
.load-more button {
  background-color: #5865f2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
.load-more button:hover {
  background-color: #4752c4;
}
</style>
