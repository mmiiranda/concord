<template>
    <div class="mt-4 min-h-[calc(100dvh-5rem)] overflow-y-auto">
        <h3 class="font-bold text-2xl mt-2">Profile</h3>
        <div class="px-1 md:px-12 max-w-screen-md mx-auto">
            <div class="bg-darkblue rounded-md flex flex-col md:flex-row justify-around gap-5 py-6 px-8 mt-4">
                <div class="grid place-items-center">
                    <div>
                        <FileAlt 
                            accept=".jpg, .png, .jpeg"
                            name="setting-photo"
                            :placeholder-image="getImage(getUser.imagePath)"
                            @imageUploaded="toogleModalUpdatePhoto"
                        />
                    </div> 
                </div>
                <div class="mt-2 flex flex-col gap-2">
                    <UpdateSetting 
                        label="Name" 
                        :value="getUser.name" 
                        @clicked="toogleModalUpdateName" 
                    />
                    <UpdateSetting 
                        label="Username" 
                        :value="getUser.username" 
                        @clicked="toogleModalUpdateUsername" 
                    />  
                    <UpdateSetting label="Email" :value="getUser.email" />
                </div>
            </div>
        </div>
        <div>
            <h3 class="font-bold text-2xl mt-4">Account</h3>
            <div class="flex flex-col gap-8 mt-2">
                <div class="mt-2 text-xl">
                    <h3 class="font-bold text-gray">Password</h3>
                    <div class="w-48 text-lg mt-2">
                        <ButtonAlt type="button"
                            value="Change Password"
                            @click="missing"
                        />
                    </div>
                </div>
                <hr class="border-darkblue">    
                <div class="text-xl text-gray">
                    <h3 class="font-bold">Account removal</h3>
                    <span class="text-base font-bold">
                        *After deleting the account, you will not have access to your messages
                    </span>
                    <div class="w-48 text-lg mt-2">
                        <ButtonAlt type="button" value="Delete account" class="bg-red" @click="missing" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <UpdateUserUsername @close="toogleModalUpdateUsername" v-show="IsModalUsername" :username="getUser.username" />
    <UpdateUserName @close="toogleModalUpdateName" v-show="IsModalName" :name="getUser.name" />
    <UpdateUserPhoto 
        @close="toogleModalUpdatePhoto" 
        v-show="IsModalPhoto" 
        :imagePath="selectedImage"
        :selectedFile="selectedFile"
    />
</template>

<script>
import UpdateUserName from '@/components/form/UpdateUserName.vue';
import UpdateUserPhoto from '@/components/form/UpdateUserPhoto.vue';
import UpdateUserUsername from '@/components/form/UpdateUserUsername.vue';
import ButtonAlt from '@/components/input/buttonAlt.vue';
import FileAlt from '@/components/input/fileAlt.vue';
import UpdateSetting from '@/components/input/updateSetting.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: "UserSettings",
    data() {
        return {
            IsModalUsername: false,
            IsModalName: false,
            IsModalPhoto: false,
            selectedImage: "",
            selectedFile: null
        };
    },
    components: {
        FileAlt,
        UpdateSetting,
        ButtonAlt,
        UpdateUserUsername,
        UpdateUserName,
        UpdateUserPhoto
    },
    computed: {
        ...mapGetters(["getUser"])
    },
    methods: {
        ...mapActions(["missing"]),
        getImage(imagePath) {
            return imagePath ? `${process.env.VUE_APP_API_URL}/api/files/images?file-id=${imagePath}` : 'no-photo.jpg';
        },
        toogleModalUpdateUsername() {
            this.IsModalUsername = !this.IsModalUsername;
        },
        toogleModalUpdateName() {
            this.IsModalName = !this.IsModalName;
        },
        toogleModalUpdatePhoto(file = null) {
            if (file && file instanceof File) {
                console.log("📂 Arquivo selecionado para upload:", file);
                this.selectedImage = URL.createObjectURL(file);
                this.selectedFile = file;
            } else {
                this.selectedImage = this.getImage(this.getUser.imagePath);
                this.selectedFile = null;
            }
            this.IsModalPhoto = !this.IsModalPhoto;
        }
    }
};
</script>
