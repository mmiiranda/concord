    <template>
    <div class="flex flex-col">
        <div class="flex justify-between items-center border-b-2  border-darkblue/80     px-3 py-2">
            <h3 class="text-lg font-bold">Direct messages</h3>
        </div>
        <div class="flex flex-col gap-2 p-2 mt-2">
            <miniFriendProfile 
            v-for="(friend, index) in friends" 
                :key="index" 
                :name="friend.name"
                :src="friend.src" 
            />
        </div>
    </div>
</template>

<script>
import miniFriendProfile from '@/components/friends/miniFriendProfile.vue';


    export default {
        name: "homeSideBarContent",
        data(){
            return {
                friends: [
                { id: 1, name: "JoãoDIas", src: "https://preview.redd.it/personagens-aleat%C3%B3rios-com-camisas-de-time-cr%C3%A9ditos-das-v0-w2nla01ji0md1.jpg?width=382&format=pjpg&auto=webp&s=3ccf31f1375cd203f6d82804fec7e49c045d1af4" , newMessage: true },
                { id: 2, name: "MariaMela", src: "https://i.pinimg.com/236x/31/6d/7f/316d7fb24c30d4704881cc543e7765bd.jpg" ,  newMessage: true},
                { id: 3, name: "CarlosBLue", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1g4jOvA8j6QTcmIuPazNZK3A1m_iys0Hatw&s" ,  newMessage: false},
                ],
            }
        },
        components: {
            miniFriendProfile
        }
    }
</script>