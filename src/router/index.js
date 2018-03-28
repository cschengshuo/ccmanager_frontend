import Vue from 'vue'
import iView from 'iview'
import Router from 'vue-router'
import login from '@/views/login'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'login',
            component: login,
            meta: {
                title: '登录页面'
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start()
    document.title = to.meta.title
    next()
})

router.afterEach((to) => {
    iView.LoadingBar.finish()
    window.scrollTo(0, 0)
})

export default router
