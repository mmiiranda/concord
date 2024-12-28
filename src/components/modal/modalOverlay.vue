<template>
    <div class="fixed w-full h-full bg-black/50  grid place-items-center">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "ModalOverlay"
    }
</script>