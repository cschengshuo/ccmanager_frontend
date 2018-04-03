import Vue from 'vue'
import iView from 'iview'
import Router from 'vue-router'
import store from '@/store'
import Main from '@/views/Main'
// import Cookies from 'js-cookie'

Vue.use(Router)

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
}

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
}

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
}

const router = new Router({
    mode: 'history',
    base: '/',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/login.vue'),
            meta: {
                title: '登录页面'
            }
        },
        {
            path: '/',
            redirect: '/home',
            name: 'otherRouter',
            component: Main,
            children: [
                {
                    path: 'home',
                    name: 'home_index',
                    component: () => import('@/views/home/home.vue'),
                    meta: {
                        title: '管理平台'
                    }
                }
            ]
        },
        page500,
        page403,
        page404
    ]
})

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start()
    document.title = to.meta.title
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
    next()
})

router.afterEach((to) => {
    iView.LoadingBar.finish()
})

export default router
