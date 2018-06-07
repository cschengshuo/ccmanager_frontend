<template>
    <div id="grid">
        <Card>
            <p slot="title">
                <Icon type="settings"></Icon>
                代理申请列表
            </p>
            <Table stripe border style="margin: 10px 0" :loading="loading" :columns="columns" :data="data1"></Table>
            <Page :total="total" :current.sync="current" :page-size="size" @on-change="changePage" show-total></Page>
        </Card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            loading: false,
            total: 0,
            size: 15,
            current: 1,
            columns: [
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '公司名',
                    key: 'company'
                },
                {
                    title: '手机号',
                    key: 'phone'
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
                size: this.size
            }

            if (page) {
                data.page = page - 1
            }

            let me = this
            this.loading = true
            this.$http.get('/api/agent_apply/findAll', { params: data }).then(function (response) {
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
