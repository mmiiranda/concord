<template>
    <form>
        <ActionBox 
            title="Canais"
            :items="canais"
            :icon="icon.TrashIcon"
            />
        <div class="flex items-end gap-2">
            <div class="w-full">
                <InputAlt 
                label="Adicionar Canal"
                type="text"
                name="nameServer"
                />
            </div>
            <IconButton 
            :src="icon.plusIcon" />
        </div>
    </form>
</template>

<script>
import IconButton from '../input/iconButton.vue';
import InputAlt from '../input/inputAlt.vue';
import plusIcon from "../icon/plus_black.svg"
import ActionBox from '../input/ActionBox.vue';
import ChatIcon from "../icon/chat_icon.svg"
import TrashIcon from "../icon/trash.svg"


    export default {
        name: "EditChannels",
        data(){
            return{
                icon: {
                   plusIcon,
                   ChatIcon,
                   TrashIcon
                },
                canais: [
                    "General",
                    "Idiotas"
                ]
            }
        },
        components: {
            IconButton,
            InputAlt,
            ActionBox
        }
    }
</script>