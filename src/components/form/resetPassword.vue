<template>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-8" novalidate>
        <div class="flex flex-col gap-3">
            <InputAlt 
                id="newPassword"
                name="New Password"
                placeholder="New Password"
                type="password"
                required
                minlength="8"
            />
            <InputAlt 
                id="confirmNewPassword"
                name="Confirm New Password"
                placeholder="Confirm New Password"
                type="password"
                required
                minlength="8"
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
import { mapActions } from 'vuex';
import ButtonAlt from '../input/buttonAlt.vue';
import InputAlt from '../input/inputAlt.vue';

export default {
    name: "ResetPassword",
    data() {
        return {
            novaSenha: {
                newPassword: null
            }
        };
    },
    components: {
        InputAlt,
        ButtonAlt
    },
    methods: {
        ...mapActions(["toogleLoading"]),
        handleSubmit(event) {
            const form = event.target.closest("form");
            
            if (!form.checkValidity()) {
                const inputs = form.querySelectorAll("input");
                inputs.forEach(input => {
                    if (!input.validity.valid) {
                        this.$toast(`Erro no campo "${input.name}": ${input.validationMessage}`, "error");
                    }
                });
            } else {
                this.submitForm();
            }
        },
        async submitForm() {
            const newPassword = document.getElementById("newPassword").value;
            const confirmNewPassword = document.getElementById("confirmNewPassword").value;

            const token = this.$route.query.token;

            let senha = newPassword.trim()
            

            if (senha === "" || confirmNewPassword.trim() === "") {
                this.$toast("Por favor, preencha ambos os campos", "error");
                return;
            }

            if(senha < 8){
                this.$toast("Senha deve  no mínimo 8 caracteres", "error")
                return;
            }

            if (newPassword !== confirmNewPassword) {
                this.$toast("As senhas não coincidem. Tente novamente", "error  ");
                return;
            }

            this.novaSenha.newPassword = newPassword;


            this.toogleLoading()
            try {
                const response = await fetch(`${process.env.VUE_APP_API_URL}/api/auth/reset-password?token=${token}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.novaSenha)
                });

                if (response.ok) {
                    this.$toast("Senha redefinida com sucesso!", "sucess");
                    this.$router.push("/login");
                } else {
                    const errorDetails = await response.json();
                    console.error("Erro na resposta:", errorDetails);
                    this.$toast("Erro ao redefinir a senha. Tente novamente", "error");
                }
                this.toogleLoading()
            } catch (err) {
                console.error("Erro ao processar a solicitação:", err);
                this.$toast("Houve um problema ao redefinir sua senha. Tente novamente mais tarde", "error");
            }
        }
    }
};
</script>
