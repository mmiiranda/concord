<template>
    <button 
    :class="
    ['rounded-full h-12 w-12 grid place-items-center opacity-80 hover:opacity-100 hover:-translate-y-1 ease-in transition-all',
    isActive ? 'bg-purple/50' : ''
    ]"
    @click="toogleState">
        <img :src="src" :alt="alt">
    </button>
</template>

<script>
    export default {
        name: "toogleIconButton",
        data(){
            return{
                isActive: false
            }
        },
        methods: {
            toogleState(){
                this.isActive = !this.isActive;
            }
        },
        props: {
            src: {
                type: String,
                required: true,
            },
            color:[

            ]
        }
    }
</script>