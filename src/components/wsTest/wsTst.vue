<template>
  <div>
    <h2>WebSocket Messages</h2>
    <button @click="connectToWebSocket">Conectar WebSocket</button>
    <button @click="disconnectFromWebSocket">Desconectar</button>
    <button @click="sendTestMessage">Enviar Mensagem</button>

    <p v-if="!isConnected">🔴 Desconectado</p>
    <p v-if="isConnected">🟢 Conectado</p>

    <ul>
      <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "WebSocketManager",
  computed: {
    ...mapGetters("websocket", ["isConnected", "messages"]),
  },
  methods: {
    ...mapActions("websocket", ["connectWebSocket", "sendMessage", "disconnectWebSocket"]),

    connectToWebSocket() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token ausente. Não é possível conectar ao WebSocket.");
        return;
      }
      this.connectWebSocket(token); // Vuex action
    },

    sendTestMessage() {
      const messagePayload = {
        eventType: "USER_MESSAGE",
        content: { message: "Olá, WebSocket!" },
      };
      this.sendMessage(messagePayload); // Vuex action
    },

    disconnectFromWebSocket() {
      this.disconnectWebSocket(); // Vuex action
    },
  },
};
</script>
