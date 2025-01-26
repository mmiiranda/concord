<template>
    <button 
        :id="name" 
        :name="name" 
        :type="type" 
        class="bg-white hover:bg-zinc-400 px-2 py-1 h-10 w-11 transition-all text-black font-bold outline-none rounded-lg shadow"
    >
        <img 
            :src="src"  
            class="w-full h-full object-cover"    
        />
    </button>
</template>

<script>
export default {
    name: "IconButton",
    props: {
        src: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'button' // Define um valor padrão para o tipo
        }
    }
}
</script>
