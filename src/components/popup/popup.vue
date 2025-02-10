<template>
    <div 
        ref="popup" 
        class="absolute bg-darkpurple shadow-md p-4 rounded-md"
        v-show="visible"
    >
        <slot></slot>
    </div>
</template>
  
<script>
export default {
    name: "PopupComp",
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        handleClickOutside(event) {
            if (this.$refs.popup && !this.$refs.popup.contains(event.target)) {
                this.$emit("close")
            }
        },
    },
    mounted() {
        document.addEventListener("click", this.handleClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener("click", this.handleClickOutside);
    },
    emits: ["close"]
};
</script>
