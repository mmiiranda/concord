<template>
    <div class="fixed w-full h-full bg-black/50 top-0 left-0  grid place-items-center z-50">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "ModalOverlay"
    }
</script>