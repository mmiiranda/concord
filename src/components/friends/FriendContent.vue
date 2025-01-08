    <template>
        <div class="text-white flex flex-col w-full">
            <div class="flex border-2 border-darkblue/80 w-full px-8 py-2">
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
                    <h3 class="font-bold text-sm mt-5">ONLINE - {{ friendsList.length }}</h3>
                    <div class="flex flex-col w-full mt-4">
                        <FriendsForChat v-for="friend in friendsList" :key="friend.id"
                        :name="friend.name" :username="friend.username" :is-online="friend.isOnline"
                        :src="friend.imagePath" />
                    </div>
                </div>
                <div v-if="option == 2">
                    <SearchBar id="searchAllFriend" name="searchAllFriend" placeholder="Search"
                    v-model="searchQuery" />
                    <h3 class="font-bold text-sm mt-5">FRIENDS - {{ friendsList.length }}</h3>
                    <div class="flex flex-col w-full mt-4">
                        <FriendsForChat v-for="friend in friendsList" :key="friend.id"
                        :name="friend.name" :username="friend.username" :is-online="friend.isOnline"
                        :src="friend.imagePath" />
                    </div>
                </div>
                <div v-if="option == 3">
                    <SearchBar id="searchFriend" name="searchFriend" placeholder="Search"
                    v-model="searchQuery" />
                    <h3 class="font-bold text-sm mt-5">PENDING - {{ pendingList.length }}</h3>
                    <div class="flex flex-col w-full mt-4">
                        <FriendInvitation v-for="friendship in pendingList" :key="friendship.id"
                        :id="friendship.id"
                        :name="friendship.friend.name"
                        :username="friendship.friend.username"
                        :origin="friendship.origin"
                        :destination="friendship.friend.id"
                        :src="friendship.friend.foto"
                        @submited="reset"
                    />
                    </div>
                </div>
                <div v-if="option == 4">
                    <form
                    @submit.prevent="sendRequest"
                    class="flex gap-4">
                        <SearchBar id="searchFriend" name="searchFriend"
                        v-model="newFriend" placeholder="Search" />
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
    import { mapGetters } from 'vuex';

    export default {
        data() {
            return {
                option: 1, 
                searchQuery: "",
                newFriend: "",
                friendsList: [],   
                pendingList: []    
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
            },
            ...mapGetters(["getUser", "getToken"])
        },
        methods: {
            changeOption(event) {
                this.option = parseInt(event.target.dataset.friendsMenu);
                this.searchQuery = "";  
            },
            async sendRequest(){
                if(!this.newFriend.trim()){
                    this.$toast("Insira um nome válido", "error");
                    return;
                }
                
                const requestBody = {
                    toUsername: this.newFriend
                };

                try {
                    const response = await fetch("http://localhost:8080/api/friendships", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${this.getToken}`
                        },
                        body: JSON.stringify(requestBody)
                    });

                    if (!response.ok) {
                        throw new Error("Usuário Inexistente");
                    }

                    this.$toast("Request made successfully", "success");
                    
                    
                    await this.requestPendingFriends();

                    this.newFriend = "";  
                } catch (error) {
                    this.$toast("User not found", "error");
                }
            },
            async requestAllFriends(){
                try {
                    const response = await fetch(`http://localhost:8080/api/users/${this.getUser.username}/friendships`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${this.getToken}`
                        }
                    });

                    if(response.ok) {
                        const data = await response.json(); 
                        console.log(data)   
                        this.friendsList = data.map(friendship => {
                            return friendship.from.id === this.getUser.id ? friendship.to : friendship.from;
                        });
                    }
                } catch(err) {
                    console.error("Erro ao buscar amigos:", err);
                }
            },
            async requestPendingFriends(){
                try {
                    const response = await fetch(`http://localhost:8080/api/users/${this.getUser.username}/pending-friendships`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${this.getToken}`
                        }
                    });

                    if(response.ok) {
                        const data = await response.json();
                        console.log(data) 
                        console.log(data) 
                        this.pendingList = data.map(friendship => {
                            return {
                                id: friendship.id,
                                origin: friendship.from.id, // Quem enviou o pedido
                                friend: friendship.from.id === this.getUser.id ? friendship.to : friendship.from // Quem é a outra pessoa
                            };
                        });

                    }
                } catch(err) {
                    console.error("Erro ao buscar amigos pendentes:", err);
                }
            }, 
            reset(){
                this.requestAllFriends();
                this.requestPendingFriends();   
            }
        },
        created() {
            this.requestAllFriends();
            this.requestPendingFriends();
        }
    };
    </script>
