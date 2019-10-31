import axios from 'axios'

export default {
    namespaced: true,
    state: {
        isAllThreadsLoaded: false,
        items: []
    },
    getters: {

    },
    actions: {
        fetchThreads ({state, commit}, exerciceId) {
            return axios.get(`/api/v1/threads?exerciceId=${exerciceId}`)
              .then(res => {
                const {threads, isAllDataLoaded} = res.data
                commit('setAllDataLoaded', isAllDataLoaded)
                commit('setItems', {resource: 'threads', items: threads}, {root: true})
                return state.items
              })
          }
    },
    mutations: {
        setAllDataLoaded (state, isAllDataLoaded) {
            state.isAllThreadsLoaded = isAllDataLoaded
          }

    }
}