<template>
        <input :type="type" 
        :value="value"
        class="bg-purple-600 hover:bg-zinc-400 transition-all w-full p-2 text-white font-bold outline-none rounded shadow" />
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

