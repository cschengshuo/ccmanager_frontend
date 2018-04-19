<template>
    <div>
        <Card style="margin-bottom:200px">
            <p slot="title">
                <Icon type="settings"></Icon>
                个人收益详情
            </p>
            <Row>
                <Select v-model="incomeReportType" style="width: 100px">
                    <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Date-Picker v-model="reportDateRange" v-if="showDateRange" type="daterange" placement="bottom-start" placeholder="选择时间范围" style="width: 200px"></Date-Picker>
                <Button @click="getIncomeReport" type="primary">查看</Button>
            </Row>
            <Row>
                <Table style="margin-top:10px" stripe border :loading="loading" :columns="columns" :data="data1"></Table>
            </Row>
        </Card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            loading: false,
            incomeReportType: 1,
            showDateRange: false,
            reportDateRange: [null, null],
            typeList: [
                {
                    value: 1,
                    label: '当日'
                },
                {
                    value: 2,
                    label: '当月'
                },
                {
                    value: 3,
                    label: '指定时间段'
                }
            ],
            columns: [
                {
                    title: '通道',
                    key: 'channelName'
                },
                {
                    title: '收益',
                    key: 'income'
                },
                {
                    title: '名下用户交易量',
                    key: 'selfAmount'
                },
                {
                    title: '名下用户交易收益',
                    key: 'selfIncome'
                },
                {
                    title: '下属代理交易量',
                    key: 'subAmount'
                },
                {
                    title: '下属代理带来收益',
                    key: 'subIncome'
                }
            ],
            data1: [],
            count: {
                createUser: 0,
                approveUser: 0,
                seniorUser: 0
            }
        }
    },
    methods: {
        shuffleTab (value) {
            switch (value) {
                case 'income':
                    this.getIncomeReport()
                    break

                default:
                    break
            }
        },
        getIncomeReport () {
            let me = this
            this.loading = true
            this.$http.get('/api/report/getReport', {
                params: {
                    type: this.incomeReportType,
                    start: this.reportDateRange[0],
                    end: this.reportDateRange[1]
                }
            }).then(function (response) {
                me.data1 = response.data
            }).then(function () {
                me.loading = false
            })
        },
        init () {

        }
    },
    watch: {
        incomeReportType: function (val, oldVal) {
            if (val === 3) {
                this.showDateRange = true
            } else {
                this.showDateRange = false
            }
        }
    },
    mounted () {
        this.init()
    }
}
</script>

<style>

</style>
