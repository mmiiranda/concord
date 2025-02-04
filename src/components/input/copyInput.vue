<template>
    <div>
        <label :for="name">
            {{ label   }}
        </label>
        <div class="flex gap-2">
            <div class="w-full">
                <input :type="type" 
                :name="name"
                :placeholder="placeholder"
                class="bg-black w-full p-2 text-white 
                outline-none rounded" />
            </div>
            <IconButton name="buttonIcon" :src="icon"/>
        </div>
    </div>
</template>


<script>
import IconButton from './iconButton.vue';

    export default {
        name: "copyInput",
        components: {
            IconButton
        },
        props: {
            src: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            icon: {
                type: String,
                required: true,
            },
            label: String,
        },
    }
</script>