<template>
    <div class="bg-cleangray h-dvh w-full flex items-center
    justify-around overflow-hidden">
        <div>
            <div class="bg-darkblue text-white p-6 rounded-lg h-full">
                <h2 class="font-bold text-2xl">Redefinir Senha</h2>
                <ResetPassword class="mt-4"/>
            </div>
        </div>
        <div>
            <img src="../assets/newPasswordIcon.svg" alt="">
        </div>
    </div>
</template>

<script>
import ResetPassword from '@/components/form/resetPassword.vue';

    export default {
        name: "RedefinirSenhaView",
        components: {
            ResetPassword
        }
    }
</script>