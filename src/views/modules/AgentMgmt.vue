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
        <user-create-form :open.sync="showForm"></user-create-form>
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
            showForm: false,
            columns: [
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '登录名',
                    key: 'loginName'
                },
                {
                    title: '手机号',
                    key: 'mobile'
                },
                {
                    title: '邀请码',
                    key: 'inviteCode'
                },
                {
                    title: '许可证',
                    key: 'licence'
                },
                {
                    title: '紧急联系人',
                    key: 'emergencyContact'
                },
                {
                    title: '类型',
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
        addAgent () {
            this.showForm = true
        },
        modify (id) {
            this.showForm = true
        },
        renderNode (h, { root, node, data }) {
            return h('span', [
                h('Icon', {
                    props: {
                        type: 'document-text'
                    },
                    style: {
                        marginRight: '8px'
                    }
                }),
                h('span', data.title)
            ])
        },
        doSelectParent () {
            let selected = this.$refs.userTree.getSelectedNodes()
            if (selected[0]) {
                this.formData.parentId = selected[0].value
                this.formData.parentName = selected[0].title
            }
        },
        auditAddAgent () {
            this.$Message.warning('审核新增代理功能暂未上线')
        },
        auditDeleteAgent () {
            this.$Message.warning('审核删除代理功能暂未上线')
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
            this.$http.get('/api/user/findAll', {
                params: {
                    loginName: this.search
                }
            }).then(function (response) {
                me.loading = false
                me.gridData = response.data
            })
        },
        onSelectChange (selected) {

        }
    },
    watch: {
        feeRate: function (val, oldVal) {
            let literal = ''
            val.forEach(element => {
                literal += element.label + ': ' + element.value
            })
            this.feeRateStr = literal
        }
    },
    mounted () {
        this.loadData()
    }
}
</script>

<style lang="less">

</style>
