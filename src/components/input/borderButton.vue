<template>
    <input :type="type"
    :value="value"
    class="bg-transparent border-2 py-2 px-3 font-bold cursor-pointer">
</template>

<script>
    export default {
        name: "borderButton",
        props: {
            value: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true
            }
        }
    }
</script>