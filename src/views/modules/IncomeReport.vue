<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="settings"></Icon>
                收益报表
            </p>
            <Row>
                <Select v-model="incomeReportType" style="width: 100px">
                    <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Date-Picker v-model="reportDateRange" v-if="showDateRange" type="daterange" placement="bottom-start" placeholder="选择时间范围" style="width: 200px"></Date-Picker>
                <Button @click="getIncomeReport" :loading="loading" type="primary">查看</Button>
            </Row>
            <Row>
                <Table style="margin-top:10px" stripe border :loading="loading" :columns="columns" :data="data1" ref="table" :height="tableHeight"></Table>
            </Row>
        </Card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tableHeight: 600,
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
                    key: 'incomeFromSub'
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
        getIncomeReport () {
            let me = this
            this.loading = true
            this.$http.get('/api/income_report/getReport', {
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
            this.getIncomeReport()
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
        this.$nextTick(function () {
            this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 200
        })
        this.init()
    }
}
</script>

<style>
</style>
