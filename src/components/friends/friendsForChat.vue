<template>
    <div class="friend-chat-row border-b-2 py-3 border-[#808080] flex w-full justify-between items-center
    hover:bg-gray/20 px-2 transition-all ease-in">
      <div class="flex items-center gap-2 cursor-pointer">
        <div class="bg-darkblue flex h-9 w-9 relative rounded-full justify-center items-center">
          <img :src="getImage(src)" class="w-full h-full rounded-full" alt="Avatar">
          <div :class="['w-3 h-3 absolute bottom-0 right-0 rounded-full',
            isOnline ? 'bg-[#00C417]' : 'bg-red']"></div>
        </div>
        <div class="flex flex-col justify-center" @click="selectFriend">
          <div>
            <h4 class="font-bold text-sm"> {{ name }} </h4>
          </div>
          <div>
            <h5 class="text-[12px] text-gray -mt-1"> @{{ username }} </h5>
          </div>
        </div>
      </div>
      
      <div class="rounded-full bg-darkblue w-6 h-6 grid place-items-center
      cursor-pointer"
      @click="openChat(obj)">
          <img src="../icon/Subtract.svg" 
          class="object-cover size-3"
          alt="chat icon">
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    name: "friendsForChat",
    props: {
      src: {
        type: String,
        required: false, // Alterado para false, pois pode não ter imagem
        default: null
      },
      name: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      isOnline: {
        type: Boolean,
        required: true,
      },
      obj: { 
        type: Object,
        required: true,
      }
    },
    methods: {
      ...mapActions("chat", ["setActiveChat"]), 
      ...mapActions('rightsidebar', ['openSidebarWithFriend']),
      ...mapActions("websocket",["markMessagesAsRead"]),
      getImage(imagePath){
          return imagePath ? `${process.env.VUE_APP_API_URL}/api/files/images?file-id=${imagePath}`: 'no-photo.jpg';
      },
      async openChat(friend) {
        this.setActiveChat({
          id: friend.id,
          name: friend.username, // Pode ajustar para 'friend.name' se preferir
          type: "dm" ,
          imagePath: friend.imagePath
        });

        await this.markMessagesAsRead({ fromUserId: friend.id });
        console.log(`✅ Mensagens de ${friend.id} marcadas como lidas.`);
      },
      selectFriend() {
        console.log(this.obj)
        this.openSidebarWithFriend(this.obj);
      },
    }
  }
  </script>
  
  <style scoped>
  .friend-chat-row:last-child{
    border: none;
  }
  .avatar {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  </style>
  