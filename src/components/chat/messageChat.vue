<template>
    <div class="flex gap-4">
        <div class="w-10 h-10 rounded-full overflow-hidden mt-2">
            <img :src="src" class="w-full h-full object-cover"/>
        </div>
        <div class="w-full">
            <h4 class="font-bold text-xl"> {{ name }} </h4>
            <h5 class="text-gray text-sm font-bold -mt-1"> {{ date }} , {{ hour }} </h5>

            <div>
                <p> {{ message }} </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "messageChat",
        props: {
            name:{
                type: String,
                required: true
            },
            src: {
                type: String,
                required: true
            },
            date: {
                type: String,
                required: true
            },
            hour: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            }
        }
    }
</script>