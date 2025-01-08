<template>
    <div class="bg-cleangray h-dvh w-full grid place-items-center overflow-hidden">
        <div class="flex flex-col gap-4 text-center text-white">
            <div class="flex flex-col items-center">
                <img class="w-1/5" src="../assets/EmailImage.svg" alt="Personagem acessando caixa de email">
                <h2 class="text-3xl font-bold">Quase tudo Pronto</h2>
            </div>
            <p class="text-xl">Insira o cógido que foi enviado ao seu email</p>
           <CodeForm v-on:loading="toogleLoading"/>
            <div>
                <borderButton type="button" value="Não Recebeu o Email?"  class="border-darkpurple text-darkpurple"/>
            </div>
        </div>
    </div>
</template>

<script>
import CodeForm from "@/components/form/codeForm.vue";
import borderButton from "@/components/input/borderButton.vue";
import { mapActions } from "vuex";

    export default {
        name: "ConfirmarEmailView",
        methods: {
          ...mapActions(["toogleLoading"])
        },
        components: {   
            borderButton,
            CodeForm,
        }
    }
</script>       