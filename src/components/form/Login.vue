<template>
    <div class="flex flex-col text-white gap-12 w-full">
        <div class="grid place-items-center">
            <img src="logo.svg" alt="Concord Logo">
            <h1 class="font-bold text-3xl">Bem Vindo ao Concord</h1>
        </div>
        <form>
            <div class="flex flex-col gap-2">
                <inputAlt label="Username" type="text" name="username" />
                <inputAlt label="Senha" type="password" name="senha" />
            </div>
            <div class="text-right">
                <a href="#" class="text-blue">Esqueceu a Senha?</a>
            </div>

            <buttonAlt type="submit" value="Log In" class="mt-6" />
        </form>
    </div>
</template>

<script>
import inputAlt from "@/components/input/inputAlt.vue"
import buttonAlt from "@/components/input/buttonAlt.vue"

    export default {
        name: "LoginForm",
        components: {
            inputAlt,
            buttonAlt
        }
    }
</script>