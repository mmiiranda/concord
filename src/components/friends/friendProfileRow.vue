<template>
    <div class="flex flex-col justify-center">
        <div>
            <h4 class="font-bold text-sm"> {{ name }} </h4>
        </div>
        <div>
            <h5 class="text-[12px] text-gray -mt-1"> @{{ username }} </h5>
        </div>
    </div>
</template>

<script>
    export default {
        name: "friendProfileRow",
        props: {
            src: {
                    type: String,
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                username: {
                    type: String,
                    required: true,
                },
        }
    }
</script>