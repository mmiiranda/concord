<template>
    <ModalOverlay>
        <div class="flex flex-col bg-darkblue text-white py-4 px-5 rounded shadow">
            <h2 class="text-white font-bold text-2xl">Criar Servidor</h2>
            <form class="flex flex-col gap-5 mt-4 items-center">
                <fileAlt name="fileImage" 
                label="*Faça o Upload de uma imagem"
                accept=".png, .jpg, .jpeg"
                class="grid place-items-center"/>
                <inputAlt  type="text" name="ServerName" placeholder="Insira o nome do Server"/>
                <div class="flex w-full justify-center gap-4">
                    <borderButton class="w-full text-red border-red px-1 py-1" 
                    type="button" 
                    value="Fechar" 
                    @click="closeModal" />
                    <buttonAlt class="w-full" type="submit" value="Criar Server" />
                </div>
            </form>
        </div>
    </ModalOverlay>
</template>

<script>
import inputAlt from "@/components/input/inputAlt.vue"
import buttonAlt from "@/components/input/buttonAlt.vue"
import borderButton from "@/components/input/borderButton.vue"
import fileAlt from "@/components/input/fileAlt.vue"
import ModalOverlay from "@/components/modal/modalOverlay.vue"

    export default {
        name: "createServer",
        components: {
            inputAlt,
            buttonAlt,
            fileAlt,
            borderButton,
            ModalOverlay
        },
        emits: ["close"],
        methods: {
        closeModal() {
            this.$emit("close"); 
        }
    }
    }
</script>