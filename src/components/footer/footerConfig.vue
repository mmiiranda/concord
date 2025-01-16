<template>
    <div 
    :class="[
      'fixed bg-[#262626] text-white w-full flex h-screen',
      isPageOptionOpen ? 'mt-0' : 'mt-[90vh]'
    ]">
        <headerFooter 
        @toogle-config="toogleConfig"
        />
    </div>
</template>

<script>
import headerFooter from "./headerFooter.vue"

    export default {
        name: "footerConfig",
        data(){
            return {
                isPageOptionOpen: false
            }
        },
        components:{
            headerFooter
        },
        methods: {
            toogleConfig(){
                this.isPageOptionOpen = !this.isPageOptionOpen
            }
        }

    }
</script>