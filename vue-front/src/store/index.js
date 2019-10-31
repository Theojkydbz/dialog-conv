import Vue from 'vue'
import Vuex from 'vuex'

import conversation from './modules/conversation'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        conversation
    },
    // Simple functions to mutate a state
    mutations: {
      setItems (state, {resource, items}) {
        state[resource].items = items
      },
      setItem (state, {resource, item}) {
        state[resource].item = item
      }
    }
  })