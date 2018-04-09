import Vue from 'vue'
import iView from 'iview'
import Router from 'vue-router'
import store from '../store'
import { routers } from './router'
import util from '../libs/util'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: '/',
    scrollBehavior: () => ({ y: 0 }),
    routes: routers
})

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start()
    util.title(to.meta.title)
    if (!sessionStorage.jwt) {
        if (to.name !== 'login') {
            next({
                path: '/login'
            })
        }
    } else {
        if (!store.state.initialized) {
            store.dispatch('getUserInfo')
        }
        if (to.name === 'login') {
            next({
                path: '/home'
            })
        }
    }
    util.toDefaultPage(routers, to.name, router, next)
})

router.afterEach((to) => {
    iView.LoadingBar.finish()
})

export default router
