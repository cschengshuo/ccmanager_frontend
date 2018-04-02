import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production', // 在非生产环境下，使用严格模式
    state: {
        user: null,
        initialized: false
    },
    mutations: {
        login (state, data) {
            sessionStorage.setItem('user', data.user)
            sessionStorage.setItem('jwt', data.jwt)
            state.user = data.user
            state.initialized = true
        },
        logout (state) {
            sessionStorage.removeItem('user')
            sessionStorage.removeItem('jwt')
        },
        setUserInfo (state, user) {
            state.user = user
            state.initialized = true
        }
    },
    actions: {
        getUserInfo ({ commit, state }) {
            let me = this
            axios.get('/api/user/getCurrentUserInfo')
                .then(function (response) {
                    me.commit('setUserInfo', response.data)
                })
        }
    }
})
