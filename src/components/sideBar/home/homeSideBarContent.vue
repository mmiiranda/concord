<template>
  <div class="bg-sidebar h-full w-60 flex flex-col text-white">

    <div v-if="!activeChat || activeChat.type === 'dm'">
      <h2 class="text-lg font-bold px-4 py-2">Amigos</h2>
      <ul>
        <li
          v-for="friend in friendsList"
          :key="friend.id"
          class="cursor-pointer px-4 py-2 hover:bg-gray-700"
          @click="openDm(friend)"
        >
          {{ friend.username }}
        </li>
      </ul>
    </div>

    <div v-else-if="activeChat.type === 'server'">  
      <h2 class="text-lg font-bold px-4 py-2">Canais</h2>
      <ul>
        <li
          v-for="channel in channelsFromServer(activeChat.serverId)"
          :key="channel.id"
          class="cursor-pointer px-4 py-2 hover:bg-gray-700"
          @click="openServerChannel(channel)"
        >
          {{ channel.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SideBar",
  computed: {
    // lista de amigos e servers vindas do store raiz
    ...mapGetters(["getFriends", "getServers"]),
    // activeChat (do módulo chat)
    ...mapGetters("chat", ["getActiveChat"]),

    friendsList() {
      return this.getFriends;
    },
    activeChat() {
      return this.getActiveChat;
    }
  },
  methods: {
    // actions do módulo chat
    ...mapActions("chat", ["setActiveChat"]),

    // Exemplo: obter os canais do servidor pelo ID do servidor
    channelsFromServer(serverId) {
      const server = this.getServers.find((sv) => sv.id === serverId);
      // Ajuste conforme a forma como seus servers/canais são armazenados
      return server && server.channels ? server.channels : [];
    },

    openDm(friend) {
      this.setActiveChat({
        id: friend.id,
        name: friend.username,
        type: "dm" // Indica que é chat direto
      });
    },

    openServerChannel(channel) {
      this.setActiveChat({
        id: channel.id,
        name: channel.name,
        serverId: channel.serverId,
        type: "server" // Indica que é chat de servidor
      });
    }
  }
};
</script>

<style scoped>
.bg-sidebar {
  background-color: #2f3136;
}
</style>
