
class WebSocketService {
  constructor() {
    this.socket = null;
    this.messageQueue = [];
    this.isConnected = false;
    this.openHandlers = [];
    this.closeHandlers = [];
    this.errorHandlers = [];
    this.messageHandlers = [];
    this.token = null;
  }

  connect(token) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log("✅ WebSocket já conectado.");
      return;
    }

    if (!token) {
      console.error("⚠️ Token JWT ausente. WebSocket não pode conectar.");
      return;
    }

    this.token = token;
    console.log("🔄 Tentando conectar ao WebSocket com token:", token);

    this.socket = new WebSocket(`${process.env.VUE_APP_WS_URL}/ws`);

    this.socket.onopen = () => {
      console.log("✅ WebSocket conectado com sucesso!");
      this._sendConnectMessage();
    };

    this.socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log("📩 Mensagem recebida do WebSocket:", message);
        this.messageHandlers.forEach((handler) => handler(message));
      } catch (error) {
        console.error("⚠️ Erro ao processar mensagem recebida:", error, "Dados:", event.data);
      }
    };

    this.socket.onclose = (event) => {
      console.warn("❌ WebSocket desconectado:", {
        code: event.code,
        reason: event.reason,
        wasClean: event.wasClean,
      });
      this.isConnected = false;
      this.closeHandlers.forEach((handler) => handler());
    };

    this.socket.onerror = (error) => {
      console.error("⚠️ Erro no WebSocket:", error);
      this.errorHandlers.forEach((handler) => handler(error));
    };
  }

  _sendConnectMessage() {
    if (this.token && this.socket && this.socket.readyState === WebSocket.OPEN) {
      const connectMessage = {
        eventType: "CONNECT",
        content: {
          token: this.token,
        },
      };

      console.log("📤 Enviando mensagem CONNECT:", connectMessage);
      this.socket.send(JSON.stringify(connectMessage));

      // Definir isConnected como true após enviar CONNECT
      this.isConnected = true;
      this._flushMessageQueue();
      this.openHandlers.forEach((handler) => handler());
    } else {
      console.error("⚠️ WebSocket não está conectado. Não foi possível enviar CONNECT.");
    }
  }

  _flushMessageQueue() {
    console.log("📤 Enviando mensagens pendentes na fila:", this.messageQueue);
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      this.sendMessage(message);
    }
  }

  disconnect() {
    if (this.socket) {
      console.log("⛔ Encerrando conexão WebSocket...");
      this.socket.close();
      this.socket = null;
      this.isConnected = false;
    }
  }


  sendMessage(message) {
    if (!this.isConnected) {
      console.warn("🔄 WebSocket não está conectado. Adicionando mensagem à fila:", message);
      this.messageQueue.push(message);
      return;
    }

    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log("📤 Enviando mensagem pelo WebSocket:", message);
      this.socket.send(JSON.stringify(message));
      console.log("📤 Mensagem enviada pelo WebSocket.");
    } else {
      console.error("⚠️ WebSocket não está conectado. Mensagem não enviada:", message);
    }
  }


  onOpen(handler) {
    this.openHandlers.push(handler);
  }

  onClose(handler) {
    this.closeHandlers.push(handler);
  }

  onError(handler) {
    this.errorHandlers.push(handler);
  }

  onMessage(handler) {
    this.messageHandlers.push(handler);
  }
}

export default new WebSocketService();
