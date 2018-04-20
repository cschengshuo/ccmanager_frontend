<template>
    <div id="app">
        <Card>
            <p slot="title">
                <Icon type="person-stalker"></Icon>
                代理商列表
            </p>
            <div slot="extra">
                <Button @click="addAgent" type="success" style="margin-right: 10px">新增代理</Button>
                <Badge count="1" style="margin-right: 10px">
                    <Button @click="auditAddAgent" type="info">新增代理审核</Button>
                </Badge>
                <Badge count="0" style="margin-right: 10px">
                    <Button @click="auditDeleteAgent" type="warning">删除代理审核</Button>
                </Badge>
            </div>
            <Input v-model="search" icon="search" placeholder="登录名" style="width: 200px"></Input>
            <Button @click="query" type="primary">查询</Button>
            <Button @click="showAdvancedQuery" type="primary">高级查询</Button>
            <Table stripe border style="margin-top:10px" :loading="loading" :columns="columns" :data="gridData"></Table>
        </Card>
        <user-create-form :open.sync="showCreateForm" @success="loadData"></user-create-form>
        <user-modify-form :open.sync="showModifyForm" :userId="modifyUserId" @success="loadData"></user-modify-form>
    </div>
</template>

<script>
import userCreateForm from '@/components/userCreateForm.vue'
import userModifyForm from '@/components/userModifyForm.vue'

export default {
    components: {
        userCreateForm,
        userModifyForm
    },
    data () {
        return {
            search: '',
            loading: false,
            formLoading: true,
            showCreateForm: false,
            showModifyForm: false,
            modifyUserId: '',
            columns: [
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '登录名',
                    key: 'username'
                },
                {
                    title: '手机号',
                    key: 'phone'
                },
                {
                    title: '邀请码',
                    key: 'inviteCode'
                },
                {
                    title: '身份证',
                    key: 'identityCard'
                },
                {
                    title: '代理区域',
                    key: 'agentAreaCode'
                },
                {
                    title: '紧急联系人',
                    key: 'emergencyContact'
                },
                {
                    title: '代理层级',
                    key: 'userType'
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
                            }, '修改')
                            // ,
                            // h('Button', {
                            //     props: {
                            //         type: 'error',
                            //         size: 'small'
                            //     },
                            //     on: {
                            //         click: () => {
                            //             this.remove(params.row.id)
                            //         }
                            //     }
                            // }, '删除')
                        ])
                    }
                }
            ],
            gridData: []
        }
    },
    methods: {
        addAgent () {
            this.showCreateForm = true
        },
        modify (id) {
            this.modifyUserId = id
            this.showModifyForm = true
        },
        auditAddAgent () {
            this.$Message.warning('审核新增代理申请功能暂未上线')
        },
        auditDeleteAgent () {
            this.$Message.warning('审核删除代理申请功能暂未上线')
        },
        query () {
            this.loadData()
        },
        showAdvancedQuery () {
            this.$Message.warning('高级查询功能暂未上线')
        },
        remove (id) {
            this.$Message.warning('删除代理功能暂未上线')
        },
        loadData () {
            let me = this
            this.loading = true
            this.$http.get('/api/user/findUsers', {
                params: {
                    loginName: this.search
                }
            }).then(function (response) {
                me.loading = false
                me.gridData = response.data
            })
        }
    },
    mounted () {
        this.loadData()
    }
}
</script>

<style lang="less">

</style>
