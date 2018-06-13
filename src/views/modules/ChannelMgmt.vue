<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="settings"></Icon>
                通道管理
            </p>
            <Table stripe border :loading="loading" :columns="columns" :data="data1" ref="table" :height="tableHeight"></Table>
        </Card>
        <Modal v-model="showEdit" class-name="vertical-center-modal" :loading="formLoading" title="修改通道信息" :closable="false" :mask-closable="false" @on-ok="submit" :transfer="false">
            <Form ref="editChannelForm" :model="editChannelForm" :label-width="100" label-position="right">
                <FormItem label="平台费率" prop="platformFeeRate">
                    <Input v-model="editChannelForm.platformFeeRate" placeholder="请输入平台费率"></Input>
                </FormItem>
                <FormItem label="平台代收费" prop="platformFee">
                    <Input v-model="editChannelForm.platformFee" placeholder="请输入平台代收费"></Input>
                </FormItem>
                <FormItem label="成本费率" prop="costFeeRate">
                    <Input v-model="editChannelForm.costFeeRate" placeholder="请输入成本费率"></Input>
                </FormItem>
                <FormItem label="成本代收费" prop="costFee">
                    <Input v-model="editChannelForm.costFee" placeholder="请输入成本代收费"></Input>
                </FormItem>
                <FormItem label="通道描述" type="textarea" prop="description">
                    <Input v-model="editChannelForm.description" placeholder="请输入通道描述"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import util from '../../libs/util'

export default {
    data () {
        return {
            tableHeight: 600,
            loading: false,
            showEdit: false,
            formLoading: false,
            editChannelForm: {
                id: '',
                platformFeeRate: 0,
                platformFee: 0,
                costFeeRate: 0,
                costFee: 0,
                description: ''
            },
            columns: [
                {
                    title: '通道名称',
                    key: 'name'
                },
                {
                    title: '用户费率',
                    key: 'feeRate',
                    render: (h, params) => {
                        let feeRate = params.row.feeRate * 1000
                        let liter = util.strip(feeRate) + '‰'
                        return h('div', liter)
                    }
                },
                {
                    title: '用户代收费',
                    key: 'fee'
                },
                {
                    title: '高级用户费率',
                    key: 'seniorFeeRate',
                    render: (h, params) => {
                        let seniorFeeRate = params.row.seniorFeeRate * 1000
                        let liter = util.strip(seniorFeeRate) + '‰'
                        return h('div', liter)
                    }
                },
                {
                    title: '高级用户代收费',
                    key: 'seniorFee'
                },
                {
                    title: '平台费率',
                    key: 'platformFeeRate',
                    render: (h, params) => {
                        let platformFeeRate = params.row.platformFeeRate * 1000
                        let liter = util.strip(platformFeeRate) + '‰'
                        return h('div', liter)
                    }
                },
                {
                    title: '平台代收费',
                    key: 'platformFee'
                },
                {
                    title: '成本费率',
                    key: 'costFeeRate',
                    render: (h, params) => {
                        let costFeeRate = params.row.costFeeRate * 1000
                        let liter = util.strip(costFeeRate) + '‰'
                        return h('div', liter)
                    }
                },
                {
                    title: '成本代收费',
                    key: 'costFee'
                },
                {
                    title: '通道描述',
                    key: 'description'
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.handleEdit(params.row.id)
                                    }
                                }
                            }, '编辑')
                        ])
                    }
                }
            ],
            data1: []
        }
    },
    methods: {
        handleEdit (id) {
            const me = this
            this.$http.get('/api/channel/findByIdForAdmin', { params: { id: id } }).then(function (response) {
                const data = response.data
                me.editChannelForm.id = data.id
                me.editChannelForm.platformFeeRate = data.platformFeeRate
                me.editChannelForm.platformFee = data.platformFee
                me.editChannelForm.costFeeRate = data.costFeeRate
                me.editChannelForm.costFee = data.costFee
                me.editChannelForm.description = data.description
                me.showEdit = true
            })
        },
        submit () {
            const me = this
            this.$http.post('/api/channel/modify', this.editChannelForm).then(function (response) {
                me.loadData()
            })
        },
        loadData () {
            let me = this
            this.loading = true
            this.$http.get('/api/channel/findAllForAdmin').then(function (response) {
                me.loading = false
                me.data1 = response.data
            })
        }
    },
    mounted () {
        this.$nextTick(function () {
            this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 100
        })
        this.loadData()
    }
}
</script>

<style lang="less">
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
</style>
