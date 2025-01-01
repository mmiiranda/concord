<template>
    <div class="flex items-center gap-3 opacity-80 hover:opacity-100 cursor-pointer hover:underline transition-all ease-in">
        <div class="w-8 h-8 rounded-full
        grid place-items-center overflow-hidden">
            <img 
            class="w-full h-full object-cover"
            :src="src">
        </div>
        <h5> {{ name }} </h5>
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
        }
    }
</script>