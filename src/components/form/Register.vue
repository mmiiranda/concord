<template>
    <div class="flex flex-col text-white gap-12 w-full">
        <div class="grid place-items-center">
            <img src="logo.svg" alt="Concord Logo">
            <h1 class="font-bold text-3xl text-center">Registre-se no Concord</h1>
        </div>
        <form @submit.prevent="handleSubmit" novalidate>
            <div class="flex flex-col gap-2">
                <inputAlt
                    label="Nome"
                    type="text"
                    name="name"
                    id="Name"
                    placeholder="Digite seu nome"
                    required
                    minlength="2"
                />
                <inputAlt
                    label="Username"
                    type="text"
                    name="username"
                    id="Username"
                    placeholder="Escolha um username"
                    required
                    minlength="5"
                />
                <inputAlt
                    label="Email"
                    type="email"
                    name="email"
                    id="Email"
                    placeholder="Seu email"
                    required
                />
                <inputAlt
                    label="Senha"
                    type="password"
                    name="password"
                    id="Senha"
                    placeholder="Crie uma senha"
                    required
                    minlength="8"
                />
                <inputAlt
                    label="Confirme Senha"
                    type="password"
                    name="senha_confirm"
                    id="Confirmar Senha"
                    placeholder="Confirme sua senha"
                    required
                />
            </div>
            <div class="text-sm flex gap-2 mt-1">
                    <checkboxAlt name="Campo de Termos" id="Termos" required />
                    <span>
                        Eu aceito os <a href="#" class="text-blue">Termos de Serviço</a> e a <a href="#" class="text-blue">Política de Privacidade</a>
                    </span>
            </div>
            <buttonAlt type="submit" value="Registrar" class="mt-6 " />
        </form>
    </div>
</template>

<script>
import inputAlt from "@/components/input/inputAlt.vue";
import buttonAlt from "@/components/input/buttonAlt.vue";
import checkboxAlt from "@/components/input/checkbox.vue";

export default {
    name: "RegisterForm",
    components: {
        inputAlt,
        buttonAlt,
        checkboxAlt
    },
    methods: {
        handleSubmit(event) {
            const form = event.target.closest("form");
            
        if (!form.checkValidity()) {
            const inputs = form.querySelectorAll("input, select, textarea");
            for (const input of inputs) {
                if (!input.validity.valid) {
                    this.$toast(`Erro no campo "${input.id}": ${input.validationMessage}`, "error");
                    break;
                }
            }
        } else {
                const password = form.querySelector("[name='password']").value;
                const confirmPassword = form.querySelector("[name='senha_confirm']").value;

                if (password !== confirmPassword) {
                    this.$toast("As senhas não coincidem. Tente novamente.", "error");
                    return;
                }
                this.createAccount();
            }
        },

        async createAccount() {
            const form = document.querySelector("form");
            const data = new FormData(form);
            const json = Object.fromEntries(data.entries());

            delete json.confirmPassword;
            delete json.terms;


            console.log(json)

            try {
                this.emitLOading()
                const response = await fetch("http://localhost:8080/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(json)
                });
                if (response.status === 202) {
                    this.emitLOading()
                    this.$router.push("/confirmarEmail");
                } else {
                    this.$toast("Registro Incorreto", "error");
                }
            } catch (err) {
                this.$toast("Algum Problema foi Encontrado", "error");
            }
        },
        emitLOading(){
            this.$emit("loading")
        }
    },
    emits: ["loading"]
};
</script>
