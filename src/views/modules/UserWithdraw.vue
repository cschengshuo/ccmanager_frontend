<template>
    <div>
        <Card style="margin-bottom:10px">
            <p slot="title">
                <Icon type="person-add"></Icon>
                用户提现统计
            </p>
            <Row :gutter="16">
                <Col span="6">
                <infor-card id-name="recharge" :end-val="recharge" icon-type="person-add" color="#2d8cf0" intro-text="平台充值总额"></infor-card>
                </Col>
                <Col span="6">
                <infor-card id-name="withdraw" :end-val="withdraw" icon-type="person-stalker" color="#64d572" :icon-size="50" intro-text="用户已提现金额"></infor-card>
                </Col>
                <Col span="6">
                <infor-card id-name="balance" :end-val="balance" icon-type="planet" color="#ffd572" intro-text="平台余额"></infor-card>
                </Col>
                <Col span="6">
                <infor-card id-name="toWithDraw" :end-val="toWithDraw" icon-type="planet" color="#ffd572" intro-text="用户待提现金额"></infor-card>
                </Col>
            </Row>
        </Card>
        <Card>
            <p slot="title">
                <Icon type="settings"></Icon>
                用户提现记录
            </p>
            <Table stripe border style="margin: 10px 0" :loading="loading" :columns="columns" :data="data" ref="table" :height="tableHeight"></Table>
            <Page :total="total" :current.sync="current" :page-size="size" @on-change="changePage" show-total></Page>
        </Card>
    </div>
</template>

<script>
import inforCard from '@/components/inforCard.vue'
export default {
    components: {
        inforCard
    },
    data () {
        return {
            tableHeight: 600,
            loading: false,
            data: [],
            total: 0,
            size: 10,
            current: 1,
            recharge: 0,
            withdraw: 0,
            toWithDraw: 0,
            columns: [
                {
                    title: '金额',
                    key: 'money'
                },
                {
                    title: '时间',
                    key: 'time'
                },
                {
                    title: '类型',
                    key: 'status',
                    render: (h, params) => {
                        let description = ''
                        const status = params.row.status
                        switch (status) {
                            case 0:
                                description = '计划转账'
                                break
                            case 1:
                                description = '提现转账'
                                break
                            case 2:
                                description = '认证'
                                break
                            default:
                                description = status
                                break
                        }
                        return h('span', description)
                    }
                },
                {
                    title: '通道类型',
                    key: 'payWayTAG',
                    render: (h, params) => {
                        let description = ''
                        const payWayTAG = params.row.payWayTAG
                        switch (payWayTAG) {
                            case '8':
                                description = '余额提现'
                                break
                            default:
                                description = payWayTAG
                                break
                        }
                        return h('span', description)
                    }
                },
                {
                    title: '充值提现',
                    key: 'type',
                    render: (h, params) => {
                        let description = ''
                        const type = params.row.type
                        switch (type) {
                            case '0':
                                description = '提现'
                                break
                            case '1':
                                description = '充值'
                                break
                            default:
                                description = type
                                break
                        }
                        return h('span', description)
                    }
                },
                {
                    title: '卡号',
                    key: 'cardNo'
                },
                {
                    title: '开户行名称',
                    key: 'bankCode'
                },
                {
                    title: '转入卡号',
                    key: 'inCardNo'
                },
                {
                    title: '交易编号',
                    key: 'recordNo'
                },
                {
                    title: '计划编号',
                    key: 'planId'
                },
                {
                    title: '用户姓名',
                    key: 'userName'
                }
            ]
        }
    },
    methods: {
        query () {
            this.loadData(1)
            this.current = 1
        },
        changePage (page) {
            this.loadData(page)
        },
        loadData (page) {
            let data = {
                size: this.size
            }

            if (page) {
                data.page = page - 1
            }

            const me = this
            this.loading = true
            this.$http.get('/api/trading_record/findWithDrawRecords', { params: data }).then(function (response) {
                me.loading = false
                me.data = response.data.content
                me.total = response.data.totalElements
            })
        },
        loadRecharge () {
            const me = this
            this.$http.get('/api/recharge/getPlatformRecharge').then(function (response) {
                me.recharge = response.data
            })
        },
        loadWithdraw () {
            const me = this
            this.$http.get('/api/app_user/getAppUserHasWithdrawedSum').then(function (response) {
                me.withdraw = response.data
            })
        },
        loadBalance () {
            const me = this
            this.$http.get('/api/').then(function (response) {
                me.balance = response.data
            })
        },
        loadToWithDraw () {
            const me = this
            this.$http.get('/api/app_user/getAppUserWithdrawSum').then(function (response) {
                me.toWithDraw = response.data
            })
        },
        init () {
            this.loadData()
            this.loadToWithDraw()
            this.loadWithdraw()
            this.loadRecharge()
        }
    },
    mounted () {
        this.$nextTick(function () {
            this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 342
        })
        this.init()
    },
    computed: {
        balance () {
            return this.recharge - this.withdraw
        }
    }
}
</script>

<style>
</style>
