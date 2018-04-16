<template>
    <Modal v-model="isOpen" class-name="vertical-center-modal" :mask-closable="false" title="选择区域" @on-ok="doSelectArea" @on-visible-change="onVisibleChange" :transfer="false">
        <al-selector v-model="select" data-type="all" level="2" />
    </Modal>
</template>

<script>
export default {
    name: 'areaModal',
    props: {
        open: {
            type: Boolean
        },
        area: {
            type: String
        }
    },
    data () {
        return {
            isOpen: this.open,
            select: this.convert(this.area)
        }
    },
    methods: {
        doSelectArea () {
            if (this.select) {
                this.$emit('submit', this.select)
            }
        },
        onVisibleChange (e) {
            this.$emit('update:open', this.isOpen)
        },
        convert (area) {
            if (area) {
                return [area.slice(0, 2) + '0000', area.slice(0, 4) + '00', area]
            } else {
                return []
            }
        }
    },
    watch: {
        open: function () { this.isOpen = this.open },
        area: function () {
            this.select = this.convert(this.area)
        }
    }
}
</script>

<style lang="less">
@import "./styles/modal.less";
</style>
