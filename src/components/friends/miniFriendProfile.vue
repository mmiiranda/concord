<template>
    <div :class="['flex items-center gap-3   cursor-pointer  transition-all ease-in'
        , newMessage ? 'opacity-100' : 'opacity-80']">
        <div class="w-7 h-7 rounded-full
         overflow-hidden bg-darkblue">
            <img 
            class="w-full h-full object-cover"
            :src="getImage(src)">
        </div>
        <h5 class="text-md"> {{ name }} </h5>
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
        },
        methods: {
            getImage(imagePath){
                console.log(imagePath)
                return imagePath ? `${process.env.VUE_APP_API_URL}/api/files/images?file-id=${imagePath}`: 'no-photo.jpg';
            },
        }
    }
</script>