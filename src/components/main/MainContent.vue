<template>
    <div class="p-12">
        <h1 class="font-bold text-6xl">Bem vindo, MauMau</h1>
        <circleCarrouselMenu title="Servidores" class="mt-12" />
        <circleCarrouselMenu title="Amigos" class="mt-10" />
    </div>
</template>

<script>
import circleCarrouselMenu from "@/components/carrousel/circleCarrousel/circleCarrouselMenu.vue"


    export default {
        name: "MainContent",
        components: {
            circleCarrouselMenu
        }
    }
</script>