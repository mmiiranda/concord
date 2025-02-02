<template>
    <div class="h-[10dvh] bg-darkblue w-full flex justify-between items-center px-8">
        <div class="flex gap-4">
            <userProfile />
        </div>
        <div>
            <div class="flex ">
                <toogleIconButton       
                @click="exit"
                :src="icons.logoutIcon"/>
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
import logoutIcon from "../icon/logoutIcon.svg"
import { mapActions, mapGetters } from 'vuex';

    export default {
        name: "headerFooter",
        data() {
        return {
            icons: {
                micIcon,
                headphoneIcon,
                configIcon,
                logoutIcon
            }
        };
        },
        computed:{
            ...mapGetters(["getToken", "getUser"]),
        },
        methods: {
            ...mapActions(["logout"]),
            emitToogleConfig(){
                this.$emit("toogleConfig")
            },
            exit(){
                this.$router.push("/login");
                setTimeout(()=>{this.logout()}, 200 )
            }
        },  
        components: {
            toogleIconButton,
            userProfile
        },
        emits: ['toogleConfig']
    }
</script>