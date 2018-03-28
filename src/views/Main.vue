<template>
    <div class="main" :class="{'main-hide-text': shrink}">
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
export default {
    data () {
        return {
            shrink: false
        }
    }
}
</script>

<style lang="less">
@import "./main.less";
</style>
