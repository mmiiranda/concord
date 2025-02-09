<template>
    <div class="flex flex-col text-white gap-12 w-full">
        <div class="grid place-items-center">
            <img src="logo.svg" alt="Concord Logo">
            <h1 class="font-bold text-3xl text-center">Welcome to <span class="text-purple-600">Concord</span></h1>
        </div>
        <form @submit.prevent="handleSubmit" novalidate>
            <div class="flex flex-col gap-2">
                <inputAlt
                    label="Email"
                    type="text"
                    name="email"
                    id="Email"
                    placeholder="Enter your email"
                    required
                />
                <inputAlt
                    label="Senha"
                    type="password"
                    name="password"
                    id="Senha"
                    placeholder="Enter your password"
                    required
                    minlength="8"
                />
            </div>
            <div class="text-right">
                <a href="#" class="text-blue" @click="setModalState(true)">
                    Forgot your password?
                </a>
            </div>
            <buttonAlt type="submit" value="Log In" class="mt-6" />
        </form>
    </div>
</template>

<script>
import inputAlt from "@/components/input/inputAlt.vue";
import buttonAlt from "@/components/input/buttonAlt.vue";
import { mapActions } from "vuex";

export default {
    name: "LoginForm",
    components: {
        inputAlt,
        buttonAlt,
    },
    methods: {
        ...mapActions(["toogleLoading", "login"]),
        ...mapActions("modalForgetPassword", ["setModalState"]),
        handleSubmit(event) {
            const form = event.target.closest("form");
            
            if (!form.checkValidity()) {
                const inputs = form.querySelectorAll("input, select, textarea");
                inputs.forEach(input => {
                    if (!input.validity.valid) {
                        this.$toast(`Error in the field "${input.id}"`, "error");
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
            
            this.toogleLoading();
            try {
                const response = await fetch(`${process.env.VUE_APP_API_URL}/api/auth/login`, {
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
                    this.$toast("Incorrect username or password", "error");
                }   
            } catch (err) {
                console.error("Erro na requisição:", err);
                this.$toast("There was a problem logging in", "error");
            } finally {
                this.toogleLoading();
            }
        }
    }
};
</script>
