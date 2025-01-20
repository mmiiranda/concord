<template>
    <div 
      :class="[
        'fixed top-0 right-0 h-[90vh] py-12 px-8 flex flex-col bg-darkblue text-white transition-all ease-in',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      ]" 
      @click.stop
      @click.self="toggleBar"
    >
      <FriendProfile 
        v-if="selectedFriend"
        :image="selectedFriend.imagePath || 'no-photo.jpg'"
        :name="selectedFriend.name || 'Nome'"
        :nickname="selectedFriend.username || 'Nickname'"
      />
  
      <div v-if="selectedFriend && isFriend" class="text-center">
        <div>
          <a href="#">Adicionar em Servidor</a>
        </div>
        <div>
          <a href="#" class="text-red font-bold">Excluir Amigo</a>
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
  import FriendProfile from '../friends/friendProfile.vue';
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    name: "RightSidebar",
    computed: {
      ...mapGetters('rightsidebar', ['isOpen', 'selectedFriend']),
      isFriend() {
        return this.selectedFriend !== null;
      }
    },
    methods: {
      ...mapActions('rightsidebar', ['closeSidebar']),
      toggleBar() {
        if (this.isOpen) {
          this.closeSidebar();
        }
      }
    },
    components: {
      FriendProfile
    }
  };
  </script>
  
  <style scoped>
  .bg-darkblue {
    background-color: #23272A;
  }
  </style>
  