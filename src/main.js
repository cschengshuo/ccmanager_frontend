import Vue from 'vue'
import iView from 'iview'
import axios from 'axios'
import iviewArea from 'iview-area'
import App from './App'
import router from './router'
import store from './store'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false

Vue.use(iviewArea)
Vue.use(iView)
Vue.prototype.$http = axios
axios.defaults.baseURL = '/'
axios.defaults.headers['Accept-Language'] = 'zh-CN'

axios.interceptors.request.use(config => {
    if (sessionStorage.jwt) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = `Bearer ${sessionStorage.jwt}`
    }
    return config
}, error => {
    Promise.reject(error)
})

axios.interceptors.response.use(response => {
    console.log(response)
    return response
}, error => {
    if (error.response) {
        iView.Message.error(error.response.data.message)
        switch (error.response.status) {
            case 401:
                store.commit('logout')
                router.replace({
                    path: '/login'
                })
                break

            case 403:
                router.replace({
                    path: '/403'
                })
                break

            case 500:
                router.replace({
                    path: '/500'
                })
        }
    }
    return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
