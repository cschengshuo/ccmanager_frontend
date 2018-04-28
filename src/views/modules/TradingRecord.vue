<template>
    <div id="grid">
        <Card>
            <p slot="title">
                <Icon type="settings"></Icon>
                交易记录
            </p>
            <Input v-model="search" icon="search" placeholder="交易卡号" style="width: 200px"></Input>
            <Input v-model="search1" icon="search" placeholder="登录名" style="width: 200px"></Input>
            <!-- <Select v-model="statusReportType" style="width: 100px">
                <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="payWayTAGReportType" style="width: 100px">
                <Option v-for="item in typeList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <date-picker v-model="recordDateRange" type="daterange" confirm placement="bottom-end" placeholder="选择时间范围" style="width: 200px"></date-picker> -->
            <Button @click="query" type="primary">查询</Button>
            <Button @click="showAdvancedQuery" type="primary">高级查询</Button>
            <Table stripe border style="margin: 10px 0" :loading="loading" :columns="columns" :data="data1"></Table>
            <Page :total="total" :current.sync="current" :page-size="size" @on-change="changePage" show-total></Page>
        </Card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            search: '',
            search1: '',
            statusReportType: 1,
            payWayTAGReportType: 1,
            recordDateRange: [null, null],
            loading: false,
            total: 0,
            size: 15,
            current: 1,
            typeList: [
                {
                    value: 1,
                    label: '计划转账'
                },
                {
                    value: 2,
                    label: '提现转账'
                },
                {
                    value: 3,
                    label: '认证'
                }
            ],
            typeList1: [
                {
                    value: 1,
                    label: '提现'
                },
                {
                    value: 2,
                    label: '转账'
                }
            ],
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
                            case '0':
                                description = '计划'
                                break
                            case '3':
                                description = 'C通道'
                                break
                            case '4':
                                description = 'D通道'
                                break
                            case '5':
                                description = 'E通道'
                                break
                            case '6':
                                description = '认证'
                                break
                            case '7':
                                description = 'F通道'
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
            ],
            data1: []
        }
    },
    methods: {
        query () {
            this.loadData(1)
            this.current = 1
        },
        showAdvancedQuery () {
            this.$Message.warning('高级查询功能暂未上线')
        },
        changePage (page) {
            this.loadData(page)
        },
        loadData (page) {
            let data = {
                cardNo: this.search,
                userName: this.search1,
                // payWayTAG: this.payWayTAGReportType,
                // status: this.statusReportType,
                // start: this.recordDateRange[0],
                // end: this.recordDateRange[1],
                size: this.size
            }

            if (page) {
                data.page = page - 1
            }

            let me = this
            this.loading = true
            this.$http.get('/api/trading_record/findAll', { params: data }).then(function (response) {
                me.loading = false
                me.data1 = response.data.content
                me.total = response.data.totalElements
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
