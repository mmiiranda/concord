<template>
    <form 
    class="flex flex-col">
        <div 
        class="flex justify-center">
            <FileAlt
            accept=".png, .jpg, .jpeg"
            name="serverImage"
            />
        </div>
        <InputAlt 
            label="Nome"
            type="text"
            name="nameServer"
            />
        <div class="flex items-end gap-2">
            <div class="w-full">
                <InputAlt 
                label="Link"
                type="text"
                name="nameServer"
                value="https://concord.com/invite/LJDSDJK"
                :disabled="true"
                />
            </div>
            <IconButton 
            :src="icon.copyIcon" />
        </div>
        <div class="flex justify-end mt-2">
            <ButtonAlt 
                class="mt-4"
                value="Salvar"
                type="submit"
            />
        </div>
    </form>
</template>

<script>
import ButtonAlt from '../input/buttonAlt.vue';
import FileAlt from '../input/fileAlt.vue';
import IconButton from '../input/iconButton.vue';
import InputAlt from '../input/inputAlt.vue';
import copyIcon from "../icon/copyIcon.svg"
import plusIcon from "../icon/plus_black.svg"

    export default {
        name: "EditServer",
        data(){
            return{
                icon: {
                   copyIcon,
                   plusIcon
                }
            }
        },
        components: {
            InputAlt,
            IconButton,
            ButtonAlt,
            FileAlt
        }
    }
</script>