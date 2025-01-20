<template>
    <div class="flex w-full bg-[#4a4a4a] p-3 gap-2 justify-between">
        <PopupComp 
            :visible="fileUpdateContent"
            @close="closeFileUpdatePopup"
            class="bottom-full left-0"
        >
            <PopupFormFile />
        </PopupComp>
        <PopupComp 
            :visible="audioRecoderContent"
            @close="closeAudioRecoderContent"
            class="bottom-full right-0"
        >
            <MideaRecorder ref="midiaRecorderRef" @close="closeAudioRecoderContent"/>
        </PopupComp>
        <div class="flex gap-4 w-full">
            <div>
                <button 
                    class="grid place-items-center hover:bg-slate-100/20 rounded-full 
                    transition-all ease-in duration-100 hover:scale-105"    
                    @click.stop="openFileUpdatePopup"
                >
                    <img src="../icon/plus.svg" alt="Ícone de Mais">
                </button>
            </div>
            <textarea
                ref="messageInput"
                v-model="message"
                @input="adjustHeight"
                @keydown="handleKeydown"
                class="border-none bg-transparent outline-none w-full resize-none overflow-hidden"
                placeholder="Escreva uma mensagem"
                rows="1"
            ></textarea>
        </div>
        <div>
            <button 
                class="grid place-items-center hover:bg-slate-100/20 rounded-full 
                transition-all ease-in duration-100 hover:scale-105"
                @click.stop="() => {recordAudio(); openAudioRecoderContent()}"
            >
                <img src="../icon/audio.svg" alt="Ícone de Áudio">
            </button>
        </div>
    </div>
</template>

<script>
import PopupComp from '../popup/popup.vue';
import MideaRecorder from '../form/MideaRecorder.vue';
import PopupFormFile from '../form/popupFormFile.vue';

export default {
    name: "chatInput",
    data() {
        return {
            message: "",
            fileUpdateContent: false,
            audioRecoderContent: false,
        };
    },
    components: {
        PopupComp,
        MideaRecorder,
        PopupFormFile
    },
    methods: {
        adjustHeight() {
            this.$nextTick(() => {
                const textarea = this.$refs.messageInput;
                textarea.style.height = "auto";
                textarea.style.height =  textarea.scrollHeight  < 500 ? `${textarea.scrollHeight}px` : `${500}px`;
            });
        },
        openFileUpdatePopup() {
            this.fileUpdateContent = true;
        },
        closeFileUpdatePopup() {
            this.fileUpdateContent = false;
        },
        openAudioRecoderContent() {
            this.audioRecoderContent = true;
        },
        closeAudioRecoderContent() {
            this.audioRecoderContent = false;
            this.$refs.midiaRecorderRef.stopRecording();
        },
        recordAudio() {
            this.$refs.midiaRecorderRef.startRecording();
        },
        handleSubmit() {
            if (!this.message.trim()) return;
            this.$emit("sendMessage", this.message.trim());
            this.message = "";
            this.$nextTick(() => {
                this.adjustHeight();
            });
        },
        handleKeydown(event) {
            if (event.key === "Enter") {
                if (event.shiftKey) {
                    return;
                }
                event.preventDefault();
                this.handleSubmit();
            }
        }
    },
};
</script>

<style>
textarea::placeholder {
    color: #b0b0b0;
}
</style>
