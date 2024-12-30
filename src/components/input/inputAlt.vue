<template>
    <div>
        <label :for="name">
            {{ label }}
        </label>
        <input 
            :type="type" 
            :id="id"
            :name="name"
            :placeholder="placeholder"
            class="bg-black w-full p-2 text-white outline-none rounded"
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
        placeholder: String
    }
};
</script>
