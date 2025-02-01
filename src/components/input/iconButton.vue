<template>
    <button 
        :id="name" 
        :name="name" 
        :type="type" 
        class="text-white hover:bg-zinc-400 px-1 py-1 h-10 w-11 transition-all font-bold outline-none rounded-lg shadow"
    >
        <img 
            :src="src"  
            class="size-4/5 object-cover"    
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
            default: 'button'
        }
    }
}
</script>
