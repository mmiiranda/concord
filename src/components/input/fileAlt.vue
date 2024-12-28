<template>
   <div>
    <input type="file" 
    :name="name"
     :id="name"
     :accept="accept" 
    hidden>
    <label :for="name" class="bg-hovergray grid place-content-center rounded-full w-16 h-16 shadow-lg cursor-pointer">
        <img src="../icon/downloadIcon.svg" alt="Download Icon">
    </label>
    <p class="text-gray text-xs"> {{ label }} </p>
   </div>
</template>

<script>
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
        }
    }
</script>