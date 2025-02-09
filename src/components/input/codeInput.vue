<template>
  <div class="flex flex-col gap-2 p-2 bg-transparent">
    <input 
      type="text" 
      class="hidden-input" 
      v-model="hiddenValue" 
      @input="updateValueArrayFromHidden"
      @paste="handlePaste"
      @click="updateSelectedIndex"
      @keyup="updateSelectedIndex"
      ref="hiddenInput"
    />

    <div class="flex gap-2">
      <div 
        v-for="(char, index) in valueArray" 
        :key="index" 
        :class="['w-10 h-10 flex justify-center items-center bg-darkblue rounded-lg shadow-md', { 'selected-box': index === selectedIndex }]"
      >
        <div
          class="w-full h-full text-center text-base font-bold text-white bg-transparent rounded-lg cursor-pointer flex justify-center items-center"
          @click="focusHiddenInputAt(index)"
        >
          {{ char || " " }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "codeInput",
  data() {
    return {
      valueArray: Array(8).fill(""),
      hiddenValue: "", 
      selectedIndex: 0, // Adicionado para rastrear o índice selecionado
    };
  },
  methods: {
    focusHiddenInputAt(index) {
      const hiddenInput = this.$refs.hiddenInput;
      if (hiddenInput && hiddenInput.setSelectionRange) {
        hiddenInput.focus();
        hiddenInput.setSelectionRange(index, index + 1);
        this.selectedIndex = index; // Atualiza o índice selecionado
      }
    },
    updateValueArrayFromHidden() {
      const sanitizedValue = this.hiddenValue.replace(/[^a-zA-Z0-9]/g, "").slice(0, this.valueArray.length);
      this.valueArray = sanitizedValue.split("").concat(Array(this.valueArray.length - sanitizedValue.length).fill(""));
      this.hiddenValue = sanitizedValue;
      this.$emit("update:value", this.hiddenValue);
      this.selectedIndex = this.$refs.hiddenInput.selectionStart || 0; // Atualiza o índice selecionado
    },
    handlePaste(event) {
      const pastedValue = (event.clipboardData || window.clipboardData).getData("text");
      this.hiddenValue = pastedValue.replace(/[^a-zA-Z0-9]/g, "").slice(0, this.valueArray.length);
      this.updateValueArrayFromHidden();
      event.preventDefault();
    },
    focusHiddenInput() {
      const hiddenInput = this.$refs.hiddenInput;
      if (hiddenInput) {
        hiddenInput.focus();
        this.selectedIndex = 0; // Define o índice selecionado como 0 ao montar
      }
    },
    updateSelectedIndex() {
      this.selectedIndex = this.$refs.hiddenInput.selectionStart || 0; // Atualiza o índice selecionado ao clicar ou navegar com teclado
    },
  },
  mounted() {
    this.focusHiddenInput();
  },
};
</script>

<style scoped>
.hidden-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.char-box input:focus {
  border: 2px solid #9333ea;
  box-shadow: 0 4px 10px #9333ea;
}

.selected-box {
  position: relative;
  align-items: center;
  border: 2px solid #9333ea; 
  box-shadow: 0 4px 10px #9333ea;
}

.selected-box::after {
  content: "";
  position: absolute;
  height: 75%;
  width: 1.5px;
  background-color: #fff;

  text-align: center;
  animation: input 2s infinite;
}

@keyframes input{
  0%{
    opacity: 0;
  }
  5%{
    opacity: 1;
  }
}
</style>    