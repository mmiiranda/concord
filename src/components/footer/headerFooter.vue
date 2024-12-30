<template>
    <div class="h-[10vh] w-full flex justify-between items-center px-8">
        <div class="flex gap-4">
            <toogleIconButton src="Bell.svg"/>
            <userProfile name="Pablo" username="reboloerrado" src="https://i.scdn.co/image/ab67616d0000b2738c46c9a59ac57eeb959d064e" />
        </div>
        <div>
            <div class="flex ">
                <toogleIconButton :src="icons.micIcon"/>
                <toogleIconButton :src="icons.headphoneIcon"/>
                <toogleIconButton  
                @click="emitToogleConfig"
                :src="icons.configIcon"/>
            </div>
        </div>
    </div>
</template>

<script>
import toogleIconButton from '../input/toogleIconButton.vue';
import userProfile from "../user/userProfile.vue"
import micIcon from "../icon/mic.svg"
import headphoneIcon from "../icon/headphone.svg"
import configIcon from "../icon/config.svg"

    export default {
        name: "headerFooter",
        data() {
        return {
            icons: {
                micIcon,
                headphoneIcon,
                configIcon
            }
        };
        },
        methods: {
            emitToogleConfig(){
                this.$emit("toogleConfig")
            }
        },  
        components: {
            toogleIconButton,
            userProfile
        },
        emits: ['toogleConfig']
    }
</script>