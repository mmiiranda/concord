<template>
    <ModalOverlay>
        <div class="bg-darkblue p-4 rounded">
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-bold">
                    Change Username
                </h2>
                <div>
                    <a href="#" @click="emitClose">X</a>
                </div>
            </div>
            <form @submit.prevent="submitForm"
            class="flex flex-col gap-4 mt-4">
                <div>
                    <InputAlt 
                        label="Username"
                        name="update-username"
                        id="update-username"
                        :model-value="this.username"
                        v-model="newUsername"
                    />
                </div>
                <div>
                    <!-- <InputAlt 
                        label="Password"
                        type="password"
                    /> -->
                </div>
                <div>
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
    name: "UpdateUserUsername",
    data(){
        return{
            newUsername: this.username,
            password: ""
        }
    },
    components: {
        ModalOverlay,
        InputAlt,
        ButtonAlt
    },
    props: {
        username: {
            type: String,
            required: true
        }
    },
    methods: {
        ...mapActions(['updateUser']),
        async submitForm() {
            if (this.newUsername.trim() === '') {
                alert("Name não pode estar vazio.");
                return;
            }

            // Dispatch da ação Vuex para atualizar o name
            await this.updateUser({ field: 'username', value: this.newUsername });

            // Emitir o evento para fechar o modal após a atualização
            this.emitClose();
        },
        emitClose(){
            this.$emit("close");
        }
    },
    emits: ["close"]
};
</script>
