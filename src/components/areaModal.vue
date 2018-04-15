<template>
    <Modal v-model="isOpen" class-name="vertical-center-modal" :mask-closable="false" title="选择区域" @on-ok="doSelectArea" @on-visible-change="onVisibleChange" :transfer="false">
        <al-selector v-model="select" data-type="code" level="2" />
        <div> {{select}} </div>
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
            this.$emit('submit', this.select)
        },
        onVisibleChange () {
            this.$emit('update:open', this.isOpen)
        },
        convert (area) {
            console.log(this.area)
            this.select = [area.slice(0, 2) + '0000', area.slice(0, 4) + '00', area]
        }
    },
    watch: {
        open () { this.isOpen = this.open },
        area () {
            console.log(this.area)
            this.select = []
            this.select.push(this.area.slice(0, 2) + '0000')
            this.select.push(this.area.slice(0, 4) + '00')
            this.select.push(this.area)
        }
    }
}
</script>

<style lang="less">
@import "./styles/modal.less";
</style>
