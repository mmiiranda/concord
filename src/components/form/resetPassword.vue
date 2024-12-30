<template>
    <form @submit="submitForm" class="flex flex-col gap-8">
        <div class="flex flex-col gap-3">
            <InputAlt 
                id="newPassword"
                name="newPassword"
                placeholder="Nova Senha"
                type="password"
            />
            <InputAlt 
                id="confirmNewPassword"
                name="confirmNewPassword"
                placeholder="Confirmar Nova Senha"
                type="password"
            />
        </div>
        <ButtonAlt 
            name="ButtonNewPassword"
            type="submit"
            value="Redefinir"
        />
    </form>
</template>

<script>
import ButtonAlt from '../input/buttonAlt.vue';
import InputAlt from '../input/inputAlt.vue';

export default {
    name: "resetPassword",
    components: {
        InputAlt,
        ButtonAlt
    },
    methods: {
        submitForm(event) {
            event.preventDefault();

            const newPassword = document.getElementById("newPassword").value;
            const confirmNewPassword = document.getElementById("confirmNewPassword").value;

            if (newPassword.trim() === "" || confirmNewPassword.trim() === "") {
                alert("Por favor, preencha ambos os campos.");
                return;
            }

            if (newPassword !== confirmNewPassword) {
                alert("As senhas não coincidem. Tente novamente.");
                return;
            }

            alert("Senha redefinida com sucesso!");
            this.$router.push("/login");
        }
    }
};
</script>
