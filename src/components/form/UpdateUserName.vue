<template>
    <ModalOverlay>
        <div class="bg-darkblue p-4 rounded">
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
    </ModalOverlay>
</template>

<script>
import { mapActions } from 'vuex';
import ButtonAlt from '../input/buttonAlt.vue';
import InputAlt from '../input/inputAlt.vue';
import ModalOverlay from '../modal/modalOverlay.vue';

export default {
    name: "UpdateUserName",
    data(){
        return{
            newName: this.name,
        }
    },
    components: {
        ModalOverlay,
        InputAlt,
        ButtonAlt
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

            
            await this.updateUser({ field: 'name', value: this.newName });

            
            this.$toast(`Nome alterado com sucesso`, "success")
            this.emitClose();
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
