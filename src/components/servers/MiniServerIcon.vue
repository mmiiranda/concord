<template>
    <div class="rounded-full bg-gray w-14 h-14 cursor-pointer">
        
    </div>
</template>

<script>
    export default {
        name: "MiniServerIcon",
        props: {
            link: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }
    }
</script>