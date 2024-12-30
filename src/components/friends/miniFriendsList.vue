<template>
    <div >
        
    </div>
</template>

<script>
import FriendInMenu from './friendInMenu.vue';

    export default {
        name: "miniFriendsList",
        components: {
            FriendInMenu
        },  
        props: {
            friends: {
                type: String,
                required: true
            }
        }
    }
</script>