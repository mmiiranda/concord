
<template>
    <div class="flex gap-2">
        <div class="flex items-center w-12 h-12 overflow-hidden rounded-full">
            <img 
                :src="getImage(getUser.imagePath)" 
                alt="User Profile"
                class="size-full object-cover"
            />
        </div>
        <div class="flex flex-col justify-center">
            <h2 class="text-lg font-bold">{{ getUser.name }}</h2>
            <p class="text-sm text-gray-300">{{ getUser.username }}</p>
        </div>
    </div>
</template>

<script>
import defaultImage from "@/assets/default-avatar.png";
import { mapGetters } from "vuex";

export default {
    name: "UserProfile",
    data() {
        return {
            defaultImage 
        };
    },
    computed:{
        ...mapGetters(["getUser"])
    },
    methods:{
        getImage(imagePath){
            return imagePath ? `${process.env.VUE_APP_API_URL}/api/files/images?file-id=${imagePath}`: 'no-photo.jpg';
        },
    }
    
};
</script>

<style scoped>
img {
    display: block;
    max-width: 100%;
    max-height: 100%;
}
</style>
