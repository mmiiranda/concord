<template>
    <div class="h-full w-full flex flex-col gap-4 relative">
        <h2 class="font-bold text-lg"> $ {{ title }} </h2>
        <div class="h-[2px] w-full bg-shadowgray"></div>
        <div class="h-full overflow-scroll flex flex-col-reverse  gap-1">
            <MessageChat 
            name="regata"
            date="12/12/2024"
            hour="13:15"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfdEiCkqAJ7Ps9OZyYoxI1_METwn3tFVe8-w&s"
            message="Não me leve a mal"
        />
        
        <MessageChat 
            name="textor"
            date="12/12/2024"
            hour="13:10"
            src="https://sm.ign.com/ign_br/cover/h/harry-pott/harry-potter-the-series_s6p5.jpg"
            message="Como você está?"
        />
        
       
        </div>
        <div class="relative">
            <ChatInput/>
        </div>
    </div>
</template>
 
<script>
import ChatInput from '../input/chatInput.vue';
import MessageChat from './messageChat.vue';

    export default {
        name: "chatContent",
        components: {
            ChatInput,
            MessageChat
        },
        props: {
            title:{
                type: String,
                required: true
            }
        }
    }
</script>