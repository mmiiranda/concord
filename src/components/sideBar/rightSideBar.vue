<template>
  <div
    :class="[
      'fixed top-0 w-full md:w-auto right-0 h-[calc(100dvh-5rem)] z-40  py-12 px-8 flex flex-col bg-[#272727] text-white transition-all ease-in',
      isOpen ? 'translate-x-0' : 'translate-x-full'
    ]"
    @click.stop
    @click.self="toggleBar"
    ref="rightSidebar"
  >
    <FriendProfile
      v-if="selectedFriend"
      :image="getImage(selectedFriend.imagePath)"
      :name="selectedFriend.name || 'Nome'"
      :nickname="selectedFriend.username || 'Nickname'"
    />

    <div v-if="selectedFriend && isFriend" class="text-center">
      <div>
        <a href="#">Adicionar em Servidor</a>
      </div>
      <div>
        <a
          href="#"
          class="text-red font-bold"
          @click.prevent="handleRemoveFriend(selectedFriend.friendshipId)"
        >
          Excluir Amigo
        </a>
      </div>
    </div>
    <div v-else-if="selectedFriend" class="text-center">
      <div>
        <a href="#" class="font-bold">Adicionar Amigo</a>
      </div>
    </div>
    <div v-else class="text-center">
      <p class="text-gray">Selecione um amigo para ver os detalhes.</p>
    </div>
  </div>
</template>

<script>
import FriendProfile from "../friends/friendProfile.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "RightSidebar",
  data(){
    return{
      openBarAux: false,
    }
  },
  computed: {
    ...mapGetters("rightsidebar", ["isOpen", "selectedFriend"]),
    ...mapGetters(["getToken", "getUser"]),
    isFriend() {
      return this.selectedFriend !== null;
    },
  },
  methods: {
    ...mapActions(["removeFriend"]),
    ...mapActions("rightsidebar", ["closeSidebar"]),
    async handleRemoveFriend(friendshipId) {
      console.log(this.selectedFriend)
      console.log("Tentando remover amizade com ID:", friendshipId);
      try {
        await this.removeFriend(friendshipId);
        this.$toast("Friend removed successfully!", "success");
        
        this.closeSidebar();
      } catch (error) {
        this.$toast("Error removing friend. Please try again.", "error");
        console.error("Erro ao remover amigo:", error);
      }
    },
    toggleBar() {
      if (this.isOpen) {
        this.closeSidebar();
      }
    },
    getImage(imagePath){
        console.log(imagePath)
        return imagePath ? `${process.env.VUE_APP_API_URL}/api/files/images?file-id=${imagePath}`: 'no-photo.jpg';
    },
    checkController(){
      if(this.openBarAux) this.closeSidebar()
    },
  },
  components: {
    FriendProfile,
  },
};
</script>
