<template>
    <div 
    :class="[
      'fixed bg-[#363636] text-white w-full flex flex-col h-screen',
      isPageOptionOpen ? 'mt-0' : 'mt-[90vh]'
    ]">
        <headerFooter 
        @toogle-config="toogleConfig"
        />

        <div class="flex size-full">
            <div 
            class="h-full w-1/5 min-w-56 bg-[#272727] py-6 px-4"
            >
                <h2 class="font-bold text-4xl">Settings</h2>
                <div class="pl-6 py-6">
                    <ul class="text-2xl flex flex-col   ">
                        <li class="cursor-pointer opacity-80 hover:opacity-100 hover:bg-cleangray p-2">
                            User Settings
                        </li>
                    </ul>   
                </div>
            </div>
            <div class="size-full grid px-10">
                <div class="bg-[#363636] py-12 px-2 xl:px-12 rounded-t-lg flex flex-col">
                    <h2 class="text-3xl ffont-bold font-bold">User Settings</h2>
                    <UserSettings />
                </div>
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