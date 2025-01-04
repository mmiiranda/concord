<template>
    <div class="flex h-[90vh] bg-darkblue px-4 py-6">
        <div class="flex flex-col items-center justify-between">
            <div class="flex flex-col">
                <MiniServerIcon name="Home" :link="'/'" />

                <div class="w-4/5 bg-hovergray h-1 mt-2"></div>

                <div class="flex flex-col mt-2 gap-3">
                    <MiniServerIcon 
                        v-for="server in servers" 
                        :key="server.id"
                        :link="`/server/${server.id}`"
                        :name="server.name"
                        :imagePath="server.imagePath"
                    />
                    <CreateServerIcon @click="toogleModalCreateServer" />
                </div>
            </div>
        </div>

        <transition name="slide">
            <div 
                v-if="isOpen" 
                class="flex flex-col ml-8 text-white min-w-48"
            >
                <div>
                    <HomeSideBarContent />
                </div>
            </div>
        </transition>

        <createServer 
            v-if="ModalCreateServer" 
            @close="toogleModalCreateServer"
            @serverCreated="fetchUserServers"
        />
    </div>
</template>

<script>
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
        toogleBar() {
            this.isOpen = !this.isOpen;
        },
        toogleModalCreateServer() {
            this.ModalCreateServer = !this.ModalCreateServer;
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
