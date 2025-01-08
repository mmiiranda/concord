<template>
    <form>
        <ActionBox 
            title="Membros"
            :items="friends"
            :icon="icon.RemoveIcon"
            />
        <div class="flex items-end gap-2">
            <div class="w-full">
                <InputAlt 
                label="Adicionar Membro"
                type="text"
                name="nameServer"
                />
            </div>
            <IconButton 
            name="editMembers"
            type="submit"
            :src="icon.plusIcon" />
        </div>  
    </form>
</template>

<script>
import IconButton from '../input/iconButton.vue';
import InputAlt from '../input/inputAlt.vue';
import plusIcon from "../icon/plus_black.svg"
import ActionBox from '../input/ActionBox.vue';
import RemoveIcon from "../icon/remove_user.svg"


    export default {
        name: "EditChannels",
        data(){
            return{
                icon: {
                   plusIcon,
                   RemoveIcon
                },
                friends: [
                    {
                        name: "LeoJaima",
                        src: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSY31cums070mnB2pQfFhXi9ZQocHM4zisFZUU47qKsmS10rv44ZPbOH45JxR8h2nu9DnHEzt-pgeYfWPUK7OifOX4HUi4D6iYUIVeT4Wk",
                    },
                    {
                        name: "LeoJaima",
                        src: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSY31cums070mnB2pQfFhXi9ZQocHM4zisFZUU47qKsmS10rv44ZPbOH45JxR8h2nu9DnHEzt-pgeYfWPUK7OifOX4HUi4D6iYUIVeT4Wk",
                    },
                    {
                        name: "LeoJaima",
                        src: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSY31cums070mnB2pQfFhXi9ZQocHM4zisFZUU47qKsmS10rv44ZPbOH45JxR8h2nu9DnHEzt-pgeYfWPUK7OifOX4HUi4D6iYUIVeT4Wk",
                    },
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