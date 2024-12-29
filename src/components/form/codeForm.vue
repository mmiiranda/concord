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
        codeValue: "", // Armazena o valor recebido do CodeInput
      };
    },
    methods: {
      handleCodeInput(value) {
        this.codeValue = value; // Atualiza o valor emitido pelo CodeInput
  
        if (this.codeValue.length === 8) {
          this.submitForm(); // Chama o submit automático ao completar o código
        }
      },
      submitForm() {
        // Simulação de envio do código
        alert(`Código enviado com sucesso: ${this.codeValue}`);
        console.log("Código enviado:", this.codeValue);
  
        // Aqui você pode adicionar a lógica de envio, como uma chamada para uma API
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos opcionais para o formulário */
  </style>
  