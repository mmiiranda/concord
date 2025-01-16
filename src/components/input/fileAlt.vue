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
         class="border-dashed border-white border-2  grid place-content-center rounded-full w-16 h-16 shadow-lg cursor-pointer my-2"
      >
         <img 
            :src="previewImage || defaultIcon" 
            alt="Selected Image" 
            class="w-full h-full object-cover rounded-full"
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
      label: String
   },
   data() {
      return {
         previewImage: null,
         defaultIcon, 
      };
   },
   methods: {
      async onFileChange(event) {
         const file = event.target.files[0];
         if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
               this.previewImage = e.target.result;
            };
            reader.readAsDataURL(file);
            
            await this.uploadFile(file);
         }
      },
      
      async uploadFile(file) {
         const formData = new FormData();
         formData.append("image", file);

         const token = localStorage.getItem("token");

         try {
            const response = await fetch("http://localhost:8080/api/files/images", {
               method: "POST",
               body: formData,
               headers: {
                  "Authorization": `Bearer ${token}`
               }
            });

            if (!response.ok) {
               throw new Error("Erro ao fazer upload da imagem");
            }

            const data = await response.json();
            console.log("File ID:", data.fileId);

            this.$emit("imageUploaded", data.fileId);

         } catch (error) {
            console.error("Erro no upload:", error);
         }
      }
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