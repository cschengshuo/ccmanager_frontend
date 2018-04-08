<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
            <shrinkable-menu :shrink="shrink" :menu-list="menuList"></shrinkable-menu>
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
export default {
    components: {
        shrinkableMenu
    },
    data () {
        return {
            shrink: false
        }
    },
    computed: {
        menuList () {
            return []
            // return this.$store.state.app.menuList
        }
    }
}
</script>

<style lang="less">
@import "./main.less";
</style>
