<template>
  <div class="bg-cleangray h-dvh flex overflow-hidden">
    <sideBar />
    <createServer />
  </div>
</template>

<script>
import sideBar from "@/components/sideBar/sideBar.vue"
import createServer from "@/components/form/CreateServer.vue";

export default {
  name: 'MainView',
  components: {
    sideBar,
    createServer
  }
  
}
</script>
