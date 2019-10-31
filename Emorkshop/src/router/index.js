import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import PageHome from '@/pages/PageHome'
import PageExerciceDetail from '@/pages/PageExerciceDetail'
import PageExerciceFind from '@/pages/PageExerciceFind'
import PageExerciceCreate from '@/pages/PageExerciceCreate'
import PageExerciceEdit from '@/pages/PageExerciceEdit'
import PageNotFound from '@/pages/PageNotFound'
import PageSecret from '@/pages/PageSecret'
import PageProfile from '@/pages/PageProfile'
import PageNotAuthenticated from '@/pages/PageNotAuthenticated'

import PageLogin from '@/pages/PageLogin'
import PageRegister from '@/pages/PageRegister'

Vue.use(Router)

const router = new Router ({
    routes: [
        {
            path: '/',
            name:  'PageHome',
            component: PageHome
        },
        {
            path: '/find/:category',
            name: 'PageExerciceFindCategory',
            component: PageExerciceFind,
            props: true
        },
        {
            path: '/find',
            name:  'PageExerciceFind',
            component: PageExerciceFind
        },
        {
            path: '/me',
            name: 'PageProfile',
            component: PageProfile,
            meta: {onlyAuthUser: true}
        },
        {
            path: '/exercices/new',
            name:  'PageExerciceCreate',
            component: PageExerciceCreate,
            meta: {onlyAuthUser:true}
        },
        {
            path: '/exercices/secret',
            name:  'PageSecret',
            component: PageSecret,
            meta: {onlyAuthUser:true}
        },
        {
            path: '/exercices/:id',
            name:  'PageExerciceDetail',
            component: PageExerciceDetail
        },
        {
            path: '/exercices/:exerciceId/edit',
            name: 'PageExerciceEdit',
            component: PageExerciceEdit,
            meta: {onlyAuthUser: true},
            props: true
        },
        {
            path: '/login',
            name:  'PageLogin',
            component: PageLogin,
            meta: {onlyGuestUser:true}
        },
        {
            path: '/register',
            name:  'PageRegister',
            component: PageRegister,
            meta: {onlyGuestUser:true}
        },
        {
            path: '/401',
            name: 'PageNotAuthenticated',
            component: PageNotAuthenticated
        },
        {
            path: '*',
            name: 'PageNotFound',
            component: PageNotFound
        }
    ],
    mode: 'history'
})


router.beforeEach((to, from, next) => {
    store.dispatch('auth/getAuthUser')
        .then(() => {
            const isAuthenticated = store.getters['auth/isAuthenticated']
            if (to.meta.onlyAuthUser) {
                if (isAuthenticated) {
                    next()
                } else {
                    next({name: 'PageNotAuthenticated'})
                }
            } else if (to.meta.onlyGuestUser){
                if (isAuthenticated) {
                    next({name: 'PageHome'})
                } else {
                    next()
                }
            } else {
                next()
            }
        })
})



export default router
