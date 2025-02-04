<template>
    <div>
        <h3>{{ title }}</h3>
    </div>
    <div class="border-2 border-hovergray bg-transparent px-2 py-4 overflow-scroll">
        <div 
        v-for="(item, index) in items"
        :key="getKey(item, index)"
        class="flex justify-between items-center">
            <template v-if="isObject(item)">
                <MiniFriendProfile 
                    :name="item.name"
                    :src="item.src"
                />
            </template>

            <template v-else>
                <p class="text-white">$ {{ item }}</p>
            </template>
            
            <div 
                class="h-10 w-11 opacity-80 overflow-hidden cursor-pointe
                hover:bg-black/80 rounded-md grid place-items-center
                cursor-pointer hover:opacity-100 transition-all"
                @click="emitFunction(item)">
                <img 
                    class="object-cover"
                    :src="icon"
                    alt="Action Icon">
            </div>
        </div>
    </div>
</template>

<script>
import MiniFriendProfile from '../friends/miniFriendProfile.vue';

export default {
    name: "ActionBox",
    components: {
        MiniFriendProfile
    },
    methods: {
        emitFunction(item) {
            // Emite o item clicado (seja texto ou objeto)
            this.$emit("function", item);
        },
        isObject(item) {
            // Verifica se o item é um objeto
            return typeof item === "object" && item !== null;
        },
        getKey(item, index) {
            // Retorna uma chave única: usa 'name' se for objeto, ou o índice como fallback
            return this.isObject(item) ? item.name || index : `${item}-${index}`;
        }
    },
    props: {
        title: String,
        items: {
            type: Array,
            required: true
        },
        icon: {
            type: String,
            required: true
        }
    },
    emits: ["function"]
};
</script>
