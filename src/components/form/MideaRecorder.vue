<template>
    <form class="flex gap-8 items-center px-2">
        <div class="flex items-center gap-2" v-if="audioUrl == null">
            <div class="w-3 h-3 bg-red animate-ping rounded-full"></div>
            <h4 class="font-bold">Gravando...</h4>
        </div>
        <div class="flex items-center gap-4">
                <div 
            @click="() => {stopRecording(); closeEmit()}" 
            :disabled="!isRecording"
            class="font-bold p-0 cursor-pointer">
                X
            </div>
            <div class="p-0 cursor-pointer"
            @click="stopRecording" 
            
            >
                <img src="../icon/plane.svg" alt="Aviao">
            </div>
        </div>
      
      <audio v-if="audioUrl" :src="audioUrl" controls></audio>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isRecording: false,
        mediaRecorder: null,
        audioChunks: [],
        audioUrl: null,
      };
    },
    methods: {
      async startRecording() {
        try {
            this.audioUrl = null
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
    
            this.mediaRecorder.ondataavailable = (event) => {
                this.audioChunks.push(event.data);
            };
    
            this.mediaRecorder.onstop = () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
                this.audioUrl = URL.createObjectURL(audioBlob);
                this.audioChunks = []; 
            };
  
            this.mediaRecorder.start();
            this.isRecording = true;
        } catch (error) {
            console.error("Error accessing audio devices:", error);
        }
      },
      stopRecording() {
        if (this.mediaRecorder) {
            this.mediaRecorder.stop();
            this.isRecording = false;
        }   
      },
      closeEmit(){
        this.$emit("close")
      }
    },
    emits: ["close"]
  };
  </script>
  
  <style scoped>
  button {
    padding: 10px 20px;
    cursor: pointer;
  }
  
  .audio-url-input {
    width: 100%;
    padding: 5px;
    font-size: 1rem;
  }
  </style>
  