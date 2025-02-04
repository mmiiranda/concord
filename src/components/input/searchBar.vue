<template>
    <div class="flex text-white bg-[#202020] w-full px-2 rounded-md">
        <label :for="id" class="grid place-items-center">
            <img src="../icon/Search.svg" alt="Icone de Busca">
        </label>
        <input
            type="text"
            class="bg-transparent p-2 w-full outline-none"
            :placeholder="placeholder"
            :id="id"
            :name="name"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)" 
        />
    </div>
</template>

<script>
export default {
    name: "SearchBar",
    props:{
        name: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
        placeholder: String,
        modelValue: String 
    }
};
</script>
