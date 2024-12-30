<template>
    <div class="flex gap-1">
        <div>
            <img :src="src"
            class="w-12 h-12 rounded-full ">
        </div>
        <div class="flex flex-col justify-center">
            <h4 class="font-bold"> {{ name }} </h4>
            <h5 class="font bold text-gray text-sm"> @{{ username }} </h5>
        </div>
    </div>
</template>

<script>
    export default {
        name: "userProfile",
        props: {
            name:{
                type: String,
                required: true,
            },
            username:{
                type: String,
                required: true,
            },
            src:{
                type: String,
                required: true,
            },
        }
    }
</script>