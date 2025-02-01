<template>
    <div class="flex flex-col text-white gap-12 w-full">
        <div class="grid place-items-center">
            <img src="logo.svg" alt="Concord Logo">
            <h1 class="font-bold text-3xl text-center">Bem Vindo ao <span class="text-purple-600">Concord</span></h1>
        </div>
        <form @submit.prevent="handleSubmit" novalidate>
            <div class="flex flex-col gap-2">
                <inputAlt
                    label="Email"
                    type="text"
                    name="email"
                    id="Email"
                    placeholder="Digite seu Email"
                    required
                />
                <inputAlt
                    label="Senha"
                    type="password"
                    name="password"
                    id="Senha"
                    placeholder="Digite sua senha"
                    required
                    minlength="8"
                />
            </div>
            <div class="text-right">
                <a href="#" class="text-blue" @click="toggleForgetModal">
                    Esqueceu a Senha?
                </a>
            </div>
            <buttonAlt type="submit" value="Log In" class="mt-6" />
        </form>
        <EmailForForgetPassword @close="toggleForgetModal" v-show="ForgetModalOpen" />
    </div>
</template>

<script>
import inputAlt from "@/components/input/inputAlt.vue";
import buttonAlt from "@/components/input/buttonAlt.vue";
import EmailForForgetPassword from "./EmailForForgetPassword.vue";
import { mapActions } from "vuex";

export default {
    name: "LoginForm",
    components: {
        inputAlt,
        buttonAlt,
        EmailForForgetPassword
    },
    data() {
        return {
            ForgetModalOpen: false
        };
    },
    methods: {
        ...mapActions(["toogleLoading", "login"]),
        toggleForgetModal() {
            this.ForgetModalOpen = !this.ForgetModalOpen;
        },
        handleSubmit(event) {
            const form = event.target.closest("form");
            
            if (!form.checkValidity()) {
                const inputs = form.querySelectorAll("input, select, textarea");
                inputs.forEach(input => {
                    if (!input.validity.valid) {
                        this.$toast(`Erro no campo "${input.id}": ${input.validationMessage}`, "error");
                    }
                });
            } else {
                this.loginUser();
            }
        },
        async loginUser() {
            const form = document.querySelector("form");
            const data = new FormData(form);
            const json = Object.fromEntries(data.entries());

            console.log(json);
            this.toogleLoading();
            
            try {
                const response = await fetch("http://localhost:8080/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(json)
                });

                if (response.ok) {
                    const responseData = await response.json(); 

                    localStorage.setItem("token", responseData.token);
                    localStorage.setItem("UserSetting", JSON.stringify(responseData.user));

                    this.login()

                    this.$router.push("/");
                } else {
                    console.log("Erro ao fazer login", response);
                    this.$toast("Usuário ou senha incorretos", "error");
                }   
            } catch (err) {
                console.error("Erro na requisição:", err);
                this.$toast("Houve um problema ao realizar o login", "error");
            } finally {
                this.toogleLoading();
            }
        }
    }
};
</script>
