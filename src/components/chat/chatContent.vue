<template>
    <div class="h-full w-full flex flex-col gap-4 relative">
        <h2 class="font-bold text-lg"> $ {{ title }} </h2>
        <div class="h-[2px] w-full bg-shadowgray"></div>
        <div class="h-full overflow-scroll">

        </div>
        <div class="relative">
            <ChatInput/>
        </div>
    </div>
</template>
 
<script>
import ChatInput from '../input/chatInput.vue';

    export default {
        name: "chatContent",
        components: {
            ChatInput
        },
        props: {
            title:{
                type: String,
                required: true
            }
        }
    }
</script>