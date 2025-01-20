<template>
  <div class="h-full w-full flex flex-col gap-4 px-10 py-6">
    <h2 class="font-bold text-lg">{{ chatTitle }}</h2>
    <div class="h-[2px] w-full bg-shadowgray"></div>

    <div 
      ref="messageContainer"
      class="h-full overflow-y-auto flex flex-col justify-end gap-2"
      @scroll="handleScroll"
    >
      <div v-for="message in reversedMessages" :key="message.id || message.timestamp" class="message">
        <MessageChat
          :name="OwnerMessage(message.fromUserId)"
          :date="formatDate(message.timestamp)"
          :hour="formatHour(message.timestamp)"
          :src="message.senderAvatar || 'no-photo.jpg'"
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
      isLoadingMore: false, // Evita múltiplos carregamentos ao rolar para cima
      currentPage: 0,       // Página atual de mensagens carregadas
    };
  },
  computed: {
    ...mapGetters(["getToken", "getUser"]),
    ...mapGetters("websocket", ["messages", "isConnected"]),
    chatTitle() {
      return this.chatData.type === "server"
        ? `Canal: ${this.chatData.name}`
        : `DM com: ${this.chatData.name}`;
    },
    reversedMessages() {
      return [...this.messages].reverse(); // Inverte as mensagens para exibição
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

    OwnerMessage(id) {
      return id == this.getUser.id ? this.getUser.username : this.chatData.name;
    },

    handleScroll() {
      const container = this.$refs.messageContainer;

      if (container.scrollTop === 0 && !this.isLoadingMore) {
        this.isLoadingMore = true;
        this.currentPage += 1;

        this.fetchChatMessages({
          toUserId: this.chatData.id,
          fromUserId: this.getUser.id,
          page: this.currentPage,
          size: 20,
        }).then(() => {
          this.isLoadingMore = false;
        });
      }
    },

  },

  watch: {
    chatData: {
      immediate: true,
      handler() {
        this.currentPage = 0; // Reinicia a página ao trocar de chat
        this.$store.commit("websocket/SET_MESSAGES", []); // Zera as mensagens no Vuex

        this.fetchChatMessages({
          toUserId: this.chatData.id,
          fromUserId: this.getUser.id,
          page: 0,
          size: 20,
        })
      },
    },
  },

};
</script>
