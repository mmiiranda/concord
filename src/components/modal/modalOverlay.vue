<template>
    <div class="fixed top-0 left-0  w-full h-full bg-black/70  grid place-items-center z-50">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "ModalOverlay"
    }
</script>