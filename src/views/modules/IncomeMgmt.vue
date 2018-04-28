<template>
    <div style="background: #ffffff;padding:16px;">
        <Tabs type="card" :animated="false">
            <TabPane label="个人收益详情" name="self">
                <Card>
                    <Table stripe border :loading="loading" :columns="columns" :data="data"></Table>
                </Card>
            </TabPane>
            <TabPane label="下属代理收益详情" name="sub">
                <Card>
                    <Table stripe border :loading="loading1" :columns="columns1" :data="data1"></Table>
                </Card>
            </TabPane>
        </Tabs>
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
                    key: 'type',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        let description = ''
                        const type = params.row.type
                        switch (type) {
                            case 'PLAN':
                                description = '计划'
                                break
                            case 'C':
                                description = 'C通道'
                                break
                            case 'D':
                                description = 'D通道'
                                break
                            case 'E':
                                description = 'E通道'
                                break
                            case 'F':
                                description = 'F通道'
                                break
                            default:
                                description = type
                                break
                        }
                        return h('span', description)
                    }
                },
                {
                    title: '待提现金额',
                    align: 'center',
                    key: 'preSettlement'
                },
                {
                    title: '已提现金额',
                    align: 'center',
                    key: 'balance'
                },
                {
                    title: '操作',
                    align: 'center',
                    key: 'action',
                    width: 100,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.handleWithdraw(params.row.id)
                                    }
                                }
                            }, '提现')
                        ])
                    }
                }
            ],
            data: [],
            loading1: false,
            columns1: [
                {
                    title: '代理',
                    align: 'center',
                    width: 200,
                    key: 'preSettlement'
                },
                {
                    title: '待提现金额',
                    align: 'center',
                    children: [
                        {
                            title: '计划',
                            key: 'age',
                            align: 'center'
                        },
                        {
                            title: 'C通道',
                            key: 'age',
                            align: 'center'
                        },
                        {
                            title: 'D通道',
                            key: 'age',
                            align: 'center'
                        },
                        {
                            title: 'E通道',
                            key: 'age',
                            align: 'center'
                        },
                        {
                            title: 'F通道',
                            key: 'age',
                            align: 'center'
                        }
                    ]
                },
                {
                    title: '申请提现',
                    align: 'center',
                    children: [
                        {
                            title: '计划',
                            key: 'age',
                            align: 'center'
                        },
                        {
                            title: 'C通道',
                            key: 'age',
                            align: 'center'
                        },
                        {
                            title: 'D通道',
                            key: 'age',
                            align: 'center'
                        },
                        {
                            title: 'E通道',
                            key: 'age',
                            align: 'center'
                        },
                        {
                            title: 'F通道',
                            key: 'age',
                            align: 'center'
                        }
                    ]
                }
            ],
            data1: []
        }
    },
    methods: {
        loadData () {
            const me = this
            const userId = this.$store.state.user.id
            this.$http.get('/api/user_account/findByUserId', { params: { userId: userId } }).then(function (response) {
                me.data = response.data
            })
        },
        handleWithdraw (id) {
            this.$Message.warning('提现时间为每月最后一天')
        }
    },
    mounted () {
        this.loadData()
    }
}
</script>

<style>

</style>
