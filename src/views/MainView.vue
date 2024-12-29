<template>
  <div class="bg-cleangray h-dvh flex overflow-hidden">
    <sideBar />
    <div class="text-white">
      <MainContent />
    </div>
    <footerConfig />  
  </div>
</template>

<script>
import sideBar from "@/components/sideBar/sideBar.vue"
import MainContent from "@/components/main/MainContent.vue"
import footerConfig from "@/components/footer/footerConfig.vue"

export default {
  name: 'MainView',
  components: { 
    sideBar,
    MainContent,
    footerConfig,
    
  }
  
}
</script>
