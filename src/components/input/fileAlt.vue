<template>
    <div>
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
          class="bg-hovergray grid place-content-center rounded-full w-16 h-16 shadow-lg cursor-pointer"
       >
          <img 
             :src="previewImage || defaultIcon" 
             alt="Selected Image" 
             class="w-full h-full object-cover rounded-full"
          >
       </label>
       <p class="text-gray text-xs"> {{ label }} </p>
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
       onFileChange(event) {
          const file = event.target.files[0];
          if (file) {
             const reader = new FileReader();
             reader.onload = (e) => {
                this.previewImage = e.target.result;
             };
             reader.readAsDataURL(file);
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
 