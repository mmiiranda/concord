<template>
    <div class="flex flex-col text-white gap-12 w-full">
        <div class="grid place-items-center">
            <img src="logo.svg" alt="Concord Logo">
            <h1 class="font-bold text-3xl">Registre-se no Concord</h1>
        </div>
        <form>
            <div class="flex flex-col gap-4 ">
                <inputAlt label="Username" type="text" name="email" />
                <inputAlt label="Email" type="email" name="email" />
                <inputAlt label="Senha" type="password" name="senha" />
                <inputAlt label="Confirme Senha" type="password" name="senha_confirm" />
            </div>
            <div>
                <label for="" class="text-sm">
                    <checkboxAlt />
                    Eu aceito os <a href="#" class="text-blue">Termos de Serviço</a> e a <a href="#" class="text-blue">Politica de Privacidade</a>
                </label>
            </div>

            <buttonAlt type="submit" value="Registrar" class="mt-6" />
        </form>
        
    </div>
</template>

<script>
import inputAlt from "@/components/input/inputAlt.vue"
import buttonAlt from "@/components/input/buttonAlt.vue"
import checkboxAlt from "@/components/input/checkbox.vue"

    export default {
        name: "LoginForm",
        components: {
            inputAlt,
            buttonAlt,
            checkboxAlt
        }
    }
</script>