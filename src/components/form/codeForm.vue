  <template>
      <form @submit.prevent="submitForm" class="flex justify-center">
        <CodeInput @update:value="handleCodeInput" />
      </form>
    </template>
    
  <script>
    
import { mapActions } from "vuex";
import CodeInput from "../input/codeInput.vue";
    
    export default {
      name: "codeForm",
      components: {
        CodeInput,
      },
      data() {
        return {
          codeValue: {
            code: ""
          }, 
        };
      },
      methods: {
        ...mapActions(["setFirstAcess", "login"]),
        ...mapActions("register", ["setUser"]),
        handleCodeInput(value) {
          this.codeValue.code = value; 
    
          if (this.codeValue.code.length === 8) {
            this.submitForm(); 
          }
        },
        async submitForm() {
          console.log("Código enviado:", this.codeValue);
          this.emitLoading();

          try {
              const response = await fetch(`${process.env.VUE_APP_API_URL}/api/auth/confirm`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(this.codeValue) // Enviar como objeto JSON
              });

              if (response.ok) {
                  const responseData = await response.json();

                  localStorage.setItem("token", responseData.token);
                  localStorage.setItem("UserSetting", JSON.stringify(responseData.user));

                  this.setFirstAcess(true)
                  this.setUser(null)
                  this.login();
                  this.$router.push("/");
              } else {
                  console.log("Erro ao confirmar código:", response);
                  this.$toast("Invalid Code", "error");
              }
          } catch (err) {
              console.error("Erro na requisição:", err);
              this.$toast("There was a problem confirming the code", "error");
          } finally {
              this.emitLoading();
          }
      },
        emitLoading(){
          this.$emit("loading")
        } 
      },
      emits: ["loading"]
    };
    </script>
    