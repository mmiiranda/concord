<template>
    <div class="friend-chat-row border-b-2 py-3 border-[#808080]/70 flex w-full justify-between items-center
    hover:bg-gray/20 px-2 transition-all ease-in">
         <div class="flex items-center gap-2 cursor-pointer">
            <div class=" bg-darkblue
            flex h-9 w-9 relative rounded-full justify-center items-center">
                   <img :src="getImage(src)" class="w-full h-full rounded-full">
               </div>
             <div class="flex flex-col justify-center">
                 <div>
                     <h4 class="font-bold text-sm"> {{ name }} </h4>
                 </div>
                 <div>
                     <h5 class="text-[12px] text-gray -mt-1"> @{{ username }} </h5>
                 </div>
             </div>
         </div>

        <form 
        @submit.prevent="submitRequest($event)"
        class="flex gap-2">
            <button class="rounded-full bg-darkblue w-6 h-6 grid place-items-center
            cursor-pointer"
            v-show="origin != getUser.id"
            data-value="accept"
            type="submit"
            >
                <img 
                src="../icon/Done.svg" 
                class="object-cover size-3"
                alt="chat icon" 
                >
            </button>
            <button class="rounded-full bg-darkblue w-6 h-6 grid place-items-center
            cursor-pointer"
            :data-value="origin != getUser.id ? 'deny' : 'cancel'"
            type="submit"
            >
                <img src="../icon/close.svg" 
                class="object-cover size-3"
                alt="chat icon">
            </button>
        </form>
    </div>
 </template>
 
 <script>
import { mapGetters } from 'vuex';

     export default {
         name: "friendsForChat",
         props: {
             src: {
                 type: String,
                 required: true,
             },
             name: {
                 type: String,
                 required: true,
             },
             username: {
                 type: String,
                 required: true,
             },
             origin: {
                type: Number,
                required: true,
             },
             destination: {
                type: Number,
                required: true,
             },
             id: {
                type: Number,
                required: true,
             },
         },
         computed:{
            ...mapGetters(["getUser", "getToken"])
         },
         methods: {
            getImage(imagePath){
                return imagePath ? `${process.env.VUE_APP_API_URL}/api/files/images?file-id=${imagePath}`: 'no-photo.jpg';
            },
            async submitRequest(event){
                try{
                    const value = event.submitter.getAttribute("data-value");   

                    const response = await fetch(`${process.env.VUE_APP_API_URL}/api/friendships/${this.id}/${value}`,{
                            method: 'PATCH',
                            headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${this.getToken}`
                            }
                        }
                    )  

                    this.$emit("submited")

                    console.log(response)
                    
                }catch(err){    
                    console.error(err)
                }
            }
         }
     }
 </script>
 
 <style>
 .friend-chat-row:last-child{
     border: none;
 }
 </style>