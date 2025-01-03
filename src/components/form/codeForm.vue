  <template>
      <form @submit.prevent="submitForm" class="flex justify-center">
        <CodeInput @update:value="handleCodeInput" />
      </form>
    </template>
    
  <script>
    
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
        handleCodeInput(value) {
          this.codeValue.code = value; 
    
          if (this.codeValue.code.length === 8) {
            this.submitForm(); 
          }
        },
        async submitForm() {
          try{
            console.log("Código enviado:", this.codeValue)
            this.emitLoading()

            fetch("http://localhost:8080/api/auth/confirm", {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.codeValue)
              }).then(response =>{
                if(response.status == 202){

                    this.$router.push("/login")
                }else{  
                  this.$toast(`Codigo Inválido`, "error");
                }
                this.emitLoading()
              })
          }catch(err){
            console.error(err)
          }
        },
        emitLoading(){
          this.$emit("loading")
        }
      },
      emits: ["loading"]
    };
    </script>
    