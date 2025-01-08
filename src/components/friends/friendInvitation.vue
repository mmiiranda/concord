<template>
    <div class="friend-chat-row border-b-2 py-3 border-[#718099] flex w-full justify-between items-center
    hover:bg-gray/20 px-2 transition-all ease-in">
         <div class="flex items-center gap-2">
             <div class="overflow-hidden flex h-9 w-9 relative">
                 <img :src="src" class="w-full h-full rounded-full">
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

        <div class="flex gap-2">
            <div class="rounded-full bg-darkblue w-6 h-6 grid place-items-center
            cursor-pointer"
            v-show="origin != this.getUser.id">
                <img 
                src="../icon/Done.svg" 
                class="object-cover size-3"
                alt="chat icon" 
                >
            </div>
            <div class="rounded-full bg-darkblue w-6 h-6 grid place-items-center
            cursor-pointer">
                <img src="../icon/close.svg" 
                class="object-cover size-3"
                alt="chat icon">
            </div>

        </div>
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
         },
         computed:{
            ...mapGetters(["getUser", "getToken"])
         },
         methods: {
    
         }
     }
 </script>
 
 <style>
 .friend-chat-row:last-child{
     border: none;
 }
 </style>