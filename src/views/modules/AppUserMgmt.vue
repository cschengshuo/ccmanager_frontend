<template>
    <div>
        <Layout :style="{minHeight: '100vh'}">
            <Sider :style="{background: '#fff'}">
                <user-tree :onSelectChange="onSelectChange"></user-tree>
            </Sider>
            <Table stripe border style="margin-top:10px" :loading="loading" :columns="columns" :data="gridData"></Table>
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
                    key: 'agentId'
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
                    key: 'idnumber'
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
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.modify(params.row.id)
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.row.id)
                                    }
                                }
                            }, '删除')
                        ])
                    }
                }
            ],
            gridData: []
        }
    },
    methods: {
        modify (id) {
            this.$Message.warning('修改手机用户功能暂未上线')
        },
        remove (id) {
            console.log(id)
            this.$Message.warning('删除手机用户功能暂未上线')
        },
        loadData (id) {
            let me = this
            this.loading = true
            this.$http.get('/api/app_user/findAppUsersByAgentId', {
                params: {
                    agentId: id
                }
            }).then(function (response) {
                me.loading = false
                me.gridData = response.data
            })
        },
        onSelectChange (e) {
            console.log(e)

            this.loadData(e[0].value)
        }
    },
    mounted () {
        this.loadData()
    }
}
</script>

<style>

</style>
