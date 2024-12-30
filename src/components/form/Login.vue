<template>
    <div class="flex flex-col text-white gap-12 w-full">
        <div class="grid place-items-center">
            <img src="logo.svg" alt="Concord Logo">
            <h1 class="font-bold text-3xl">Bem Vindo ao Concord</h1>
        </div>
        <form>
            <div class="flex flex-col gap-2">
                <inputAlt label="Email" type="text" name="email" />
                <inputAlt label="Senha" type="password" name="senha" />
            </div>
            <div class="text-right">
                <a href="#" class="text-blue"
                @click="toogleForgetModalOpen">
                    Esqueceu a Senha?
                </a>
            </div>

            <buttonAlt type="submit" value="Log In" class="mt-6" />
        </form>
        <EmailForForgetPassword @close="toogleForgetModalOpen"  v-show="ForgetModalOpen"/>
    </div>

</template>

<script>
import inputAlt from "@/components/input/inputAlt.vue"
import buttonAlt from "@/components/input/buttonAlt.vue"
import EmailForForgetPassword from "./EmailForForgetPassword.vue";

    export default {
        name: "LoginForm",
        data(){
            return{
                ForgetModalOpen: false
            }
        },
        methods:{
            toogleForgetModalOpen(){
               this.ForgetModalOpen = !this.ForgetModalOpen;
            }
        },
        components: {
            inputAlt,
            buttonAlt,
            EmailForForgetPassword
        },
    }
</script>