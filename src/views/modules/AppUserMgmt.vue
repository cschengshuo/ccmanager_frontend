<template>
    <div>
        <Layout :style="{minHeight: '80vh'}">
            <Sider :style="{background: '#F0F0F0'}">
                <Card>
                    <user-tree :onSelectChange="onSelectChange"></user-tree>
                </Card>
            </Sider>
            <Content :style="{background: '#F0F0F0'}">
                <Card>
                    <Table stripe border style="margin: 10px 0" :loading="loading" :columns="columns" :data="gridData"></Table>
                    <Page :total="total" :page-size="size" @on-change="changePage" show-total></Page>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script>
import userTree from '@/components/userTree.vue'
export default {
    components: {
        userTree
    },
    data () {
        return {
            loading: false,
            columns: [
                {
                    title: '邀请人',
                    key: 'agentName'
                },
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '手机号码',
                    key: 'contactPhone'
                },
                {
                    title: '邀请码',
                    key: 'inviteCode'
                },
                {
                    title: '身份证',
                    key: 'iDNumber'
                },
                {
                    title: '注册时间',
                    key: 'registerTime'
                },
                {
                    title: '账户余额',
                    key: 'canbalance'
                },
                {
                    title: '高级用户',
                    key: 'seniorUser',
                    render: (h, params) => {
                        if (params.row.seniorUser) {
                            return h('span', '是')
                        } else {
                            return h('span', '否')
                        }
                    }
                }
            ],
            gridData: [],
            total: 0,
            size: 15
        }
    },
    methods: {
        modify (id) {
            this.$Message.warning('修改手机用户功能暂未上线')
        },
        remove (id) {
            this.$Message.warning('删除手机用户功能暂未上线')
        },
        changePage (page) {
            this.loadData('', page)
        },
        loadData (id, page) {
            let me = this
            this.loading = true

            let data = {
                agentId: id,
                size: this.size
            }

            if (page) {
                data.page = page - 1
            }

            this.$http.get('/api/app_user/findAppUsersByAgentId', { params: data }).then(function (response) {
                me.loading = false
                me.gridData = response.data.content
                me.total = response.data.totalElements
            })
        },
        onSelectChange (e) {
            if (e.length > 0) {
                this.loadData(e[0].value)
            }
        }
    },
    mounted () {
        this.loadData()
    }
}
</script>

<style>

</style>
