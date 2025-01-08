<template>
    <div :class="['flex items-center gap-3   cursor-pointer  transition-all ease-in'
        , newMessage ? 'opacity-100' : 'opacity-80']">
        <div class="w-5 h-5 rounded-full
        grid place-items-center overflow-hidden">
            <img 
            class="w-full h-full object-cover"
            :src="src">
        </div>
        <h5 class="text-sm"> {{ name }} </h5>
    </div>
</template>

<script>
    export default {
        name: "miniFriendProfile",
        props:{
            src:{
                type: String,
                required: true,
            },
            name:{
                type: String,
                required: true,
            },
            newMessage: {
                type: Boolean,
                required: true
            }
        }
    }
</script>