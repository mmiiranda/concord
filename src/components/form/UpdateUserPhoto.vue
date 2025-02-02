<template>
    <ModalOverlay>
        <div class="bg-darkblue p-4 rounded min-w-80">
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-bold">
                    Change Profile Picture
                </h2>
                <div>
                    <a href="#" @click="emitClose">X</a>
                </div>
            </div>
            <form class="flex flex-col items-center mt-4 gap-6" @submit.prevent="submitForm">
                <FileAlt 
                    name="confirm-ft"
                    accept=".jpg, .png, .jpeg"
                    :placeholder-image="img"
                    @imageUploaded="changeImg"
                />
                <div class="w-full">
                    <ButtonAlt type="submit" value="Confirm" />
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
    name: "UpdateUserPhoto",
    props: {
        imagePath: {
            type: String,
            required: true
        },
        selectedFile: {
            type: File,
            default: null
        }
    },
    data() {
        return {
            img: this.imagePath || "no-photo.jpg",
            fileToUpload: this.selectedFile // Variável interna para armazenar o arquivo
        };
    },
    watch: {
        imagePath(newValue) {
            this.img = newValue;
        },
        selectedFile(newFile) {
            this.fileToUpload = newFile;
        }
    },
    components: {
        ModalOverlay,
        FileAlt,
        ButtonAlt
    },
    methods: {
        ...mapActions(["updateUserImage"]),

        changeImg(file) {
            if (!file || !(file instanceof File)) {
                console.error("Arquivo inválido recebido:", file);
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                this.img = e.target.result;
                this.fileToUpload = file;
            };
            reader.readAsDataURL(file);
        },

        async submitForm() {
            if (!this.fileToUpload) {
                console.warn("⚠ Nenhuma nova imagem selecionada!");
                return;
            }

            console.log("📤 Fazendo upload da nova imagem...");
            const tempPath = await this.uploadFile(this.fileToUpload);
            console.log("🚀 Caminho da imagem após upload:", tempPath);

            if (!tempPath) {
                console.error("❌ Erro ao fazer upload da imagem.");
                return;
            }

            console.log("✅ Upload bem-sucedido, atualizando usuário...");
            console.log(tempPath.fileId)
            await this.updateUserImage(tempPath.fileId);

            this.emitClose();
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

        emitClose() {
            this.$emit("close");
        }
    },
    emits: ["close"]
};
</script>
