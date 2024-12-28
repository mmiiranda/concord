<template>
        <input type="checkbox" 
        :name="name"
        class="border-gray bg-darkblue" />
        <label :for="name">
            {{ label }}
        </label>
</template>

<script>
    export default {
        name: "inputAlt",
        props: {
            label: String,
            name: {
                type: String,
                required: true
            }
        }
    }
</script>