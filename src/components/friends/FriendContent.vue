<template>
    <div class="text-white flex flex-col w-full">
     <div class="flex border-2 border-darkblue w-full px-8 py-2">
         <div class="flex gap-2 border-r-2 border-gray pr-4">
             <img src="../icon/people.svg" alt="Icone de Pessoas">
             <h4 class="font-bold">Friends</h4>
         </div>
         <div class="flex ml-4 gap-5">
             <div>
                 <a href="#" data-friends-menu="1" @click.prevent="changeOption($event)"
                 :class="[option == 1 ? 'opacity-100' : 'opacity-60']"
                 >Friends</a>
             </div>
             <div>
                 <a href="#" data-friends-menu="2" @click.prevent="changeOption($event)"
                 :class="[option == 2 ? 'opacity-100' : 'opacity-60']">
                     All
                 </a>
             </div>
             <div>
                 <a href="#" data-friends-menu="3" @click.prevent="changeOption($event)"
                 :class="[option == 3 ? 'opacity-100' : 'opacity-60']">
                     Pending
                 </a>
             </div>
             <div>
                 <button class="bg-green px-2 rounded-lg" @click="option = 4">
                     Add Friend
                 </button>
             </div>
         </div>
     </div>
     <div class="flex flex-col w-2/3 p-8">
         <div v-if="option == 1">
             <SearchBar 
                 id="searchOnlineFriend" 
                 name="searchOnlineFriend" 
                 placeholder="Search"
                 @input="filterFriends($event)" 
             />
             <h3 class="font-bold text-sm mt-5">ONLINE - {{ filteredFriends.length }} </h3>
             <div class="flex flex-col w-full mt-4">
                 <FriendsForChat 
                 v-for="friend in filteredFriends"
                 :key="friend.username"
                 :name="friend.name"
                 :username="friend.username"
                 :is-online="friend.isOnline"
                 :src="friend.src"/>
             </div>
         </div>
         <div v-if="option == 2">
             <SearchBar 
                 id="searchAllFriend" 
                 name="searchAllFriend" 
                 placeholder="Search"
                 @input="filterFriends"
             />
             <h3 class="font-bold text-sm mt-5">FRIENDS - {{ friendsList.length }} </h3>
             <div class="flex flex-col w-full mt-4">
                <FriendsForChat 
                v-for="friend in filteredFriends"
                :key="friend.username"
                :name="friend.name"
                :username="friend.username"
                :is-online="friend.isOnline"
                :src="friend.src"/>
             </div>
         </div>
         <div v-if="option == 3">
             <SearchBar id="searchFriend" name="searchFriend" placeholder="Search" />
             <h3 class="font-bold text-sm mt-5">PENDING - {{ 2 }} </h3>
             <div class="flex flex-col w-full mt-4">
                <FriendInvitation 
                v-for="friend in filteredFriends"
                :key="friend.username"
                :name="friend.name"
                :username="friend.username"
                :is-online="friend.isOnline"
                :src="friend.src"
                />
             </div>
         </div>
         <div v-if="option == 4">
             <form class="flex gap-4">
                 <SearchBar id="searchFriend" name="searchFriend" placeholder="Search" />
                 <ButtonAlt 
                 type="submit"
                 value="Add"
                 class="bg-green"
                 />
             </form>
         </div>
     </div>
    </div>
 </template>

 <script>
 import ButtonAlt from '../input/buttonAlt.vue';
 import SearchBar from '../input/searchBar.vue';
 import FriendInvitation from './friendInvitation.vue';
 import FriendsForChat from './friendsForChat.vue';

 export default {
     name: "friendsHeader",
     data() {
         return {
             option: 1,
             searchQuery: "", // Campo de busca inicializado
             friendsList: [
                 {
                     name: "Rosa Diaz",
                     username: "rrodiaz",
                     isOnline: true,
                     src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgNAFrnZxv8QU7HLa31TDrRpDD6MyB4KP7lg&s"
                 },
                 {
                     name: "Jake Peralta",
                     username: "jakep",
                     isOnline: false,
                     src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgNAFrnZxv8QU7HLa31TDrRpDD6MyB4KP7lg&s"
                 },
                 {
                     name: "Amy Santiago",
                     username: "amys",
                     isOnline: true,
                     src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZQpk7_ZbJOaRB_B7aybYYAA3Ptlt54twDIA&s"
                 },
                 {
                     name: "Terry Jeffords",
                     username: "terryj",
                     isOnline: true,
                     src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZQpk7_ZbJOaRB_B7aybYYAA3Ptlt54twDIA&s"
                 }
             ]
         };
     },
     computed: {
         // Filtra apenas os amigos online
         onlineFriends() {
             return this.friendsList.filter(friend => friend.isOnline);
         },
         // Filtra amigos baseando-se no campo de busca
         filteredFriends() {
             const query = this.searchQuery.trim().toLowerCase(); 
             if (!query) return this.friendsList; // Se não houver busca, retorna todos os amigos

             return this.friendsList.filter(friend => 
                 friend.name.toLowerCase().includes(query) || 
                 friend.username.toLowerCase().includes(query)
             );
         }
     },
     methods: {
         changeOption(event) {
             const menuOption = event.target.getAttribute('data-friends-menu');
             if (menuOption) {
                 this.option = parseInt(menuOption);
             }
         },
         filterFriends(event) {
            console.log(event.target)
            console.log(event.target.value)
             const inputValue = event.target.value.trim();
             this.searchQuery = inputValue; // Atualiza corretamente o estado
         },
         // Busca um amigo exato pelo nome ou username
         findFriend(usernameOrName) {
             return this.friendsList.find(friend => 
                 friend.name.toLowerCase() === usernameOrName.toLowerCase() ||
                 friend.username.toLowerCase() === usernameOrName.toLowerCase()
             ) || null; // Retorna `null` se não encontrar
         }
     },
     components: {
         SearchBar,
         FriendsForChat,
         ButtonAlt,
         FriendInvitation
     }
 };
</script>

