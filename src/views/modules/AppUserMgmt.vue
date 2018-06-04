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
                    <Input v-model="username" icon="search" placeholder="姓名" style="width: 200px"></Input>
                    <Input v-model="mobile" icon="search" placeholder="手机号" style="width: 200px"></Input>
                    <Input v-model="idCard" icon="search" placeholder="身份证" style="width: 200px"></Input>
                    <Button @click="query" type="primary">查询</Button>
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
            agentId: '',
            username: '',
            mobile: '',
            idCard: '',
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
                            return h('span', { attrs: { 'class': 'i-emoji' } }, '\u2714')
                        } else {
                            return h('span', { attrs: { 'class': 'i-emoji' } }, '\u274C')
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
            this.loadData(page)
        },
        query () {
            this.loadData()
        },
        loadData (page) {
            let me = this
            this.loading = true

            let data = {
                agentId: this.agentId,
                size: this.size
            }

            if (this.username) data.username = this.username
            if (this.mobile) data.mobile = this.mobile
            if (this.idCard) data.idCard = this.idCard

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
                this.agentId = e[0].value
                this.loadData()
            }
        }
    },
    mounted () {
        this.loadData()
    }
}
</script>

<style>
.i-emoji {
  font-family: "Segoe UI Emoji";
}
</style>
