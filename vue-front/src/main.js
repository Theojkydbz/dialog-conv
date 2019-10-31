import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

export class AppComponent {
  const API_BACKEND= 'http://localhost:3000';
  const CALL_METHOD = '/call';

  const text= '';
  const responses = [];
  const shouldStop = false;
  const stopped = false;

  const mediaRecorder;
  const recordedChunks = [];

  constructor(const httpClient = HttpClient) {

  }