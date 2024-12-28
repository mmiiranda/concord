<template>
    <div>
        <label :for="name">
            {{ label }}
        </label>
        <input :type="type" 
        :name="name"
        class="bg-black w-full p-2 text-white outline-none rounded" />
    </div>
</template>

<script>
    export default {
        name: "inputAlt",
        props: {
            label: String,
            type: {
                type: String,
                required: true 
            },
            name: {
                type: String,
                required: true
            }
        }
    }
</script>