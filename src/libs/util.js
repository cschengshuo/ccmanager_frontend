const title = function (title) {
    title = title || '卡管家管理系统'
    document.title = title
}

const inOf = function (arr, targetArr) {
    let result = true
    arr.forEach(item => {
        if (targetArr.indexOf(item) < 0) {
            result = false
        }
    })
    return result
}

const oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true
    } else {
        return false
    }
}

const showThisRoute = function (itAccess, currentAccess) {
    if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
        return this.oneOf(currentAccess, itAccess)
    } else {
        return itAccess === currentAccess
    }
}

const getRouterObjByName = function (routers, name) {
    if (!name || !routers || !routers.length) {
        return null
    }
    // debugger;
    let routerObj = null
    for (let item of routers) {
        if (item.name === name) {
            return item
        }
        routerObj = this.getRouterObjByName(item.children, name)
        if (routerObj) {
            return routerObj
        }
    }
    return null
}

const handleTitle = function (vm, item) {
    if (typeof item.title === 'object') {
        return vm.$t(item.title.i18n)
    } else {
        return item.title
    }
}

const setCurrentPath = function (vm, name) {
    let title = ''
    let isOtherRouter = false
    vm.$store.state.app.routers.forEach(item => {
        if (item.children.length === 1) {
            if (item.children[0].name === name) {
                title = this.handleTitle(vm, item)
                if (item.name === 'otherRouter') {
                    isOtherRouter = true
                }
            }
        } else {
            item.children.forEach(child => {
                if (child.name === name) {
                    title = this.handleTitle(vm, child)
                    if (item.name === 'otherRouter') {
                        isOtherRouter = true
                    }
                }
            })
        }
    })
    let currentPathArr = []
    if (name === 'home_index') {
        currentPathArr = [
            {
                title: this.handleTitle(vm, this.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '',
                name: 'home_index'
            }
        ]
    } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
        currentPathArr = [
            {
                title: this.handleTitle(vm, this.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '/home',
                name: 'home_index'
            },
            {
                title: title,
                path: '',
                name: name
            }
        ]
    } else {
        let currentPathObj = vm.$store.state.app.routers.filter(item => {
            if (item.children.length <= 1) {
                return item.children[0].name === name
            } else {
                let i = 0
                let childArr = item.children
                let len = childArr.length
                while (i < len) {
                    if (childArr[i].name === name) {
                        return true
                    }
                    i++
                }
                return false
            }
        })[0]
        if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '',
                    name: 'home_index'
                }
            ]
        } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: name
                }
            ]
        } else {
            let childObj = currentPathObj.children.filter((child) => {
                return child.name === name
            })[0]
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: currentPathObj.name
                },
                {
                    title: childObj.title,
                    path: currentPathObj.path + '/' + childObj.path,
                    name: name
                }
            ]
        }
    }
    vm.$store.commit('setCurrentPath', currentPathArr)

    return currentPathArr
}

const openNewPage = function (vm, name, argu, query) {
    let pageOpenedList = vm.$store.state.app.pageOpenedList
    let openedPageLen = pageOpenedList.length
    let i = 0
    let tagHasOpened = false
    while (i < openedPageLen) {
        if (name === pageOpenedList[i].name) { // 页面已经打开
            vm.$store.commit('pageOpenedList', {
                index: i,
                argu: argu,
                query: query
            })
            tagHasOpened = true
            break
        }
        i++
    }
    if (!tagHasOpened) {
        let tag = vm.$store.state.app.tagsList.filter((item) => {
            if (item.children) {
                return name === item.children[0].name
            } else {
                return name === item.name
            }
        })
        tag = tag[0]
        if (tag) {
            tag = tag.children ? tag.children[0] : tag
            if (argu) {
                tag.argu = argu
            }
            if (query) {
                tag.query = query
            }
            vm.$store.commit('increateTag', tag)
        }
    }
    vm.$store.commit('setCurrentPageName', name)
}

const toDefaultPage = function (routers, name, route, next) {
    let len = routers.length
    let i = 0
    let notHandle = true
    while (i < len) {
        if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
            route.replace({
                name: routers[i].children[0].name
            })
            notHandle = false
            next()
            break
        }
        i++
    }
    if (notHandle) {
        next()
    }
}

const checkCard = (code) => {
    let city = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江 ',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北 ',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏 ',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外 '
    }
    let tip = ''
    let pass = true

    if (!code || !/^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2010)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/i.test(code)) {
        tip = '身份证号格式错误'
        pass = false
    } else if (!city[code.substr(0, 2)]) {
        tip = '地址编码错误'
        pass = false
    } else {
        // 18位身份证需要验证最后一位校验位
        if (code.length === 18) {
            code = code.split('')
            // ∑(ai×Wi)(mod 11)
            // 加权因子
            let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
            // 校验位
            let parity = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
            let sum = 0
            let ai = 0
            let wi = 0
            for (let i = 0; i < 17; i++) {
                ai = code[i]
                wi = factor[i]
                sum += ai * wi
            }
            let last = parity[sum % 11]
            let lastCode = code[17]
            if (last !== lastCode) {
                tip = '校验位错误'
                pass = false
            }
        }
    }
    return { tip: tip, pass: pass }
}

const strip = (num, precision = 12) => {
    return +parseFloat(num.toPrecision(precision))
}

const util = { checkCard, title, inOf, oneOf, showThisRoute, getRouterObjByName, handleTitle, setCurrentPath, toDefaultPage, openNewPage, strip }

export default util
