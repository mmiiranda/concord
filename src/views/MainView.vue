<template>
  <div v-if="isLoggedIn" class="bg-cleangray h-[90dvh] flex overflow-hidden relative" ref="screen">
    <div v-if="isSidebarOpen" class="relative">
      <sideBar />
    </div>
    <div class="absolute" v-else>
      <IconButton 
        type="button"
        :src="icon.MenuIcon"
        @click="openSidebar"
      />
    </div>
    <div class="text-white w-full">
      <MainContent v-if="!activeChat" />
      <ChatContent v-else :chatData="activeChat" />
      <RightSideBar />
    </div>
    <footerConfig class="z-50" />
    <FirstAcessModal v-show="getFirstAcess"/>
  </div>
</template>

<script>
import sideBar from "@/components/sideBar/sideBar.vue";
import MainContent from "@/components/main/MainContent.vue";
import footerConfig from "@/components/footer/footerConfig.vue";
import ChatContent from "@/components/chat/chatContent.vue";
import { mapActions, mapGetters } from "vuex";
import RightSideBar from "@/components/sideBar/rightSideBar.vue";
import MenuIcon from "@/components/icon/menuBugger.svg"
import FirstAcessModal from "@/components/form/firstAcessModal.vue";
import IconButton from "@/components/input/iconButton.vue";

export default {
  name: "MainView",
  data() {
    return {
      screenWidth: window.innerWidth,
      isLoggedIn: false,
      icon: {
        MenuIcon
      }
    };
  },
  components: { 
    sideBar,
    footerConfig,
    ChatContent,
    MainContent,
    RightSideBar,
    FirstAcessModal,
    IconButton
  },
  computed: {
    ...mapGetters("chat", ["getActiveChat"]),
    activeChat() {
      console.log("dskldsldksldksldksl", this.getActiveChat)
      return this.getActiveChat;
    },
    ...mapGetters("mobile", ["isSidebarOpen", "isMobile"]),
    ...mapGetters(["getFirstAcess"])
  },
  methods: {
    ...mapActions("chat", ["setActiveChat"]),
    ...mapActions("mobile", ["detectMobile", "closeSidebar", "openSidebar"]),
    ...mapActions(["login"]),
    handleResize() {
      this.screenWidth = window.innerWidth;
      this.detectMobile();
    },
  },
  async created() {
    this.isLoggedIn = await this.login();
    this.setActiveChat(null);
  },
  mounted() {
    this.detectMobile(); 
    window.addEventListener("resize", this.handleResize);
    console.log("primeiro acesso?",this.getFirstAcess)
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>
