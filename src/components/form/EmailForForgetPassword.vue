<template>
    <ModalOverlay>
        <div class="bg-darkblue flex gap-8 px-8 py-6 relative animate-spawn" v-if="!isSent">
            <div class="absolute right-6 top-4">
                <a href="#" @click="closeEmit">X</a>
            </div>
            <div>
                <img src="../../assets/forgetPasswordIcon.svg" alt="">
            </div>
            <div class="flex flex-col justify-between">
                <form 
                    @submit.prevent="handleSubmit"
                    class="flex flex-col gap-5"
                    novalidate
                >   
                    <h2 class="font-bold text-2xl">Redefinir Senha</h2>
                    <InputAlt 
                        id="recoveryEmail"
                        type="email"
                        name="email"
                        placeholder="Insira seu Email"
                        required
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
                <a href="#" @click="closeEmit">X</a>
            </div>
            <h2 class="text-2xl font-bold">Enviamos um link de recuperação para seu Email</h2>
            <p>Verifique a sua caixa de entrada (e também a pasta de spam, caso necessário) para acessar o link de recuperação de senha</p>
            <span>
                <a href="#" class="underline" @click="toggleContent"> {{ emailRecovery.email }} </a>
                não é seu Email?
            </span>
        </div>
    </ModalOverlay>
</template>

<script>
import { toast } from "vue3-toastify"; 
import ButtonAlt from '../input/buttonAlt.vue';
import InputAlt from '../input/inputAlt.vue';
import ModalOverlay from '../modal/modalOverlay.vue';


export default {
    name: "EmailForForgetPassword",
    data() {
        return {
            emailRecovery: {
                email: null
            },
            isSent: false
        };
    },
    methods: {
        handleSubmit(event) {
            const form = event.target.closest("form");
            
            if (!form.checkValidity()) {
                const emailInput = form.querySelector("input");
                if (!emailInput.validity.valid) {
                    this.$toast(`Erro no campo "${emailInput.name}": ${emailInput.validationMessage}`, "error");
                }
            } else {
                this.submitForm(form);
            }
        },
        async submitForm(form) {
            this.emailRecovery.email = form.querySelector("input").value;

            this.$toast("Verificando Email", "loading")
            try {
                const response = await fetch("http://localhost:8080/api/auth/forgot-password", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.emailRecovery)
                });

              
                this.$toast("", "remove");
                if (response.status === 200) {
                    this.isSent = true;
                    this.$toast("E-mail enviado com sucesso!", "sucess");
                } else {
                    this.$toast("Erro ao enviar o e-mail. Tente novamente", "error");
                    console.log(response);
                    console.log(this.emailRecovery);
                }
            } catch (err) {
                this.$toast("", "remove");
                toast.error("Houve um problema na solicitação. Tente novamente.");
                console.error(err);
            }
        },
        closeEmit() {
            this.isSent = false;
            this.$emit("close");
        },
        toggleContent() {
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
