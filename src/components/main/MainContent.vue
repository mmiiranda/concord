<template>
    <div class="p-12 h-full">
        <div v-if="chat">
            <h1 class="font-bold text-6xl">Bem vindo, MauMau</h1>
            <circleCarrouselMenu title="Servidores" class="mt-12" />
            <circleCarrouselMenu title="Amigos" class="mt-10" />
        </div>
        <div class="flex h-full" v-else>
            <ChatContent title="Meus Testes bb" />
        </div>  
    </div>
</template>

<script>
import circleCarrouselMenu from "@/components/carrousel/circleCarrousel/circleCarrouselMenu.vue"
import ChatContent from "../chat/chatContent.vue";


    export default {
        name: "MainContent",
        data(){
            return{
                chat: false
            }  
        },
        components: {
            circleCarrouselMenu,
            ChatContent
        }
    }
</script>