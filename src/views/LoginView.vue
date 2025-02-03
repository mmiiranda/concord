<template>
  <div class="bg-cleangray h-dvh flex">
    <div class="h-full w-full xl:w-5/12 bg-darkblue text-white flex flex-col justify-center items-center lg:p-12 p-6">
      <LoginForm v-if="Isregister == 0"/>
      <RegisterForm @loading="toogleLoading" v-else/>
      <div class="text-white mt-6">
        <div v-if="Isregister == 0">
          Don't have an account?  <span class="text-blue cursor-pointer" @click="toogleForm">Sign Up</span>
        </div>
        <div v-else>
          Already have an account? <span class="text-blue cursor-pointer" @click="toogleForm">Log In</span>
        </div>
      </div>
    </div>
    <div class="xl:w-full xl:grid place-items-center hidden">
      <div class="w-1/3">
        <img src="../assets/LoginImage.png" alt="Jovem olhando um notebook  ">
      </div>
    </div>
  </div>
</template>
<script>
import LoginForm from "@/components/form/Login.vue";
import RegisterForm from "@/components/form/Register.vue";
import { mapActions } from "vuex";


    export default {
        name: "LoginView", 
        data(){
          return{
            Isregister: 0, 
          }
        },
        methods: {
          ...mapActions(["toogleLoading"]),
          toogleForm(){
            this.Isregister = !this.Isregister
          },
        },
        components: {
          LoginForm,
          RegisterForm,
        }
    }
</script>