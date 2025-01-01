<template>
    <div>
        <label :for="name">
            {{ label    }}
        </label>
        <input :type="type" 
        :name="name"
        :placeholder="placeholder"
        class="bg-black w-full p-2 text-white outline-none rounded" 
        :value="value"
        :disabled="disabled" 
          />
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
            },
            placeholder: String,
            disabled: Boolean,
            value: String,
        }
    }
</script>