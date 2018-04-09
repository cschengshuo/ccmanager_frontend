import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import util from '../libs/util'
import { appRouter } from '@/router/router'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production', // 在非生产环境下，使用严格模式
    state: {
        user: null,
        initialized: false,
        menuList: []
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
        },
        updateMenulist (state) {
            let accessCode = 1
            let menuList = []
            appRouter.forEach((item, index) => {
                if (item.access !== undefined) {
                    if (util.showThisRoute(item.access, accessCode)) {
                        if (item.children.length === 1) {
                            menuList.push(item)
                        } else {
                            let len = menuList.push(item)
                            let childrenArr = []
                            childrenArr = item.children.filter(child => {
                                if (child.access !== undefined) {
                                    if (child.access === accessCode) {
                                        return child
                                    }
                                } else {
                                    return child
                                }
                            })
                            menuList[len - 1].children = childrenArr
                        }
                    }
                } else {
                    if (item.children.length === 1) {
                        menuList.push(item)
                    } else {
                        let len = menuList.push(item)
                        let childrenArr = []
                        childrenArr = item.children.filter(child => {
                            if (child.access !== undefined) {
                                if (util.showThisRoute(child.access, accessCode)) {
                                    return child
                                }
                            } else {
                                return child
                            }
                        })
                        if (childrenArr === undefined || childrenArr.length === 0) {
                            menuList.splice(len - 1, 1)
                        } else {
                            let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]))
                            handledItem.children = childrenArr
                            menuList.splice(len - 1, 1, handledItem)
                        }
                    }
                }
            })
            state.menuList = menuList
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
