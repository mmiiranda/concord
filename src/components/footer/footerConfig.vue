<template>
    <div 
    :class="[
      'fixed bg-[#363636] text-white w-full flex flex-col min-h-screen',
      isPageOptionOpen ? 'translate-y-0' : 'translate-y-[calc(100dvh-5rem)]'
    ]">
        <headerFooter 
        @toogle-config="toogleConfig"
        />

        <div class="size-full grid px-4 md:px-10">
            <div class="bg-[#363636] overflow-y-auto h-[calc(100vh-10rem)] py-8 px-2 xl:px-12 rounded-t-lg flex flex-col">
              <h2 class="text-3xl font-bold">User Settings</h2>
              <UserSettings />
            </div>
          </div>
        
    </div> 
</template>

<script>
import headerFooter from "./headerFooter.vue"
import UserSettings from "./Settings/UserSettings.vue";

    export default {
        name: "footerConfig",
        data(){
            return {
                isPageOptionOpen: false
            }
        },
        components:{
            headerFooter,
            UserSettings
        },
        methods: {
            toogleConfig(){
                this.isPageOptionOpen = !this.isPageOptionOpen
            }
        }

    }
</script>