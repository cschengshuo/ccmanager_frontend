<template>
    <div id="grid">
        <Alert show-icon>施工中，提供给平台使用的通道管理，用于修改用户费率，且隐藏通道的成本费率</Alert>
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
            console.log(id)
            this.$Message.warning('费率修改功能暂未上线')
        },
        init () {
            let me = this
            this.loading = true
            this.$http.get('listChannels').then(function (response) {
                me.loading = false
                if (response.data.success) {
                    me.data1 = response.data.data
                } else {
                    me.$Message.error(response.data.message)
                }
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
