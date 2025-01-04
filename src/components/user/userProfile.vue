<template>
    <div class="flex gap-1">
        <div class="flex items-center">
            <img 
                :src="getProfileImage()" 
                alt="User Profile"
                class="w-12 h-12 rounded-full"
            />
        </div>
        <div class="flex flex-col justify-center">
            <h2 class="text-lg font-bold">{{ user.name }}</h2>
            <p class="text-sm text-gray-300">{{ user.username }}</p>
        </div>
    </div>
</template>

<script>
import defaultImage from "@/assets/default-avatar.png";  // ✅ Caminho correto

export default {
    name: "UserProfile",
    data() {
        return {
            user: {
                name: "unknown",
                username: "@unknown",
                imagePath: null
            },
            defaultImage  // ✅ Imagem padrão caso o `imagePath` seja nulo
        };
    },
    mounted() {
        this.loadUserData();
    },
    methods: {
        loadUserData() {
            const userSettings = localStorage.getItem("UserSetting");
            if (userSettings) {
                try {
                    const parsedUser = JSON.parse(userSettings);
                    this.user = {
                        name: parsedUser.name || "unknown",
                        username: "@" + parsedUser.username || "@unknown",
                        imagePath: parsedUser.imagePath  // Pode ser `null`
                    };
                } catch (error) {
                    console.error("Erro ao carregar os dados do usuário:", error);
                }
            }
        },

        getProfileImage() {
            if (this.user.imagePath) {
                return `http://localhost:8080/uploads/${this.user.imagePath}`;  // 🔥 Ajuste para carregar imagens remotas do backend
            }
            return this.defaultImage;
        }
    }
};
</script>

<style scoped>
img {
    display: block;
    max-width: 100%;
    max-height: 100%;
}
</style>
