class WebSocketService {
  constructor() {
    this.socket = null;
    this.messageQueue = []; // Fila para mensagens antes do CONNECT
    this.isConnected = false; // Indicador de conexão autenticada
    this.messageHandlers = [];
    this.openHandlers = [];
    this.closeHandlers = [];
    this.errorHandlers = [];
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

    this.socket = new WebSocket("ws://localhost:8080/ws");

    // Quando a conexão é aberta
    this.socket.onopen = () => {
      console.log("✅ WebSocket conectado com sucesso!");
      this._sendConnectMessage(); // Envia o evento CONNECT
      this.isConnected = true; // Marca conexão como autenticada
      this._flushMessageQueue(); // Processa mensagens pendentes
      this.openHandlers.forEach((handler) => handler());
    };

    // Quando uma mensagem é recebida
    this.socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log("📩 Mensagem recebida do WebSocket:", message);
        this.messageHandlers.forEach((handler) => handler(message));
      } catch (error) {
        console.error("⚠️ Erro ao processar mensagem recebida:", error, "Dados:", event.data);
      }
    };

    // Quando a conexão é encerrada
    this.socket.onclose = (event) => {
      console.warn("❌ WebSocket desconectado:", {
        code: event.code,
        reason: event.reason,
        wasClean: event.wasClean,
      });
      this.isConnected = false; // Resetar indicador de conexão
      this.closeHandlers.forEach((handler) => handler());
    };

    // Quando ocorre um erro
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
      console.log("🛠️ Estrutura JSON CONNECT enviada:", JSON.stringify(connectMessage, null, 2));
      this.socket.send(JSON.stringify(connectMessage));
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
    // Se ainda não conectou (CONNECT não foi enviado), faz fila
    if (!this.isConnected) {
      console.warn("🔄 CONNECT ainda não enviado. Adicionando mensagem à fila:", message);
      this.messageQueue.push(message);
      return;
    }

    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log("📤 Enviando mensagem pelo WebSocket:", message);
      // Aqui fazemos o JSON.stringify APENAS uma vez
      this.socket.send(JSON.stringify(message));
    } else {
      console.error("⚠️ WebSocket não está conectado. Mensagem não enviada:", message);
    }
  }

  onMessage(handler) {
    this.messageHandlers.push(handler);
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
}

export default new WebSocketService();
