<template>
  <div class="h-full w-60 flex flex-col text-white">

    <div v-if="!activeChat || activeChat.type === 'dm'">
      <h2 class="text-lg font-bold px-4 py-2 bg-darkblue">Friends</h2>
      <ul>
        <li
          v-for="friend in friendsList"
          :key="friend.id"
          class="cursor-pointer px-4 py-2 hover:bg-gray/10"
          @click="openDm(friend)"
        >
          <MiniFriendProfile :name="friend.username" :src="friend.imagePath" />
        </li>
      </ul>
    </div>

    <div v-else-if="activeChat.type === 'server'">  
      <h2 classHoje="text-lg font-bold px-4 py-2">Canais</h2>
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
import MiniFriendProfile from "@/components/friends/miniFriendProfile.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SideBar",
  components: {
    MiniFriendProfile
  },
  computed: {
    ...mapGetters(["getFriends", "getServers"]),
    ...mapGetters("chat", ["getActiveChat"]),

    friendsList() {
      return this.getFriends;
    },
    activeChat() {
      return this.getActiveChat;
    }
  },
  methods: {
    ...mapActions("chat", ["setActiveChat"]),
    ...mapActions("mobile", ["closeSidebar"]),
    ...mapActions("websocket",["markMessagesAsRead"]),

    channelsFromServer(serverId) {
      const server = this.getServers.find((sv) => sv.id === serverId);
      return server && server.channels ? server.channels : [];
    },

    async openDm(friend) {
      if (this.activeChat && this.activeChat.id === friend.id && this.activeChat.type === "dm") {
        return;
      }

      this.setActiveChat({
        id: friend.id,
        name: friend.username,
        type: "dm" ,
        imagePath: friend.imagePath
      });

      await this.markMessagesAsRead({ fromUserId: friend.id });
      console.log(`✅ Mensagens de ${friend.id} marcadas como lidas.`);

      this.closeSidebar()
    },

    openServerChannel(channel) {
      this.setActiveChat({
        id: channel.id,
        name: channel.name,
        serverId: channel.serverId,
        type: "server" 
      });
    },
    
    getImage(imagePath){
      console.log(imagePath)
      return imagePath ? `${process.env.VUE_APP_API_URL}/api/files/images?file-id=${imagePath}`: "no-photo.jpg";
    }
  }
};
</script>

<style scoped>
.bg-sidebar {
  background-color: #2f3136;
}
</style>
