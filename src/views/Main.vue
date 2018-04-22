<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
            <shrinkable-menu :shrink="shrink" :menu-list="menuList"></shrinkable-menu>
        </div>
        <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                    <span>管理系统</span>
                </div>
                <div class="header-avator-con">
                    <!-- <message-tip v-model="msgCount"></message-tip> -->
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ username }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="ownSpace">个人中心</DropdownItem>
                                    <DropdownItem name="logout" divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
            <div class="single-page">
                <keep-alive>
                    <router-view/>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>
import shrinkableMenu from '@/components/shrinkable-menu/shrinkable-menu.vue'
import messageTip from '@/components/message-tip.vue'

export default {
    components: {
        shrinkableMenu,
        messageTip
    },
    data () {
        return {
            shrink: false
        }
    },
    methods: {
        init () {
        },
        toggleClick () {
            this.shrink = !this.shrink
        },
        handleClickUserDropdown (name) {
            if (name === 'ownSpace') {
                this.$router.push({
                    path: '/myspace'
                })
            } else if (name === 'logout') {
                this.$store.commit('logout', this)
                this.$router.push({
                    path: '/login'
                })
            }
        }
    },
    computed: {
        menuList () {
            return this.$store.state.menuList
        },
        msgCount () {
            return 2
            // return this.$store.state.app.messageCount
        },
        username () {
            if (this.$store.state.user) {
                return this.$store.state.user.name
            }
        }
    },
    mounted () {
        this.init()
    }
}
</script>

<style lang="less">
@import "./main.less";
</style>
