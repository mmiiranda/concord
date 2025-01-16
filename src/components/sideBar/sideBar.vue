<template>
    <div class="flex h-[90vh] bg-darkblue">
        <div class="flex flex-col items-center py-6">
            <div class="flex flex-col items-center gap-1">
                <!-- Ícone de "home" que reseta para a tela principal -->
                <MiniServerIcon
                  name="Home"
                  imagePath="logo_icon.svg"
                  @click="returnMainPage"
                />

                <div class="w-4/5 bg-hovergray h-[3px] mt-2"></div>

                <!-- Aqui percorremos a lista de servidores carregada -->
                <div class="flex flex-col gap-3">
                    <MiniServerIcon
                        v-for="server in servers"
                        :key="server.id"
                        :name="server.name"
                        :imagePath="server.imagePath"
                        @click="openServerChat(server)"
                    />

                    <!-- Ícone que abre o modal de criar servidor -->
                    <CreateServerIcon @click="toogleModalCreateServer" />
                </div>
            </div>
        </div>

        <!-- Exemplo de sidebar expandida (sua transition) -->
        <transition name="slide">
            <div 
                v-if="isOpen" 
                class="bg-[#363636] flex flex-col ml-2 text-white min-w-48"
            >
                <div>
                    <HomeSideBarContent />
                </div>
            </div>
        </transition>

        <!-- Modal para criar novo servidor -->
        <createServer 
            v-if="ModalCreateServer" 
            @close="toogleModalCreateServer"
            @serverCreated="fetchUserServers"
        />
    </div>
</template>

<script>
import { mapActions } from "vuex";
import MiniServerIcon from "@/components/servers/MiniServerIcon.vue";
import CreateServerIcon from "@/components/servers/CreateServerIcon.vue";
import CreateServer from "@/components/form/CreateServer.vue";  
import HomeSideBarContent from "./home/homeSideBarContent.vue";

export default {
    name: "sideBar",
    components: {
        MiniServerIcon,
        CreateServerIcon,
        CreateServer, 
        HomeSideBarContent
    },
    data() {
        return {
            isOpen: true,
            ModalCreateServer: false,
            servers: [] 
        };
    },
    mounted() {
        this.fetchUserServers();
    },
    methods: {
        // Ação do Vuex para limpar ou definir o activeChat
        ...mapActions("chat", ["setActiveChat"]),

        toogleBar() {
            this.isOpen = !this.isOpen;
        },
        toogleModalCreateServer() {
            this.ModalCreateServer = !this.ModalCreateServer;
        },
        returnMainPage(){
            // Para "sair" do chat, definimos activeChat como null
            this.setActiveChat(null);
        },

        // Quando clicamos no ícone do servidor, abrimos o chat do servidor
        openServerChat(server) {
            // Define o chat como type=server
            this.setActiveChat({
                id: server.id,
                name: server.name,
                type: "server"
            });
        },

        async fetchUserServers() {
            const userSettings = localStorage.getItem("UserSetting");

            if (!userSettings) {
                console.error("Erro: Configurações do usuário não encontradas no localStorage.");
                return;
            }

            const user = JSON.parse(userSettings);
            const username = user.username;
            const token = localStorage.getItem("token");

            try {
                const response = await fetch(`http://localhost:8080/api/users/${username}/servers`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Erro ao buscar servidores");
                }

                const data = await response.json();

                this.servers = Array.isArray(data)
                    ? data.map(server => ({
                        id: server.id,
                        name: server.name || "Servidor",
                        imagePath: server.imagePath 
                            ? `http://localhost:8080/api/files/images?file-id=${server.imagePath}`
                            : null
                    }))
                    : [];

                console.log("Servidores carregados:", this.servers);
            } catch (error) {
                console.error("Erro ao carregar servidores:", error);
            }
        }
    }
};
</script>

<style scoped>
.bg-darkblue {
    background-color: #23272A;
}
.bg-hovergray {
    background-color: #40444B;
}
</style>
