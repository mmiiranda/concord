<template>
    <ModalOverlay>
        <div class="bg-darkblue flex gap-8 px-8 py-6 relative animate-spawn" v-if="!isSent">
            <div class="absolute right-6 top-4">
                <a href="#" @click="setModalState(false)">X</a>
            </div>
            <div class="hidden md:block">
                <img src="../../assets/forgetPasswordIcon.svg" alt="">
            </div>
            <div class="flex flex-col justify-between">
                <form 
                    @submit.prevent="handleSubmit"
                    class="flex flex-col gap-5"
                    novalidate
                >   
                    <h2 class="font-bold text-2xl">Reset Password</h2>
                    <InputAlt 
                        id="recoveryEmail"
                        type="email"
                        name="email"
                        placeholder="Enter your Email"
                        required
                    />
                    <ButtonAlt 
                        type="submit"
                        name="submit"
                        value="Recover Password"
                    />
                </form>
            </div>
        </div>
        <div 
            v-else
            class="bg-darkblue flex flex-col gap-4 px-8 py-6 text-center relative"
        >
            <div class="absolute right-6 top-4">
                <a href="#" @click="closeEmit">X</a>
            </div>
            <h2 class="text-2xl font-bold">We sent a recovery link to your email</h2>
            <p>Check your inbox (and also the spam folder if necessary) to access the password recovery link.</p>
            <span>
                <a href="#" class="underline" @click="toggleContent"> {{ emailRecovery.email }} </a>
                is not your email?
            </span>
        </div>
    </ModalOverlay>
</template>

<script>
import { toast } from "vue3-toastify"; 
import ButtonAlt from '../input/buttonAlt.vue';
import InputAlt from '../input/inputAlt.vue';
import ModalOverlay from '../modal/modalOverlay.vue';
import { mapActions } from "vuex";


export default {
    name: "EmailForForgetPassword",
    data() {
        return {
            emailRecovery: {
                email: null
            },
            isSent: false
        };
    },
    methods: {
        ...mapActions("modalForgetPassword",["setModalState"]),
        handleSubmit(event) {
            const form = event.target.closest("form");
            
            if (!form.checkValidity()) {
                const emailInput = form.querySelector("input");
                if (!emailInput.validity.valid) {
                    this.$toast(`Error in the field "${emailInput.name}"`, "error");
                    return
                }
            } else {
                this.submitForm(form);
            }
        },
        async submitForm(form) {
            this.emailRecovery.email = form.querySelector("input").value;

            this.$toast("Checking Email", "loading")
            try {
                const response = await fetch(`${process.env.VUE_APP_API_URL}/api/auth/forgot-password`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.emailRecovery)
                });

              
                this.$toast("", "remove");
                if (response.status === 200) {
                    this.isSent = true;
                    this.$toast("Email sent successfully!", "sucess");
                } else {
                    this.$toast("Error sending the email. Try again", "error");
                    console.log(response);
                    console.log(this.emailRecovery);
                }
            } catch (err) {
                this.$toast("", "remove");
                toast.error("There was a problem with the request. Please try again.");
                console.error(err);
            }
        },
        toggleContent() {
            this.isSent = !this.isSent;
        }
    },
    components: {
        ModalOverlay,
        InputAlt,
        ButtonAlt
    },
};
</script>
