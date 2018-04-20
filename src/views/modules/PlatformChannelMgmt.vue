<template>
    <div id="grid">
        <Card>
            <p slot="title">
                <Icon type="settings"></Icon>
                通道管理
            </p>
            <Table stripe border :loading="loading" :columns="columns" :data="data1"></Table>
        </Card>
        <Modal v-model="showEdit" class-name="vertical-center-modal" :loading="formLoading" title="修改通道信息" :closable="false" :mask-closable="false" @on-ok="submit" :transfer="false">
            <Form ref="editChannelForm" :model="editChannelForm" :label-width="100" label-position="right">
                <FormItem label="通道描述" type="textarea" prop="description">
                    <Input v-model="editChannelForm.description" placeholder="请输入通道描述"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
export default {
    data () {
        return {
            loading: false,
            showEdit: false,
            formLoading: false,
            editChannelForm: {
                id: '',
                description: ''
            },
            columns: [
                {
                    title: '通道名称',
                    key: 'name'
                },
                {
                    title: '用户费率',
                    key: 'feeRate'
                },
                {
                    title: '用户代收费',
                    key: 'fee'
                },
                {
                    title: '高级用户费率',
                    key: 'seniorFeeRate'
                },
                {
                    title: '高级用户代收费',
                    key: 'seniorFee'
                },
                {
                    title: '平台费率',
                    key: 'platformFeeRate'
                },
                {
                    title: '平台代收费',
                    key: 'platformFee'
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
            this.$http.get('/api/channel/findByIdForPlatform', { params: { id: id } }).then(function (response) {
                const data = response.data
                me.editChannelForm.id = data.id
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
            this.$http.get('/api/channel/findAllForPlatform').then(function (response) {
                me.loading = false
                me.data1 = response.data
            })
        }
    },
    mounted () {
        this.loadData()
    }
}
</script>

<style>

</style>
