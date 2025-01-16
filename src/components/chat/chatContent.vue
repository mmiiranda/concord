<template>
  <div class="h-full w-full flex flex-col gap-4 px-10 py-6">
    <h2 class="font-bold text-lg">{{ chatTitle }}</h2>
    <div class="h-[2px] w-full bg-shadowgray"></div>

    <div class="h-full overflow-y-auto flex flex-col-reverse gap-2">
      <div v-for="message in messages" :key="message.id" class="message">
        <MessageChat
          :name="this.chatData.name"
          :date="formatDate(message.timestamp)"
          :hour="formatHour(message.timestamp)"
          :src="this.chatData.imagePath || 'no-photo.jpg'"
          :message="message.content"
        />
      </div>
    </div>

    <form class="relative" @submit.prevent="sendMessageHandler">
      <ChatInput @sendMessage="sendMessageHandler" />
    </form>
  </div>
</template>

<script>
import MessageChat from "./messageChat.vue";
import ChatInput from "../input/chatInput.vue";
import { mapGetters } from "vuex";

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
      messages: [],
      loading: false,
      currentPage: 0,
      totalPages: 1,
    };
  },
  computed: {
    ...mapGetters(["getToken", "getUser"]),
    chatTitle() {
      return this.chatData.type === "server"
        ? `Canal: ${this.chatData.name}`
        : `DM com: ${this.chatData.name}`;
    },
  },
  methods: {
    async fetchChatMessages(page = 0, size = 10) {
      this.loading = true;

      const token = this.getToken;
      const user = this.getUser;

      if (!user || !user.id) {
        console.error("Usuário não autenticado ou ID do usuário não encontrado.");
        this.loading = false;
        return;
      }

      const endpoint = `http://localhost:8080/api/messages/chat?toUserId=${this.chatData.id}&fromUserId=${user.id}&page=${page}&size=${size}`;
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
        if (page === 0) {
          // Primeira página
          this.messages = data.content.reverse();
        } else {
          // Concatenar mais mensagens
          this.messages = [...this.messages, ...data.content.reverse()];
        }
        this.totalPages = data.totalPages;
        this.currentPage = data.number;
      } catch (error) {
        console.error("Erro ao carregar mensagens:", error);
      } finally {
        this.loading = false;
      }
    },

    async loadMoreMessages() {
      if (this.currentPage + 1 < this.totalPages) {
        await this.fetchChatMessages(this.currentPage + 1);
      }
    },

    sendMessageHandler(messageContent) {
      const user = this.getUser;
      const token = this.getToken;

      if (!token || !user || !user.id) {
        console.error("Usuário não autenticado ou token ausente.");
        return;
      }

      // Verificar se o WebSocket está conectado
      if (!this.$store.getters["websocket/isConnected"]) {
        console.error("WebSocket não está conectado.");
        return;
      }

      // Exemplo de mensagem extra (se quiser mandar info do token junto)
      // Mas CUIDADO: pode não ser necessário ou o servidor pode não esperar esse payload.
      const extraTokenMessage = {
        eventType: "USER_MESSAGE",
        content: {
          token: token, // ou localStorage.getItem("token")
        },
      };
      this.$store.dispatch("websocket/sendMessage", extraTokenMessage);

      // Mensagem real de usuário
      const messagePayload = {
        eventType: "USER_MESSAGE",
        content: {
          message: messageContent,
          toUserId: this.chatData.id,
        },
      };
      this.$store.dispatch("websocket/sendMessage", messagePayload);

      // Exibir localmente como "Enviando..."
      const timestamp = new Date().toISOString();
      const newMessage = {
        id: Date.now(),
        senderName: "Você",
        timestamp,
        senderAvatar: user.avatar || "no-photo.jpg",
        content: messageContent,
        status: "Enviando...",
      };
      this.messages.unshift(newMessage);

      // Simular envio e atualizar status
      setTimeout(() => {
        const index = this.messages.findIndex((msg) => msg.id === newMessage.id);
        if (index !== -1) {
          this.messages[index].status = "✓ Enviado";
        }
      }, 1000);
    },

    formatDate(timestamp) {
      // formate a data real aqui
      return timestamp;
    },

    formatHour(timestamp) {
      // formate a hora real aqui
      return timestamp;
    },
  },

  watch: {
    // Sempre que trocar de chat, zera as mensagens e carrega de novo
    chatData: {
      immediate: true,
      handler() {
        this.messages = [];
        this.currentPage = 0;
        this.fetchChatMessages();
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
