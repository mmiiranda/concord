<template>
    <div class="flex flex-col gap-5 items-center text-center">
        <div 
        class="rounded-full w-48 h-48 overflow-hidden grid place-items-center">
            <img 
            class="w-full object-cover"
            :src="image">
        </div>
        <div>
            <h2 class="font-bold text-2xl"> {{ name }} </h2>
            <h4 class="text-white/60 text-sm"> @{{ nickname }} </h4>
        </div>
    </div>
</template>

<script>
    export default {
        name: "friendProfile",
        props: {
            name: {
                type: String,
                required: true
            },
            nickname: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
        }
        
    }
</script>