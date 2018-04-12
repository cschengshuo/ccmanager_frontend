<template>
    <div id="grid">
        <Alert show-icon>供系统管理员使用的通道管理</Alert>
        <Alert show-icon>可修改成本费率，用于收益计算</Alert>
        <Alert show-icon>用户费率修改功能施工中</Alert>
        <Card>
            <p slot="title">
                <Icon type="settings"></Icon>
                通道管理
            </p>
            <Table stripe border :loading="loading" :columns="columns" :data="data1"></Table>
        </Card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            loading: false,
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
            this.$Message.warning('费率修改功能暂未上线')
        },
        init () {
            let me = this
            this.loading = true
            this.$http.get('/api/channel/findAll').then(function (response) {
                me.loading = false
                me.data1 = response.data
            })
        }
    },
    mounted () {
        this.init()
    }
}
</script>

<style>

</style>
