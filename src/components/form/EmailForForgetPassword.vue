<template>
    <ModalOverlay>
        <div class="bg-darkblue flex gap-8 px-8 py-6 relative" v-if="!isSent">
            <div class="absolute right-6 top-4">
                <a href="#" @click="closeEmit">X    </a>
            </div>
            <div>
                <img src="../../assets/forgetPasswordIcon.svg" alt="">
            </div>
            <div class="flex flex-col justify-between">
                <form 
                    @submit="submitForm"
                    class="flex flex-col gap-5"
                >   
                    <h2 class="font-bold text-2xl">Redefinir Senha</h2>
                    <InputAlt 
                        id="recoveryEmail"
                        type="email"
                        name="recoveryEmail"
                        placeholder="Insira seu Email"
                    />
                    <ButtonAlt 
                        type="submit"
                        name="submit"
                        value="Recuperar Senha"
                    />
                </form>
            </div>
        </div>
        <div 
            v-else
            class="bg-darkblue flex flex-col gap-4 px-8 py-6 text-center relative"
        >
        <div class="absolute right-6 top-4">
            <a href="#" @click="closeEmit">X    </a>
        </div>
            <h2 class="text-2xl font-bold">Enviamos um link de recuperação para seu Email</h2>
            <p>Verifique a sua caixa de entrada (e também a pasta de spam, caso necessário) para acessar o link de recuperação de senha</p>
            <span>
                <a href="#" class="underline" @click="toogleContent"> {{ emailRecovery }} </a>
                não é seu Email?
            </span>
        </div>
    </ModalOverlay>
</template>

<script>
import ButtonAlt from '../input/buttonAlt.vue';
import InputAlt from '../input/inputAlt.vue';
import ModalOverlay from '../modal/modalOverlay.vue';

export default {
    name: "EmailForForgetPassword",
    data() {
        return {
            emailRecovery: "", 
            isSent: false
        };
    },
    methods: {
        submitForm(event) {
            event.preventDefault();

            const emailInput = document.getElementById("recoveryEmail");
            const emailValue = emailInput ? emailInput.value : "";

            if (emailValue.trim() === "") {
                alert("Por favor, insira um e-mail válido.");
                return;
            }

            this.emailRecovery = emailValue
            this.isSent = true;

        },
        closeEmit() {
            this.isSent = false
            this.$emit("close");
        },
        toogleContent(){
            this.isSent = !this.isSent;
        }
    },
    components: {
        ModalOverlay,
        InputAlt,
        ButtonAlt
    },
    emits: ['close']
};
</script>
