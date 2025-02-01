<template>
    <div class="flex gap-6 justify-between items-center">
       <div>
            <div>
                <h4 class="font-bold text-lg">
                    {{ label }}
                </h4>
            </div>
            <div class="text-md">
                {{ value }}
            </div>
       </div> 
        <div class="flex">
            <IconButton 
                :name="label + 'edit'" 
                :src="icon.editIcon" 
                type="button"
                @click="emitClick"
            />
        </div>
    </div>
</template>

<script>
import IconButton from './iconButton.vue';
import editIcon from '@/components/icon/edit_white.svg'

export default {
    name: "updateSetting",
    data(){
        return {
            icon:{
                editIcon
            }
        }
    },
    components:{
        IconButton,
    },
    props: {
        label:{
            type: String,
            required: true,
        },
        value:{
            type: String,
            required: true,
        },
    },
    methods:{
        emitClick(){
            this.$emit("clicked")
        }
    },
    emits: ["clicked"]
}
</script>
