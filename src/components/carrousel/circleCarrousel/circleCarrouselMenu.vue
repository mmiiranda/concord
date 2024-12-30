<template>
    <div>
        <h2 class="font-bold text-3xl text-gray"> {{ title }} </h2>
        <div class="w-full flex gap-10 mt-4 overflow-hidden">
            <itemCarrousel title="GIL BALA" img="https://paraibacriativa.com.br/wp-content/uploads/2024/09/Gil-Bala-1024x1024.jpg"/>
            <itemCarrousel title="GIL BALA" img="https://paraibacriativa.com.br/wp-content/uploads/2024/09/Gil-Bala-1024x1024.jpg"/>
            <itemCarrousel title="GIL BALA" img="https://paraibacriativa.com.br/wp-content/uploads/2024/09/Gil-Bala-1024x1024.jpg"/>
        </div>
    </div>
</template>

<script>
import itemCarrousel from "./itemCarrousel.vue"

    export default {
        name: "circleCarrouselMenu",
        components: {
            itemCarrousel
        },
        props: {
            title: String
        }
        
    }
</script>