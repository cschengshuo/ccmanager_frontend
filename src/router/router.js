import Main from '@/views/Main'

const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
}

const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
}

const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
}

const login = {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: {
        title: '登录页面'
    }
}

export const otherRouter = {
    path: '/',
    redirect: '/home',
    name: 'otherRouter',
    component: Main,
    children: [
        {
            path: 'home',
            name: 'home_index',
            component: () => import('@/views/home/Home.vue'),
            meta: {
                title: '管理平台'
            }
        },
        {
            path: 'myspace',
            name: 'myspace_index',
            component: () => import('@/views/modules/MySpace.vue'),
            meta: {
                title: '个人中心'
            }
        },
        {
            path: 'message',
            name: 'message_index',
            component: () => import('@/views/modules/Message.vue'),
            mete: {
                title: '消息中心'
            }
        }
    ]
}

export const appRouter = [
    {
        path: '/agent_mgmt',
        icon: 'person-stalker',
        title: '代理商管理',
        name: 'agent_mgmt',
        component: Main,
        children: [
            {
                path: 'index',
                name: 'agent_mgmt_index',
                title: '代理商管理',
                component: () => import('@/views/modules/AgentMgmt.vue'),
                meta: {
                    title: '代理商管理'
                }
            }
        ]
    },
    {
        path: '/app_user_mgmt',
        icon: 'android-phone-portrait',
        title: '手机用户管理',
        name: 'app_user_mgmt',
        component: Main,
        children: [
            {
                path: 'index',
                name: 'app_user_mgmt_index',
                title: '手机用户管理',
                component: () => import('@/views/modules/AppUserMgmt.vue'),
                meta: {
                    title: '手机用户管理'
                }
            }
        ]
    },
    {
        path: '/trading_record',
        icon: 'clipboard',
        title: '交易记录',
        name: 'trading_record',
        component: Main,
        children: [
            {
                path: 'index',
                name: 'trading_record_index',
                title: '交易记录',
                component: () => import('@/views/modules/TradingRecord.vue'),
                meta: {
                    title: '交易记录'
                }
            }
        ]
    },
    {
        path: '/channel_mgmt',
        icon: 'grid',
        title: '通道管理',
        name: 'channel_mgmt',
        component: Main,
        children: [
            {
                path: 'index',
                icon: 'gear-b',
                name: 'channel_mgmt_index',
                title: '通道管理',
                component: () => import('@/views/modules/ChannelMgmt.vue'),
                meta: {
                    title: '通道管理'
                }
            },
            {
                path: 'platform',
                icon: 'gear-b',
                name: 'platform_channel_mgmt_index',
                title: '通道管理',
                component: () => import('@/views/modules/PlatformChannelMgmt.vue'),
                meta: {
                    title: '通道管理'
                }
            }
        ]
    },
    {
        path: '/income_mgmt',
        icon: 'card',
        title: '收益管理',
        name: 'income_mgmt',
        component: Main,
        children: [
            {
                path: 'index',
                name: 'income_mgmt_index',
                title: '收益管理',
                component: () => import('@/views/modules/IncomeMgmt.vue'),
                meta: {
                    title: '收益管理'
                }
            }
        ]
    },
    {
        path: '/statistics',
        icon: 'podium',
        title: '统计报表',
        name: 'statistics',
        component: Main,
        children: [
            {
                path: 'income',
                icon: 'social-usd',
                name: 'income_report_index',
                title: '收益报表',
                component: () => import('@/views/modules/IncomeReport.vue'),
                meta: {
                    title: '收益报表'
                }
            },
            {
                path: 'user',
                icon: 'person-add',
                name: 'user_report_index',
                title: '用户报表',
                component: () => import('@/views/modules/UserReport.vue'),
                meta: {
                    title: '用户报表'
                }
            }
        ]
    }
]

export const routers = [
    login,
    otherRouter,
    ...appRouter,
    page500,
    page403,
    page404
]
