import Vue from 'vue'
import axios from 'axios'
import axiosInstance from '@/services/axios'

export default {
    namespaced: true,
    state: {
        items: [],
        item: {}
    },
    getters: {
    },
    actions: {
        fetchExercices ({state, commit}) {
            commit('setItems', {resource: 'exercices', items: []}, {root: true})
            return axios.get('/api/v1/exercices')
                .then(res => {
                const exercices = res.data
                commit('setItems', {resource: 'exercices', items: exercices}, {root: true})
                return state.items
                })
            },
            fetchExerciceById ({state, commit}, exerciceId) {
            commit('setItem', {resource: 'exercices', item: {}}, {root: true})
            return axios.get(`/api/v1/exercices/${exerciceId}`)
                .then((res) => {
                const exercice = res.data
                commit('setItem', {resource: 'exercices', item: exercice}, {root: true})
                return state.item
                })
            },
            createExercice ({rootState}, exerciceToCreate) {	      
                exerciceToCreate.exerciceCreator = rootState.auth.user
                exerciceToCreate.processedtitle = exerciceToCreate.title.toLowerCase().replace(/[\s,]+/g,'').trim()
          
                 return axiosInstance.post('/api/v1/exercices', exerciceToCreate)
                  .then(res => res.data)
                  
            },
            approveExercice ({state, rootState, commit, dispatch}, exerciceId) {
                const user = rootState.auth.user
          
                 return axiosInstance.post(`/api/v1/exercices/${exerciceId}/join`)
                  .then(() => {
                    dispatch('auth/addExerciceToAuthUser', exerciceId, {root: true})
          
                     const approvedPeople = state.item.approvedPeople
                    commit('addUsersToExercice', [...approvedPeople, user])
                    return true
                  })
              },
            disapproveExercice ({state, rootState, commit, dispatch}, exerciceId) {
            const user = rootState.auth.user
        
                return axiosInstance.post(`/api/v1/exercices/${exerciceId}/leave`)
                .then(() => {
                dispatch('auth/removeExerciceFromAuthUser', exerciceId, {root: true})
        
                    const approvedPeople = state.item.approvedPeople
                const index = approvedPeople.findIndex(jUser => jUser._id === user._id)
                approvedPeople.splice(index, 1)
                commit('addUsersToExercice', approvedPeople)
                })
            },
            updateExercice ({commit, state}, exerciceData) {
                exerciceData.processedLocation = exerciceData.title.toLowerCase().replace(/[\s,]+/g,'').trim()
                return axiosInstance.patch(`/api/v1/exercices/${exerciceData._id}`, exerciceData)
                  .then(res => {
                    const updatedExercice = res.data
                    commit('mergeExercice', updatedExercice)
                    return state.item
                  })
            }

    },
    mutations: {
        addUsersToExercice (state, approvedPeople) {
            Vue.set(state.item,'approvedPeople', approvedPeople)
        },
        mergeExercice (state, updatedExercice) {
            state.item = {...state.item, ...updatedExercice}
        }

    }
}