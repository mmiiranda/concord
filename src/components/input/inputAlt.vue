<template>
    <div>
        <label :for="id">{{ label }}</label>
        <input
            v-bind="$attrs"
            :id="id"
            :name="name"
            :type="type"
            class="bg-black w-full p-2 text-white outline-none rounded"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        />
    </div>
</template>

<script>
export default {
    name: "InputAlt",
    props: {
        label: String,
        id: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true 
        },
        name: {
            type: String,
            required: true
        },
        placeholder: String,
        modelValue: String,
        disabled: Boolean,
        value: String,
    }
};
</script>
