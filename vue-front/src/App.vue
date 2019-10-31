<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="responses">
    <Chat />
    <!-- <div v-for="let response of responses">{{response}}</div> -->
  </div>
  <input v-model="form.ask" placeholder="Votre demande..."/>
  <button @click="send()">Envoyer</button>
  <button @click="listen()" v-if="!stopped">Ecouter</button>
  <button @click="stop()">Stop</button>
  </div>
</template>

<script>
import Chat from './components/Chat.vue'


export default {
  name: 'app',
  components: {
    Chat
  },
  data() {
    return {
      form:{
        ask: ''
      }
    }
  },
  methods: {
    send(){
      this.$store.dispatch('conversation/send')
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
