import Vue from 'vue'
import { Form, FormItem, Input, Card, Icon, Button, Message, Switch } from 'iview'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false

Vue.prototype.$http = axios.create({ baseURL: '/' })
Vue.prototype.$Message = Message

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
        Message.error(error.response.data.message)
        switch (error.response.status) {
        case 401:
            store.commit('logout')
            router.replace({
                path: '/login'
            })
        }
    }
    return Promise.reject(error)
})

// 按需引入iview组件
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Input', Input)
Vue.component('Card', Card)
Vue.component('Icon', Icon)
Vue.component('Button', Button)
Vue.component('i-switch', Switch)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
