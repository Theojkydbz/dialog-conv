import Vue from 'vue'
import Router from 'vue-router'

import App from '@/App'
import Chat from '@/components/Chat'
import HelloWorld from '@/components/HelloWorld'


Vue.use(Router)

const router = new Router ({
    routes: [
        {
            path: '/',
            name:  'App',
            component: App
        },
        {
            path: '/hello',
            name:  'HelloWorld',
            component: HelloWorld
        },
    ]
})



export default router
