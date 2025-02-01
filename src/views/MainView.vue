<template>
  <div class="bg-cleangray h-[90dvh] flex overflow-hidden relative" ref="screen">
    <div v-if="isSidebarOpen" class="relative">
      <sideBar />
    </div>
    <div class="absolute" v-else>
      <ButtonAlt 
        type="button"
        value="Open"
        @click="openSidebar"
      />
    </div>
    <div class="text-white w-full">
      <MainContent v-if="!activeChat" />
      <ChatContent v-else :chatData="activeChat" />
      <RightSideBar />
      <WsTst />
    </div>
    <footerConfig class="z-50" />
  </div>
</template>

<script>
import sideBar from "@/components/sideBar/sideBar.vue";
import MainContent from "@/components/main/MainContent.vue";
import footerConfig from "@/components/footer/footerConfig.vue";
import ChatContent from "@/components/chat/chatContent.vue";
import { mapActions, mapGetters } from "vuex";
import WsTst from "@/components/wsTest/wsTst.vue";
import RightSideBar from "@/components/sideBar/rightSideBar.vue";
import ButtonAlt from "@/components/input/buttonAlt.vue";

export default {
  name: "MainView",
  data() {
    return {
      screenWidth: window.innerWidth,
    };
  },
  components: { 
    sideBar,
    footerConfig,
    ChatContent,
    MainContent,
    RightSideBar,
    ButtonAlt,
    WsTst,
  },
  computed: {
    ...mapGetters("chat", ["getActiveChat"]),
    activeChat() {
      return this.getActiveChat;
    },
    ...mapGetters("mobile", ["isSidebarOpen", "isMobile"]),
  },
  methods: {
    ...mapActions("chat", ["setActiveChat"]),
    ...mapActions("mobile", ["detectMobile", "closeSidebar", "openSidebar"]),
    ...mapActions(["fetchServers", "login"]),
    handleResize() {
      this.screenWidth = window.innerWidth;
      this.detectMobile();
    },
  },
  created() {
    this.setActiveChat(null);
    this.login();
    this.fetchServers();
  },
  mounted() {
    this.detectMobile(); 
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>
