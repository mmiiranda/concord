<template>
        <input :type="type" 
        :value="value"
        class="bg-purple hover:bg-zinc-400 transition-all w-full p-2 text-white font-bold outline-none rounded shadow cursor-pointer" />
</template>

<script>
    export default {
        name: "butonAlt",
        props: {
            type: {
                type: String,
                required: true 
            },
            value: {
                type: String,
                required: true
            },
        }
    }
</script>

