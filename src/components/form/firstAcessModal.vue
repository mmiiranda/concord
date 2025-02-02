<template>
    <ModalOverlay>
        <div class="bg-cleangray text-white animate-spawn    px-3 md:px-8 py-4 flex flex-col text-center rounded relative">
            <h2 class="font-bold text-2xl md:text-3xl">We're happy to have you here!</h2>
            <p class="opacity-80">Keep editing your profile</p>
            <form 
            @submit.prevent="submitForm"    
            class="grid place-items-center w-full mt-4">
                <div class="flex flex-col md:flex-row items-center md:gap-16">
                    <div>
                        <img 
                            src="@/assets/concordilu.png" 
                            alt="WELCOME TO CONCORD"
                            class="max-w-72 md:max-w-80"
                        >
                    </div>
                    <div>
                        <div class="flex flex-col justify-center items-center">
                            <FileAlt 
                                name="firstAccessImage"
                                accept=".jpg, .png, .jpeg"
                                @imageUploaded="changeImages"
                            />
                            <p class="text-sm opacity-80">Choose a photo for your profile</p>
                        </div>
                    </div>
                </div>
                <div class="w-full flex justify-end gap-4 mt-2 md:mt-0">
                    <div class="grid place-items-center">
                        <div>
                            <a 
                                href="#" 
                                class="text-red underline font-bold text-xl"
                                @click="closeModal"
                                >
                                    Close
                                </a>
                        </div>
                    </div>
                    <div>
                        <ButtonAlt 
                            type="submit"
                            value="Submit"
                        />
                    </div>  
                </div>
            </form>
        </div>
    </ModalOverlay>
</template>

<script>
import { mapActions } from 'vuex';
import ButtonAlt from '../input/buttonAlt.vue';
import FileAlt from '../input/fileAlt.vue';
import ModalOverlay from '../modal/modalOverlay.vue';

    export default {
        name: "firstAcessModal",
        data(){
            return{
                selectedImage: "",
                selectedFile: null
            }
        },
        components:{
            ModalOverlay,
            FileAlt,
            ButtonAlt
        },
        methods:{
            ...mapActions(["setFirstAcess", "updateUserImage"]),
            closeModal(){
                this.setFirstAcess(false);
            },

            changeImages(file = null){
                if (file && file instanceof File) {
                    console.log("📂 Arquivo selecionado para upload:", file);
                    this.selectedImage = URL.createObjectURL(file);
                    this.selectedFile = file;
                } else {
                    this.selectedImage = this.getImage(this.getUser.imagePath);
                    this.selectedFile = null;
                }
            },

            async uploadFile(file) {
                const formData = new FormData();
                formData.append("image", file, file.name);

                const token = localStorage.getItem("token");

                try {
                    const response = await fetch(`http://${process.env.VUE_APP_API_URL}/api/files/images`, {
                        method: "POST",
                        body: formData,
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    if (!response.ok) {
                        throw new Error("Erro ao fazer upload da imagem");
                    }

                    const data = await response.json();

                    console.log("✅ Upload realizado com sucesso:", data);
                    return data;
                } catch (error) {
                    console.error("Erro no upload:", error);
                    return null;
                }
            },

            async submitForm() {
                if (!this.selectedFile) {
                    console.warn("⚠ Nenhuma nova imagem selecionada!");
                    return;
                }

                console.log("📤 Fazendo upload da nova imagem...");
                const tempPath = await this.uploadFile(this.selectedFile);
                console.log("🚀 Caminho da imagem após upload:", tempPath);

                if (!tempPath) {
                    console.error("❌ Erro ao fazer upload da imagem.");
                    return;
                }

                console.log("✅ Upload bem-sucedido, atualizando usuário...");
                console.log(tempPath.fileId)
                await this.updateUserImage(tempPath.fileId);

                this.setFirstAcess(false)
            },
        }
    }
</script>