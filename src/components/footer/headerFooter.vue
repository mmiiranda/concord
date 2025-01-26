<template>
    <div class="h-[10vh] bg-darkblue w-full flex justify-between items-center px-8">
        <div class="flex gap-4">
            <toogleIconButton src="Bell.svg"/>
            <userProfile />
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
import { mapGetters } from 'vuex';


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
        computed:{
            ...mapGetters(["getToken", "getUser"]),
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