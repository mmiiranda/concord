<template>
    <input 
    :id="name"
    :name="name" 
    :type="type" hidden>
    <label :for="name"
    class="bg-white hover:bg-zinc-400 px-2 py-1 h-10 w-11 transition-all text-black font-bold outline-none rounded-lg shadow">
        <img 
        :src="src"  
        class="w-full h-full object-cover"    
        />
    </label>
</template>

<script>
    export default {
        name: "iconButton",
        props: {
            src: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            type:{
                type: String,
                required: true
            }
        }
    }
</script>