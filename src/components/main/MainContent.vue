<template>
    <div>
        <FriendContent />
    </div>
</template>

<script>
import FriendContent from '../friends/FriendContent.vue';

// import EditServerModal from "../modal/EditServerModal.vue";


    export default {
        name: "MainContent",
        components: {
            // EditServerModal
            FriendContent
        }
    }
</script>