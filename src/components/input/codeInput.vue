<template>
    <div class="flex gap-2 p-2 bg-transparent">
      <div v-for="(char, index) in valueArray" 
      :key="index" 
      class="w-10 h-10 flex justify-center items-center bg-darkblue rounded-lg shadow-md">
        <input
          type="text"
          class="w-full h-full text-center text-base font-bold border-none text-white bg-transparent rounded-lg"
          maxlength="1"
          v-model="valueArray[index]"
          @input="handleInput(index, $event)"
          :ref="'input-' + index"
        />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "codeInput",
    data() {
      return {
        valueArray: Array(8).fill(""),
      };
    },
    methods: {
      handleInput(index, event) {
        const input = event.target.value;
  
        if (/^[a-zA-Z0-9]*$/.test(input)) {
          this.valueArray[index] = input; 
        } else {
          this.valueArray[index] = ""; 
        }
  
        if (input && index < this.valueArray.length - 1) {
          const nextInput = this.$refs[`input-${index + 1}`][0];
          if (nextInput && nextInput.focus) {
            nextInput.focus();
          }
        }
  
        if (this.valueArray.every((char) => char !== "")) {
          this.$emit("update:value", this.valueArray.join(""));
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .char-box input:focus {
    border: 2px solid #007bff;
    box-shadow: 0 4px 10px rgba(0, 123, 255, 0.4);
  }
  </style>
