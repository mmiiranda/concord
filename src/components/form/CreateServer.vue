<template>
    <ModalOverlay>
        <div class="max-w-2/5 w-auto lg:min-w-96 flex flex-col bg-darkblue text-white py-4 px-5 rounded shadow text-center">
            <h2 class="text-white font-bold text-3xl">Criar Servidor</h2>
            <form @submit.prevent="createServer" class="flex flex-col gap-5 mt-4 items-center">
                
                <fileAlt 
                    name="fileImage" 
                    label="*Faça o Upload de uma imagem"
                    accept=".png, .jpg, .jpeg"
                    class="grid place-items-center"
                    @imageUploaded="setImageTempPath"
                />

                <inputAlt 
                    v-model="serverName"
                    type="text" 
                    name="ServerName" 
                    id="serverName"
                    placeholder="Insira o nome do Server"
                />

                <div class="flex  justify-center gap-4 w-4/5">
                    <borderButton 
                        class="w-full text-red border-red px-1 py-1" 
                        type="button" 
                        value="Fechar" 
                        @click="closeModal" 
                    />
                    
                    <buttonAlt 
                        class="w-full" 
                        type="submit" 
                        value="Criar Server" 
                    />
                </div>
            </form>
        </div>
    </ModalOverlay>
</template>

<script>
import { mapGetters } from "vuex";
import inputAlt from "@/components/input/inputAlt.vue";
import buttonAlt from "@/components/input/buttonAlt.vue";
import borderButton from "@/components/input/borderButton.vue";
import fileAlt from "@/components/input/fileAlt.vue";
import ModalOverlay from "@/components/modal/modalOverlay.vue";

export default {
    name: "CreateServer",
    components: {
        inputAlt,
        buttonAlt,
        fileAlt,
        borderButton,
        ModalOverlay
    },
    data() {
        return {
            serverName: "",  
            imageTempPath: null
        };
    },
    computed: {
        ...mapGetters(["getUser", "getToken"])
    },
    emits: ["close", "serverCreated"], 
    methods: {
        closeModal() {
            this.$emit("close");  
        },

        setImageTempPath(fileId) {
            console.log("Imagem carregada, fileId:", fileId);
            this.imageTempPath = fileId;
        },

        async createServer() {
            await this.$nextTick();

            if (!this.getUser) {
                console.error("Erro: Configurações do usuário não encontradas.");
                return;
            }

            const ownerId = this.getUser.id;

            console.log("Tentando criar servidor com os seguintes dados:");
            console.log("Nome do Servidor:", this.serverName);
            console.log("Imagem Temporária (UUID):", this.imageTempPath);
            console.log("Dono (ownerId):", ownerId);

            if (!this.serverName) {
                this.$toast("Erro: Nome do servidor não informado", "error");
                return;
            }

            const requestBody = {
                name: this.serverName,
                ownerId: ownerId,
                imageTempPath: this.imageTempPath
            };

            try {
                const response = await fetch(`${process.env.VUE_APP_API_URL}/api/servers`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${this.getToken}`
                    },
                    body: JSON.stringify(requestBody)
                });

                if (!response.ok) {
                    throw new Error("Erro ao criar o servidor");
                }

                const data = await response.json();
                console.log("Servidor criado com sucesso:", data);

                this.$emit("serverCreated");
                this.closeModal();
            } catch (error) {
                console.error("Erro ao criar servidor:", error);
            }
        }
    }
};
</script>
