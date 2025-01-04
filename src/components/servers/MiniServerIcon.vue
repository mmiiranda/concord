<template>
    <div 
        class="rounded-full w-14 h-14 cursor-pointer bg-gray flex items-center justify-center"
        @click="navigateToServer"
    >
        <img 
            v-if="imagePath" 
            :src="imagePath" 
            :alt="name || 'Servidor'" 
            class="w-full h-full object-cover rounded-full"
        />
        <span v-else class="text-white text-xs">{{ name ? name[0] : "S" }}</span>
    </div>
</template>

<script>
export default {
    name: "MiniServerIcon",
    props: {
        link: {
            type: String,
            required: true
        },
        name: {
            type: String,
            default: "Servidor" // Se não vier nada, usa "Servidor"
        },
        imagePath: {
            type: String,
            default: null
        }
    },
    methods: {
        navigateToServer() {
            this.$router.push(this.link);
        }
    }
};
</script>
