<template>
    <div>
        <input
            type="checkbox"
            :name="name"
            class="border-gray bg-darkblue"
            v-bind="$attrs"
        />
        <label :for="name">{{ label }}</label>
    </div>
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