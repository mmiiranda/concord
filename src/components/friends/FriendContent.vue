<template>
    <div class="text-white flex flex-col w-full">
        <div class="flex justify-center md:justify-start border-2 border-darkblue/80 w-full px-2 lg:px-8 py-2">
            <div class="flex gap-2 border-r-2 border-gray pr-4">
                <img src="../icon/people.svg" alt="Icone de Pessoas">
                <h4 class="font-bold">Friends</h4>
            </div>
            <div class="flex ml-2 lg:ml-4 gap-3 lg:gap-5">
                <div>
                    <a href="#" data-friends-menu="1" @click.prevent="changeOption($event)"
                       :class="['hover:opacity-100 ', option == 1 ? 'opacity-100' : 'opacity-60']">Online</a>
                </div>
                <div>
                    <a href="#" data-friends-menu="2" @click.prevent="changeOption($event)"
                       :class="['hover:opacity-100 ', option == 2 ? 'opacity-100' : 'opacity-60']">All</a>
                </div>
                <div class="relative">
                    <a
                        href="#"
                        data-friends-menu="3"
                        @click.prevent="handlePendingClick"
                        :class="['hover:opacity-100 ', option == 3 ? 'opacity-100' : 'opacity-60']"
                    >
                        Pending
                    </a>
                    <span
                        v-if="pendingRequestsCount > 0"
                        class="absolute -top-1 -right-3 bg-red rounded-full text-xs text-white px-2"
                    >
                        {{ pendingRequestsCount }}
                    </span>
                </div>
                <div>
                    <button class="bg-green px-2 rounded-lg" @click="option = 4">Add Friend</button>
                </div>
            </div>
        </div>
        <div class="flex flex-col w-full lg:w-2/3 p-8">
            <div v-if="option == 1">
                <SearchBar id="searchOnlineFriend" name="searchOnlineFriend" placeholder="Search"
                           v-model="searchQuery" />
                <h3 class="font-bold text-sm mt-5">ONLINE - {{ filteredOnlineFriends.length }}</h3>
                <div class="flex flex-col w-full mt-4">
                    <FriendsForChat
                        v-for="friend in filteredOnlineFriends"
                        :key="friend.id"
                        :name="friend.name"
                        :username="friend.username"
                        :is-online="friend.isOnline"
                        :src="friend.imagePath"
                        :obj="friend"
                    />
                </div>
            </div>
            <div v-if="option == 2">
                <SearchBar id="searchAllFriend" name="searchAllFriend" placeholder="Search"
                           v-model="searchQuery" />
                <h3 class="font-bold text-sm mt-5">FRIENDS - {{ filteredAllFriends.length }}</h3>
                <div class="flex flex-col w-full mt-4">
                    <FriendsForChat
                        v-for="friend in friendsList"
                        :key="friend.id"
                        :name="friend.name"
                        :username="friend.username"
                        :is-online="friend.isOnline"
                        :src="friend.imagePath"
                        :obj="friend"
                    />
                </div>
            </div>
            <div v-if="option == 3">
                <SearchBar id="searchFriend" name="searchFriend" placeholder="Search"
                           v-model="searchQuery" />
                <h3 class="font-bold text-sm mt-5">PENDING - {{ pendingList.length }}</h3>
                <div class="flex flex-col w-full mt-4">
                  <FriendInvitation
                      v-for="friendship in pendingList"
                      :key="friendship.id"
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
import ButtonAlt from "../input/buttonAlt.vue";
import SearchBar from "../input/searchBar.vue";
import FriendInvitation from "./friendInvitation.vue";
import FriendsForChat from "./friendsForChat.vue";
import { mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
            option: 1,
            searchQuery: "",
            newFriend: "",
        };
    },
    components: {
        ButtonAlt,
        SearchBar,
        FriendsForChat,
        FriendInvitation,
    },
    computed: {
        ...mapGetters([
            "getFriends",          
            "getPendingRequests",  
            "pendingRequestsCount" 
        ]),
        friendsList() {
            return this.getFriends;
        },
        pendingList() {
            return this.getPendingRequests;
        },
        filteredOnlineFriends() {
            return this.friendsList.filter(
                (friend) =>
                    friend.isOnline &&
                    (friend.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                     friend.username.toLowerCase().includes(this.searchQuery.toLowerCase()))
            );
        },
        filteredAllFriends() {
            return this.friendsList.filter(
                (friend) =>
                    friend.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    friend.username.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        ...mapGetters(["getUser", "getToken"]),
    },
    methods: {
        ...mapActions(["fetchFriends", "fetchPendingRequests"]),

        changeOption(event) {
            this.option = parseInt(event.target.dataset.friendsMenu);
            this.searchQuery = "";
        },

        async handlePendingClick() {
            this.option = 3;
            this.searchQuery = ""; 
            try {
                await this.fetchPendingRequests();
            } catch (error) {
                console.error("Erro ao buscar pendências:", error);
            }
        },

        // Enviar solicitação de amizade
        async sendRequest() {
            if (!this.newFriend.trim()) {
                this.$toast("Insira um nome válido", "error");
                return;
            }

            const requestBody = {
                toUsername: this.newFriend.trim(),
            };

            try {
                const response = await fetch("http://localhost:8080/api/friendships", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.getToken}`,
                    },
                    body: JSON.stringify(requestBody),
                });

                // Mostra o status real
                console.log("Status da resposta:", response.status);

                if (!response.ok) {
                    // Lê o texto de erro do servidor
                    const errorText = await response.text();
                    console.error("Erro do servidor:", errorText);

                    // Lança exceção com a mensagem do servidor (ou mensagem default)
                    throw new Error(errorText || "User not found");
                }

                // Se chegou aqui, deu tudo certo
                this.$toast("Request made successfully", "success");
                this.newFriend = "";

                // ATUALIZAR PENDÊNCIAS para que apareça no "Pending"
                await this.fetchPendingRequests();

            } catch (error) {
                const errJson = JSON.parse(error.message);
                console.log(errJson)
                this.$toast(errJson.message || "User not found", "error")
            }
        },

        reset() {
            // Recarrega lista de amigos
            this.fetchFriends(); 
            // Recarrega pendências
            this.fetchPendingRequests();
        },
    },
    created() {
        this.fetchFriends(); 
        this.fetchPendingRequests();
    },
};
</script>

<style scoped>
.bg-darkblue {
    background-color: #23272A;
}
</style>
