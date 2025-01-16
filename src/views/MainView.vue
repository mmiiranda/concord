<template>
  <div class="bg-cleangray h-[90dvh] flex overflow-hidden">
    <sideBar />
    <div class="text-white w-full">
      <MainContent v-if="!activeChat"/>  
      <ChatContent v-else :chatData="activeChat"/> 
      <WsTst /> 
    </div>
    <footerConfig />  
  </div>
</template>

<script>
import sideBar from "@/components/sideBar/sideBar.vue";
import MainContent from "@/components/main/MainContent.vue";
import footerConfig from "@/components/footer/footerConfig.vue";
import ChatContent from "@/components/chat/chatContent.vue";
import { mapActions, mapGetters } from "vuex";
import WsTst from "@/components/wsTest/wsTst.vue";

export default {
  name: "MainView",
  components: { 
    sideBar,
    footerConfig,
    ChatContent,
    MainContent,
    WsTst
  },
  computed: {
    ...mapGetters("chat", ["getActiveChat"]),
    activeChat() {
      return this.getActiveChat; 
    }
  },
  methods: {
    ...mapActions("chat", ["setActiveChat"]), 
    ...mapActions(["fetchFriends", "fetchServers"]) 
  },
  created() {
    this.setActiveChat(null); 
    this.fetchFriends();  
    this.fetchServers();
  }
};
</script>

