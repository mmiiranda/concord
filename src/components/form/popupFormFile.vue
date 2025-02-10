<template>
    <div>
        <form class="flex flex-col items-center gap-2">
            <FileAlt 
            name="inputImage"
            accept="*/*"
            />
            <div>
                <buttonAlt 
                type="subimit"
                name="submitFile"
                value="Submeter"/>
            </div>
        </form>
        
    </div>
</template>

<script>
import FileAlt from '../input/fileAlt.vue';
import buttonAlt from '../input/buttonAlt.vue';

    export default {
        name: "popupFormFile",
        components: {
            FileAlt,
            buttonAlt
        }
    }
</script>