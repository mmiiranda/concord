<template>
    <div class="flex flex-col items-center cursor-pointer
    opacity-80 hover:opacity-100  transition-all ease-in">
      <div
        class="w-36 h-36 overflow-hidden rounded-full shadow-2xl"
      >
        <img :src="img" class="w-full h-full object-cover">
      </div>
      <h2 class="font-bold mt-1 max-w-32"> {{ title }} </h2>
    </div>
  </template>   
  
  <script>
  export default {
    name: "itemCarrousel",
    props: {
      img: String,
      title: String,
    },
  };
  </script>
  