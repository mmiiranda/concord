    <template>
        <div class="bg-cleangray font-bold text-gray
        grid w-full grid-cols-3 p-1">
            <div
                v-for="(item, index) in options"
                :key="index"
                :class="[
                    'text-xl w-full text-center px-4 py-2 cursor-pointer',
                    { 'bg-darkblue text-white': IsSelected === index+1 }
                ]"
                @click="handleClick(index+1)"
                >
                {{ item }}
                </div>
        </div>
    </template>

    <script>
        export default {
            name: "OptionsMenu",
            data(){
                return{
                    IsSelected: 1
                }
            },
            methods: {
                handleClick(index){
                    this.IsSelected = index
                    this.$emit(`handleClick${index}`)
                }
            },
            props: {
                options: {
                    type: Array,
                    required: true
                }
            },
        }
    </script>