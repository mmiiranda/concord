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
                    :class="['hover:opacity-100 ',option == 1 ? 'opacity-100' : 'opacity-60']">Online</a>
                </div>
                <div>
                    <a href="#" data-friends-menu="2" @click.prevent="changeOption($event)"
                    :class="['hover:opacity-100 ',option == 2 ? 'opacity-100' : 'opacity-60']">All</a>
                </div>
                <div>
                    <a href="#" data-friends-menu="3" @click.prevent="changeOption($event)"
                    :class="['hover:opacity-100 ',option == 3 ? 'opacity-100' : 'opacity-60']">Pending</a>
                </div>
                <div>
                    <button class="bg-green px-2 rounded-lg" @click="option = 4">Add Friend</button>
                </div>
            </div>
        </div>
        <div class="flex flex-col w-2/3 p-8">
            <div v-if="option == 1">
                <SearchBar id="searchOnlineFriend" name="searchOnlineFriend" placeholder="Search"
                v-model="searchQuery" />
                <h3 class="font-bold text-sm mt-5">ONLINE - {{ filteredOnlineFriends.length }}</h3>
                <div class="flex flex-col w-full mt-4">
                    <FriendsForChat v-for="friend in filteredOnlineFriends" :key="friend.username"
                    :name="friend.name" :username="friend.username" :is-online="friend.isOnline"
                    :src="friend.src" />
                </div>
            </div>
            <div v-if="option == 2">
                <SearchBar id="searchAllFriend" name="searchAllFriend" placeholder="Search"
                v-model="searchQuery" />
                <h3 class="font-bold text-sm mt-5">FRIENDS - {{ filteredAllFriends.length }}</h3>
                <div class="flex flex-col w-full mt-4">
                    <FriendsForChat v-for="friend in filteredAllFriends" :key="friend.username"
                    :name="friend.name" :username="friend.username" :is-online="friend.isOnline"
                    :src="friend.src" />
                </div>
            </div>
            <div v-if="option == 3">
                <SearchBar id="searchFriend" name="searchFriend" placeholder="Search"
                v-model="searchQuery" />
                <h3 class="font-bold text-sm mt-5">PENDING - {{ filteredPending.length }}</h3>
                <div class="flex flex-col w-full mt-4">
                    <FriendInvitation v-for="friend in filteredPending" :key="friend.username"
                    :name="friend.name" :username="friend.username" :origin="friend.origin"
                    :destination="friend.destination"
                    :src="friend.src" />
                </div>
            </div>
            <div v-if="option == 4">
                <form class="flex gap-4">
                    <SearchBar id="searchFriend" name="searchFriend" placeholder="Search" />
                   <div>
                    <ButtonAlt type="submit" value="Add" class="bg-green" />
                   </div>
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
    data() {
        return {
            option: 1, 
            searchQuery: "",
            friendsList: [
                { name: "Alice", username: "alice123", isOnline: true, src: "../icon/alice.png" },
                { name: "Bob", username: "bob321", isOnline: false, src: "../icon/bob.png" },
                { name: "Charlie", username: "charlie456", isOnline: true, src: "../icon/charlie.png" },
            ],
            pendingList: [
                { name: "Dave", username: "dave789", origin: 4, destination: 5 ,src: "../icon/dave.png" },
                { name: "Eve", username: "eve567", origin: 1,destination:6 ,src: "../icon/eve.png" }
            ]
        };
    },
    components: {
        ButtonAlt,
        SearchBar,
        FriendsForChat,
        FriendInvitation
    },
    computed: {
        filteredOnlineFriends() {
            return this.friendsList.filter(friend =>
                friend.isOnline && (
                    friend.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    friend.username.toLowerCase().includes(this.searchQuery.toLowerCase())
                )
            );
        },
        filteredAllFriends() {
            return this.friendsList.filter(friend =>
                friend.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                friend.username.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        filteredPending() {
            return this.pendingList.filter(friend =>
                friend.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                friend.username.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    methods: {
        changeOption(event) {
            this.option = parseInt(event.target.dataset.friendsMenu);
            this.searchQuery = "";  
        }
    }
};
</script>