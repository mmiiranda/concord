<template>
    <div>
        <FileAlt
            accept=".jpg"
            name="setting-photo"
            :placeholder-image="getImage(imagePath)"
            @file-changed="updatePhoto"
        />
    </div>
</template>

<script>
export default {
    name: "UpdateUserPhoto",
    props: {
        imagePath: {
            type: String,
            required: true
        }
    },
    methods: {
        getImage(imagePath) {
            return imagePath
                ? `http://localhost:8080/api/files/images?file-id=${imagePath}`
                : 'no-photo.jpg';
        },
        updatePhoto(newFile) {
            // Logic to handle photo upload via API
            console.log("Photo updated: ", newFile);
        }
    }
};
</script>
