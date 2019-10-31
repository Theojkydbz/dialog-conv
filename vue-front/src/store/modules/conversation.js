import Vue from 'vue'
import axios from 'axios'
import axiosInstance from '@/service/axios'

export default {
    state: {
    },
    getters: {
    },
    actions: {
        send() {
            let datas = {
              queryInput: {
                text: {
                  text: this.text,
                  languageCode: 'fr-FR',
                },
              },
              outputAudioConfig: {
                audioEncoding: `OUTPUT_AUDIO_ENCODING_LINEAR_16`,
                sampleRateHertz: 44100
              }
            };
            this.httpClient.post(this.API_BACKEND + this.CALL_METHOD, datas).subscribe(
              (result, any) => {
                console.log('Result', result)
                this.responses.push(result.queryResult.fulfillmentText)
                if (result.outputAudio) {
                  this.playSound(result.outputAudio);
                }
              },
              (error) => {
                console.error(error);
              }
            )
          },
          playSound(audio) {
            const sound = new Audio("data:audio/wav;base64," + audio);
            // sound.src = audio;
            // sound.src = URL.createObjectURL(audio);
            sound.play();
          },
          fetchCategories ({state, commit}) {
            return axios.get('/api/v1/categories')
              .then(res => {
                const categories = res.data
                commit('setItems', {resource: 'categories', items: categories}, {root: true})
                return state.items
              })
          },

    },
    mutations: {

    }
}