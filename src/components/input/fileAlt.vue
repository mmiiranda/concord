<template>
   <div>
      <p class="text-gray text-xs"> {{ label }} </p>
      <input 
         type="file" 
         :name="name"
         :id="name"
         :accept="accept" 
         hidden 
         @change="onFileChange"
      >
      <label 
         :for="name" 
         class="border-dashed overflow-hidden border-white border-2 grid place-content-center rounded-full w-24 h-24 shadow-lg cursor-pointer my-2"
         @mouseover="showIcon = true"
         @mouseleave="showIcon = false"
      >
         <img 
            :src="showIcon ? defaultIcon : (placeholderImage||previewImage)" 
            alt="Selected Image" 
            class="w-full h-full object-cover"
         >
      </label>
   </div>
</template>

<script>
import defaultIcon from '../icon/downloadIcon.svg'; 

export default {
   name: "fileAlt",
   props: {
      name: {
         type: String,
         required: true
      },
      accept: {
         type: String,
         default: ""   
      },
      label: String,
      placeholderImage: {
         type: String,
         default: null // Caso não seja fornecida, mantém o estado atual
      }
   },
   data() {
      return {
         previewImage: defaultIcon,
         defaultIcon,
         showIcon: false, 
      };
   },
   methods: {
      async onFileChange(event) {
         const file = event.target.files[0];

         if (file) {
            console.log("📂 Arquivo selecionado:", file);

            // Criando um preview da imagem
            const reader = new FileReader();
            reader.onload = (e) => {
                  this.previewImage = e.target.result; // Define a pré-visualização da imagem
                  this.$emit("imageUploaded", file);  // Emite o evento para o componente pai com o arquivo
            };
            reader.readAsDataURL(file);
         }
      },
   }
};
</script>

<style scoped>
img {
   display: block;
   max-width: 100%;
   max-height: 100%;
}
</style>