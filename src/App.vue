<template>
  <router-view />
  <modal-loading  v-if="isLoading"/>
</template>

<script>
import ModalLoading from './components/modal/modalLoading.vue';
import { mapActions, mapGetters } from "vuex";  


export default {
  name: "App",
  computed: {
    ...mapGetters(["isLoading"]), 
  },
  methods: {
    ...mapActions(["toogleLoading"])
  },
  components: {
    ModalLoading
  }
}
</script>