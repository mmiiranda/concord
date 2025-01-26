<template>
    <div class="mt-6">
        <h3 class="font-bold text-2xl mt-2">Profile </h3>
        <div class="px-1 md:px-12 max-w-screen-md mx-auto">
            <div class="bg-darkblue rounded-md flex justify-around gap-5 py-6 px-8 mt-4">
                <div class="grid place-items-center">
                    <FileAlt accept=".jpg"
                        name="setting-photo"
                        :placeholder-image="getImage(getUser.imagePath)"
                    /> 
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
                    <h3 class="font-bold text-gray">Passaword</h3>
                    <div class="w-48 text-lg mt-2">
                        <ButtonAlt
                        type="button"
                        value="Change Password"
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
                        <ButtonAlt
                        type="button"
                        value="Delete account"
                        class="bg-red"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <UpdateUserUsername @close="toogleModalUpdateUsername" v-show="IsModalUsername" :username="getUser.username" />
    <UpdateUserName @close="toogleModalUpdateName"  v-show="IsModalName" :name="getUser.name" />
</template>

<script>
import UpdateUserName from '@/components/form/UpdateUserName.vue';
import UpdateUserUsername from '@/components/form/UpdateUserUsername.vue';
import ButtonAlt from '@/components/input/buttonAlt.vue';
import FileAlt from '@/components/input/fileAlt.vue';
import UpdateSetting from '@/components/input/updateSetting.vue';
import { mapGetters } from 'vuex';

    export default {
        name: "UserSettings",
        data(){
            return{
                IsModalUsername: false,
                IsModalName: false
            }
        },
        components: {
            FileAlt,
            UpdateSetting,
            ButtonAlt,
            UpdateUserUsername,
            UpdateUserName
        },
        computed:{
            ...mapGetters(["getUser"])
        },
        methods: {
            getImage(imagePath){
                return imagePath ? `http://localhost:8080/api/files/images?file-id=${imagePath}`: 'no-photo.jpg';
            },
            toogleModalUpdateUsername(){
                this.IsModalUsername = !this.IsModalUsername
                console.log("Toggling modal for username");
            },
            toogleModalUpdateName(){
                this.IsModalName = !this.IsModalName
                console.log("Toggling modal for name");
            }
        }
    }
</script>