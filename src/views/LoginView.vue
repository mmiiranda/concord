<template>
  <div class="bg-cleangray h-dvh flex">
    <div class="h-full w-full xl:w-5/12 bg-darkblue text-white flex flex-col justify-center items-center p-12">
      <LoginForm v-if="Isregister == 0"/>
      <RegisterForm v-else/>
      <div class="text-white mt-6">
        <div v-if="Isregister == 0">
          Não tem uma conta? <span class="text-blue cursor-pointer" @click="toogleForm">Registre-se</span>
        </div>
        <div v-else>
          Já conta? <span class="text-blue cursor-pointer" @click="toogleForm">Log In</span>
        </div>
      </div>
    </div>
    <div class="xl:w-full xl:grid place-items-center hidden">
      <div class="w-1/3">
        <img src="../assets/LoginImage.svg" alt="Jovem olhando um notebook  ">
      </div>
    </div>
  </div>
</template>
<script>
import LoginForm from "@/components/form/Login.vue";
import RegisterForm from "@/components/form/Register.vue";

    export default {
        name: "LoginView",
        data(){
          return{
            Isregister: 1
          }
        },
        methods: {
          toogleForm(){
            this.Isregister = !this.Isregister
          }
        },
        components: {
          LoginForm,
          RegisterForm
        }
    }
</script>