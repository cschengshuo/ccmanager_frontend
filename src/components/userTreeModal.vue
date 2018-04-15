<template>
    <Modal v-model="isOpen" class-name="vertical-center-modal" :mask-closable="false" title="选择上级代理" @on-ok="doSelectParent" @on-visible-change="onVisibleChange" :transfer="false">
        <user-tree :onSelectChange="onSelectTreeNode"></user-tree>
    </Modal>
</template>

<script>
import userTree from '@/components/userTree.vue'
export default {
    name: 'userTreeModal',
    components: {
        userTree
    },
    props: {
        open: {
            type: Boolean
        },
        parentId: {
            type: String
        }
    },
    data () {
        return {
            isOpen: this.open,
            selected: null
        }
    },
    methods: {
        doSelectParent () {
            this.$emit('submit', this.selected)
        },
        onSelectTreeNode (node) {
            this.selected = node[0]
        },
        onVisibleChange () {
            this.$emit('update:open', this.isOpen)
        }
    },
    watch: {
        open () { this.isOpen = this.open }
    }
}
</script>

<style lang="less">
@import "./styles/modal.less";
</style>
