
import Vue from 'vue'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import axiosInstance from '@/services/axios'
import { rejectError } from '@/helpers'

function checkTokenValidity (token) {
    if  (token) {
        const decodedToken = jwt.decode(token)

        return decodedToken && (decodedToken.exp * 1000) > new Date().getTime()
    }
    return false
}

export default {
    namespaced: true,
    state:{
        user: null,
        isAuthResolved: false
    },
    getters:{
        authUser (state) {
            return state.user || null
        },
        isAuthenticated (state) {
            return !!state.user
        },
        isExerciceOwner: (state) => (exerciceCreatorId) => {
            if (!state.user) return false
            return state.user._id === exerciceCreatorId
        },
        isApprover: (state) => (exerciceId) => {
            return state.user &&
                    state.user['approvedExercices'] &&
                    state.user['approvedExercices'].includes(exerciceId)

        }
    },
    actions:{
        loginWithEmailAndPassword({commit}, userData){
            return axios.post('/api/v1/users/login', userData)
                .then(res => {
                    const user = res.data
                    localStorage.setItem('exerciceer-jwt', user.token)
                    commit('setAuthUser', user)
                })
                .catch(err => rejectError(err))
        },

        registerUser(context, userData){
            return axios.post('/api/v1/users/register', userData)
                .catch(err => rejectError(err))
        },

        getAuthUser ({commit, getters}) {
            const authUser = getters['authUser']
            const token = localStorage.getItem('exerciceer-jwt')
            const isTokenValid = checkTokenValidity(token)

            if (authUser) {return Promise.resolve(authUser)}

            const config = {
                headers:{
                    'Cache-Control': 'no-cache'                    
                }
            }

            return axiosInstance.get('/api/v1/users/me', config)
                .then((res) => {
                    const user = res.data
                    localStorage.setItem('exerciceer-jwt', user.token)
                    commit('setAuthUser', user)
                    commit('setAuthState', true)
                    return user
                })
                .catch(() => {
                    commit('setAuthUser', null)
                    commit('setAuthState', true)
                    return undefined
                })
        },

        logout ({commit}){

            // for session authen
            // return axios.post('/api/v1/users/logout', //userData)
            //     .then(() => {
            //         commit('setAuthUser', null)
            //         return true
            //     })
            //     .catch((err) => {
            //         return err
            //     })
            
            return new Promise((resolve) => {
                localStorage.removeItem('exerciceer-jwt')
                commit('setAuthUser',null)
                resolve(true)
            })
        },

        addExerciceToAuthUser ({commit, state}, exerciceId) {
            const userExercices = [...state.user['approvedExercices'], exerciceId]
            commit('setExercicesToAuthUser', userExercices)
        },
        removeExerciceFromAuthUser ({commit, state}, exerciceId) {
            const userExercicesIds = [...state.user['approvedExercices']]
            const index = userExercicesIds.findIndex(userExerciceId => userExerciceId === exerciceId)
      
             userExercicesIds.splice(index, 1)
            commit('setExercicesToAuthUser', userExercicesIds)
        },
        updateUser ({commit}, user) {
            return axiosInstance.patch(`/api/v1/users/${user._id}`, user)
              .then(res => {
                const updatedUser = res.data
                commit('setAuthUser', updatedUser)
                return updatedUser
              })
        }
    },
    mutations:{
        setAuthUser (state, user) {
            return state.user = user
        },
        setAuthState (state, authState) {
            return state.isAuthResolved = authState
        },
        setExercicesToAuthUser (state, exercices) {
            return Vue.set(state.user, 'approvedExercices', exercices)
        }

    }

}
