<template>
    <Modal v-model="isOpen" class-name="vertical-center-modal" :mask-closable="false" title="设置费率" @on-ok="doSetFeeRate" @on-visible-change="onVisibleChange" :transfer="false">
        <Form ref="feeRateForm" :model="formData" :label-width="120">
            <FormItem v-for="(item, index) in feeRateItems" :key="index" :label="item.label" :prop="item.index + '' ">
                <Slider v-model="formData[item.index].value" v-if="item.status" :max="item.max" :min="item.min" :step="item.step" :tip-format="item.tipFormat" show-tip="always" show-stops></Slider>
                <span v-if="!item.status">由于上级代理此项为零，该项无法调整</span>
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
            formData: {},
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
                response.data.forEach((value) => {
                    this.formData[value.index] = {
                        value: value.value,
                        label: value.label,
                        index: value.index,
                        feeRate: value.feeRate
                    }

                    if (value.max <= value.min) {
                        value.status = false
                    } else {
                        value.status = true
                    }
                    if (value.feeRate) {
                        value.tipFormat = this.feeRateFormat
                    } else {
                        value.tipFormat = this.feeFormat
                    }
                })
                this.feeRateItems = response.data
            })
        },
        feeRateFormat (val) {
            return util.strip(val * 1000) + '‰'
        },
        feeFormat (val) {
            return val + '元'
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
        parentId () { this.loadChannelInfo(this.parentId) },
        feeRate () {
            if (Object.keys(this.feeRate).length !== 0) {
                Object.values(this.feeRate).forEach((value) => {
                    this.formData[value.index].value = value.value
                })
            } else {
                Object.values(this.formData).forEach((value) => {
                    value.value = 0
                })
            }
        }
    }
}
</script>

<style lang="less">
@import "./styles/modal.less";
</style>
