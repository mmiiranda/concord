<template>
    <div class="flex flex-col gap-10">
        <div class="flex justify-between items-center">
            <h3 class="text-2xl font-bold">Amigos</h3>
            <div>
                <img src="../../icon/config.svg" alt="">
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <FriendInMenu 
            v-for="(friend, index) in friends" 
                :key="index" 
                :name="friend.name"
                :src="friend.src" 
            />
        </div>
    </div>
</template>

<script>
import FriendInMenu from '@/components/friends/friendInMenu.vue';


    export default {
        name: "homeSideBarContent",
        data(){
            return {
                friends: [
                { id: 1, name: "JoãoDIas", src: "https://preview.redd.it/personagens-aleat%C3%B3rios-com-camisas-de-time-cr%C3%A9ditos-das-v0-w2nla01ji0md1.jpg?width=382&format=pjpg&auto=webp&s=3ccf31f1375cd203f6d82804fec7e49c045d1af4" },
                { id: 2, name: "MariaMela", src: "https://i.pinimg.com/236x/31/6d/7f/316d7fb24c30d4704881cc543e7765bd.jpg" },
                { id: 3, name: "CarlosBLue", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1g4jOvA8j6QTcmIuPazNZK3A1m_iys0Hatw&s" },
                ],
            }
        },
        components: {
            FriendInMenu
        }
    }
</script>