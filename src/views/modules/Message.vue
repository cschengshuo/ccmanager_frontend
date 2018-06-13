<template>
    <div>
        <Card style="margin-bottom:10px">
            <p slot="title">
                <Icon type="person-add"></Icon>
                发送公告
            </p>
            <Input style="margin-bottom:10px" v-model="announcement" type="textarea" :rows="4" placeholder="公告内容"></Input>
            <Button @click="confirm">发送</Button>
        </Card>
        <Card>
            <p slot="title">
                <Icon type="settings"></Icon>
                公告发送记录
            </p>
            <Table stripe border style="margin: 10px 0" :loading="loading" :columns="columns" :data="data" ref="table" :height="tableHeight"></Table>
            <Page :total="total" :current.sync="current" :page-size="size" @on-change="changePage" show-total></Page>
        </Card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tableHeight: 600,
            announcement: '',
            loading: false,
            data: [],
            total: 0,
            size: 10,
            current: 1,
            columns: [
                {
                    title: '发送时间',
                    key: 'createtime',
                    width: 150
                },
                {
                    title: '内容',
                    key: 'text'
                }
            ]
        }
    },
    methods: {
        confirm () {
            const me = this

            if (!this.announcement) {
                this.$Message.warning('请输入公告内容')
                return
            }

            this.$Modal.confirm({
                title: '确认发送',
                content: this.announcement,
                loading: true,
                onOk () {
                    this.$http.post('/api/message/sendAnnouncement', { text: me.announcement }).then(function (response) {
                        me.announcement = ''
                        me.loadData()
                        me.$Modal.remove()
                    }).catch(function () {
                        me.$Modal.remove()
                    })
                }
            })
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
            this.$http.get('/api/message/listAnnouncement', { params: data }).then(function (response) {
                me.loading = false
                me.data = response.data.content
                me.total = response.data.totalElements
            })
        },
        init () {
            this.loadData()
        }
    },
    mounted () {
        this.$nextTick(function () {
            this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 375
        })
        this.init()
    }
}
</script>

<style>
</style>
