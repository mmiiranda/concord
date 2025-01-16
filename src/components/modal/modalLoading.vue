<template>
    <ModalOverlay>
        <div class="w-90 bg-cleangray px-16 py-8 rounded-lg text-white grid place-items-center animate-spawn">
            <div class="w-20 h-20 bg-transparent border-8 border-t-white 
            border-darkblue animate-spin rounded-full"></div>
            <h2 class="font-bold text-xl mt-2">Carregando...</h2>
        </div>
    </ModalOverlay>
</template>

<script>
import ModalOverlay from './modalOverlay.vue';

    export default {
        name: "modalLoading",
        components:{
            ModalOverlay
        }
    }
</script>