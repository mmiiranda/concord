<template>
    <ModalOverlay>
        <div class="w-auto lg:w-3/5 flex flex-col bg-darkblue text-white py-5 px-6 rounded shadow">
            <div class="flex justify-between items-center mb-4">
                <div>
                    <h2 class="font-bold text-2xl">Editar Servidor</h2>
                </div>
                <div>
                    <a href="#" 
                    @click="emitClose"
                    class="font-bold">
                        X
                    </a>
                </div>
            </div>
            <OptionsMenu 
            @handleClick1="menuPage = 1"
            @handleClick2="menuPage = 2"
            @handleClick3="menuPage = 3"
            :options="menuOptions" />
            
            <div class="mt-2">
                <div 
                class="flex flex-col gap-1"
                v-show="menuPage == 1">
                    <EditServer />
                </div>
                <div v-show="menuPage == 2">
                    <EditChannels />
                </div>
                <div v-show="menuPage == 3">
                    <EditMembers />
                </div>
            </div>
        </div>
    </ModalOverlay>
</template>

<script>
import OptionsMenu from '../input/OptionsMenu.vue';
import ModalOverlay from '../modal/modalOverlay.vue';
import copyIcon from "../icon/copyIcon.svg"
import plusIcon from "../icon/plus_black.svg"
import EditServer from '../form/EditServer.vue';
import EditChannels from '../form/EditChannels.vue';
import EditMembers from '../form/EditMembers.vue';


    export default {
        name: "EditServerModal",
        data(){
            return{
                menuPage: 1,
                menuOptions: ['Geral', "Canais", "Membros"],
                icon: {
                   copyIcon,
                   plusIcon
                }
            }
        },
        methods : {
            emitClose(){

            },
        },
        components: {
            ModalOverlay,
            OptionsMenu,    
            EditServer,
            EditChannels,
            EditMembers,
        },
        emits: ["close"]
    }
</script>