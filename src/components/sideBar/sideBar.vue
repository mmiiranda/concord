<template>
    <div class="flex h-[90vh] bg-darkblue px-4 py-6">
        <div class="flex flex-col items-center justify-between" @click="toogleBar">
            <div class="flex flex-col">
                <MiniServerIcon />
                <div class="w-4/5 bg-hovergray h-1 mt-2"></div>
                <div class="flex flex-col mt-2 gap-3">                
                    <MiniServerIcon />
                    <MiniServerIcon />
                    <MiniServerIcon />
                    <MiniServerIcon />
                    <MiniServerIcon />
                </div>
            </div>
            <MiniServerIcon @click="toogleModalCreateServer"/>
        </div>
        
        <!-- Adicionando animação com transições -->
        <transition name="slide">
            <div 
                v-if="isOpen" 
                class="flex flex-col ml-8 text-white min-w-48"
            >
                <div>
                    <HomeSideBarContent />
                </div>
            </div>
        </transition>
    </div>
    <createServer @close="toogleModalCreateServer" v-if="ModalCreateServer" />
</template>


<script>
import MiniServerIcon from "@/components/servers/MiniServerIcon.vue"
import createServer from "@/components/form/CreateServer.vue";
import HomeSideBarContent from "./home/homeSideBarContent.vue";

    export default {
        name: "sideBar",
        data(){
            return{
                isOpen: true,
                ModalCreateServer: false    
            }
        },
        methods: {
            toogleBar(){
                this.isOpen = !this.isOpen;
            },
            toogleModalCreateServer(){
                this.ModalCreateServer = !this.ModalCreateServer
            }
        },
        components : {
            MiniServerIcon,
            createServer,
            HomeSideBarContent
        }
    }
</script>