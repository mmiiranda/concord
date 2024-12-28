<template>
    <div class="fixed flex h-full bg-darkblue px-4 py-4 ">
        <div class="flex flex-col items-center" @click="toogleBar">
                <MiniServerIcon />
                <div class="w-4/5 bg-hovergray h-1 mt-2"></div>
                <div class="flex flex-col mt-2 gap-3">                
                    <MiniServerIcon />
                    <MiniServerIcon />
                    <MiniServerIcon />
                    <MiniServerIcon />
                    <MiniServerIcon />
                </div>
        </div>
        <div class="flex flex-col ml-8" v-if="isOpen">
            Passei a noite pensanso
        </div>
    </div>
</template>

<script>
import MiniServerIcon from "@/components/servers/MiniServerIcon.vue"

    export default {
        name: "sideBar",
        data(){
            return{
                isOpen: true
            }
        },
        methods: {
            toogleBar(){
                this.isOpen = !this.isOpen;
            }
        },
        components : {
            MiniServerIcon
        }
    }
</script>