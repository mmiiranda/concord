<template>
    <div 
        class="relative rounded-full w-14 h-14 cursor-pointer bg-cleangray flex items-center 
        justify-center hover:bg-purple-700"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
    >
        <img 
            v-if="imagePath" 
            :src="imagePath" 
            :alt="name || 'Servidor'" 
            class="w-full h-full object-cover rounded-full"
        />
        <span v-else class="text-white text-xl">{{ name[0].toUpperCase()}}</span>
        <transition name="fade">
            <div 
                v-if="hovered" 
                class="absolute left-full ml-2 bg-black text-white px-3 py-1 rounded shadow-lg whitespace-nowrap z-50"
            >
                {{ name }}
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: "MiniServerIcon",
    data(){
        return{
            hovered: false,
        }
    },
    props: {
        name: {
            type: String,
            default: "Servidor"
        },
        imagePath: {
            type: String,
            default: null
        }
    },
};
</script>
