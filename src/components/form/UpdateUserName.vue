<template>
    <ModalOverlay>
        <div class="bg-darkblue p-4 rounded">
            <div v-if="!isSubmited">
                <div class="flex justify-between items-center">
                    <h2 class="text-xl font-bold">
                        Change Name
                    </h2>
                    <div>
                        <a href="#" @click.prevent="emitClose">X</a>
                    </div>
                </div>      
                <form @submit.prevent="submitForm" class="flex flex-col gap-4 mt-2">
                    <div>
                        <InputAlt 
                            label="Name"
                            name="update-name"
                            id="update-name"
                            v-model="newName"
                        />
                    </div>
                    <div class="flex gap-2">
                        <ButtonAlt type="submit" value="Confirm" /> 
                    </div>
                </form>
            </div>
            <div class="grid place-items-center" v-else>
                <LoadingComp />
            </div>
        </div>
    </ModalOverlay>
</template>

<script>
import { mapActions } from 'vuex';
import ButtonAlt from '../input/buttonAlt.vue';
import InputAlt from '../input/inputAlt.vue';
import ModalOverlay from '../modal/modalOverlay.vue';
import LoadingComp from '../load/loadingComp.vue';

export default {
    name: "UpdateUserName",
    data(){
        return{
            newName: this.name,
            isSubmited: false,
        }
    },
    components: {
        ModalOverlay,
        InputAlt,
        ButtonAlt,
        LoadingComp
    },
    props: {
        name: {
            type: String,
            required: true
        }
    },
    methods: {
        ...mapActions(['updateUser']),
        async submitForm() {
            if (this.newName.trim() === '') {
                alert("Name não pode estar vazio.");
                return;
            }

            this.isSubmited = true
            
            await this.updateUser({ field: 'name', value: this.newName });

            this.emitClose();
            this.isSubmited = false
        },
        emitClose(){
            this.$emit("close");
        }
    },
    emits: ["close"]
};
</script>

<style scoped>
/* Adicione estilos conforme necessário */
</style>
