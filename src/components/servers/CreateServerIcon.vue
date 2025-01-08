<template>
    <div 
        class="rounded-full w-14 h-14 cursor-pointer bg-green-500 flex items-center justify-center
               text-deadgreen bg-cleangray text-2xl font-bold hover:bg-deadgreen hover:text-white 
               transition-all duration-300 ease-in-out"
        @click="openModal"
    >
        +
    </div>
</template>

<script>
export default {
    name: "CreateServerIcon",
    methods: {
        openModal() {
            console.log("Clicou no botão de criar servidor!");
            this.$emit("openModal");
        }
    }
};
</script>
