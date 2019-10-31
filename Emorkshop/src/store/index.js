import Vue from 'vue'
import Vuex from 'vuex'

import exercices from './modules/exercices'
import threads from './modules/threads'
import categories from './modules/categories'
import auth from './modules/auth'
import stats from './modules/stats'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        exercices,
        categories,
        threads,
        auth,
        stats
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