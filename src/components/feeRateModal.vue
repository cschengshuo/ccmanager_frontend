<template>
    <Modal v-model="isOpen" class-name="vertical-center-modal" :mask-closable="false" title="设置费率" @on-ok="doSetFeeRate" @on-visible-change="onVisibleChange" :transfer="false">
        <Form ref="feeRateForm" :model="formData" :label-width="80">
            <FormItem v-for="(item, index) in feeRateItems" v-if="item.status" :key="index" :label="item.label" :prop="item.index " :rules="{required: true, message: '请设置' + item.label + '的费率', trigger: 'blur'}">
                <Slider v-model="item.value" :max="item.max" :min="item.min" :step="item.step" :tip-format="tipFormat" show-input></Slider>
            </FormItem>
        </Form>
    </Modal>
</template>

<script>
import util from '../libs/util'

export default {
    name: 'userTreeModal',
    props: {
        open: {
            type: Boolean
        },
        feeRate: {
            type: Object
        },
        parentId: {
            type: String
        }
    },
    data () {
        return {
            isOpen: this.open,
            formData: {
                PLAN: 0,
                C: 0,
                D: 0
            },
            feeRateItems: []
        }
    },
    methods: {
        doSetFeeRate () {
            this.$emit('submit', this.formData)
        },
        loadChannelInfo (parentId) {
            this.$http.get('/api/channel/getSubFeeRateRange', {
                params: {
                    parentId: parentId
                }
            }).then((response) => {
                console.log('1')
            })
        },
        tipFormat (val) {
            return util.strip(val * 1000) + '‰'
        },
        onVisibleChange () {
            this.$emit('update:open', this.isOpen)
        }
    },
    mounted () {
        this.loadChannelInfo()
    },
    watch: {
        open () { this.isOpen = this.open },
        parentId () { this.loadChannelInfo(this.parentId) }
    }
}
</script>

<style lang="less">
@import "./styles/modal.less";
</style>
