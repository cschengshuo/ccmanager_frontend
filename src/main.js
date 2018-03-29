import Vue from 'vue'
import { Form, FormItem, Input, Card, Icon, Button, Message, Switch } from 'iview'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false

Vue.prototype.$http = axios.create({ withCredentials: true })
Vue.prototype.$Message = Message

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
