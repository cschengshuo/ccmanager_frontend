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
        <Modal v-model="showForm" :loading="formLoading" :closable="false" :mask-closable="false" :title="formTitle" @on-ok="submit">
            <Form ref="agentForm" :model="formData" :rules="ruleValidate" :label-width="80">
                <FormItem label="上级代理" prop="parentName" v-if="true">
                    <Input readonly v-model="formData.parentName" placeholder="点击按钮选择上级代理">
                    <Button slot="append" @click="showSelectParentModal" icon="arrow-down-b"></Button>
                    </Input>
                </FormItem>
                <FormItem label="姓名" prop="name">
                    <Input v-model="formData.name" placeholder="用户的真实姓名"></Input>
                </FormItem>
                <FormItem label="登录名" prop="loginName">
                    <Input v-model="formData.loginName" placeholder="登录本系统使用的用户名"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input type="password" v-model="formData.password" placeholder="建议使用字母、数字和符号两种及以上的组合"></Input>
                </FormItem>
                <FormItem label="确认密码" prop="pwdRepeat">
                    <Input type="password" v-model="formData.pwdRepeat" placeholder="请再次输入密码"></Input>
                </FormItem>
                <FormItem label="手机号" prop="mobile">
                    <Input v-model="formData.mobile" placeholder="">
                    <span slot="prepend">中国 +86</span>
                    </Input>
                </FormItem>
                <FormItem label="身份证号" required prop="idCard">
                    <Input v-model="formData.idCard" placeholder=""></Input>
                </FormItem>
                <FormItem label="费率" required prop="feeRateStr" v-if="true">
                    <Input readonly v-model="formData.feeRateStr" placeholder="点击按钮设置费率">
                    <Button slot="append" @click="showSetFeeRateModal" icon="arrow-down-b"></Button>
                    </Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="showSelectParent" :styles="{top: '150px'}" :closable="false" :mask-closable="false" title="选择上级代理" @on-ok="doSelectParent">
            <Tree ref="userTree" :data="treeData" :load-data="loadSubUser"></Tree>
        </Modal>
        <Modal v-model="showSetFeeRate" :styles="{top: '150px'}" :closable="false" :mask-closable="false" title="设置费率" @on-ok="doSetFeeRate">
            <Form ref="agentForm" :model="formData" :label-width="80">
                <FormItem v-for="(item, index) in feeRateItems" v-if="item.status" :key="index" :label="item.label" :prop="'feeRate.' + item.index + '.value'" :rules="{required: true, message: '请设置' + item.label + '的费率', trigger: 'blur'}">
                    <Slider v-model="item.value" :max="item.max" :min="item.min" show-input></Slider>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import util from '../../libs/util'
export default {
    data () {
        const validateIdCard = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入身份证号'))
                // callback()
            }
            let result = util.checkCard(value)
            if (!result.pass) {
                callback(new Error(result.tip))
            } else {
                callback()
            }
        }

        const validatePwdRepeat = (rule, value, callback) => {
            if (value !== this.formData.password) {
                callback(new Error('两次密码输入不一致'))
            } else {
                callback()
            }
        }

        const validateFeeRate = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请设置费率'))
            } else {
                callback()
            }
        }

        const validateLoginName = (rule, value, callback) => {
            this.$http.get('checkLoginName', {
                params: {
                    loginName: value
                }
            }).then(function (response) {
                if (response.data.success) {
                    callback()
                } else {
                    callback(new Error(response.data.message))
                }
            })
        }

        return {
            search: '',
            loading: false,
            formLoading: true,
            showForm: false,
            formTitle: '',
            showSelectParent: false,
            showSetFeeRate: false,
            formData: {
                id: '',
                parentName: '',
                parentId: '',
                name: '',
                loginName: '',
                password: '',
                pwdRepeat: '',
                mobile: '',
                idCard: '',
                feeRateStr: '',
                feeRate: {
                    PLAN: 0.0001,
                    C: 0.0001,
                    D: 0.0001
                }
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { type: 'string', max: 10, message: '姓名不能超过10个字符', trigger: 'blur' }
                ],
                loginName: [
                    { required: true, message: '请输入登录名', trigger: 'blur' },
                    { type: 'string', min: 4, max: 20, message: '长度只能在4-20个字符之间', trigger: 'blur' },
                    { pattern: /^[a-zA-Z].+$/, message: '必须以字母开头', trigger: 'blur' },
                    { pattern: /^\w+$/, message: '仅支持字符、数字和下划线', trigger: 'blur' },
                    { validator: validateLoginName, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, max: 20, message: '长度只能在6-20个字符之间', trigger: 'blur' }
                ],
                pwdRepeat: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: validatePwdRepeat, trigger: 'blur' }
                ],
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, message: '请输入正确的手机号', trigger: 'blur' }
                ],
                idCard: [
                    { validator: validateIdCard, trigger: 'blur' }
                ],
                feeRate: [
                    { validator: validateFeeRate, trigger: 'blur' }
                ]
            },
            feeRateItems: [
                {
                    label: '计划',
                    status: true,
                    max: 80,
                    min: 42,
                    value: 42,
                    index: 'PLAN'
                },
                {
                    label: '通道C',
                    status: true,
                    max: 53,
                    min: 38,
                    value: 38,
                    index: 'C'
                },
                {
                    label: '通道D',
                    status: true,
                    max: 0,
                    min: 0,
                    value: 0,
                    index: 'D'
                }
            ],
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
            treeData: [],
            gridData: []
        }
    },
    methods: {
        addAgent () {
            this.showForm = true
            this.formTitle = '新增代理'
        },
        modify (id) {
            this.showForm = true
            this.formTitle = '修改代理'
        },
        showSelectParentModal () {
            this.showSelectParent = true
            this.loadUserTree()
        },
        showSetFeeRateModal () {
            this.showSetFeeRate = true
        },
        doSetFeeRate () {

        },
        loadUserTree () {
            let me = this
            this.$http.get('listSubUserTree')
                .then(function (response) {
                    if (response.data.success) {
                        me.treeData = response.data.data
                    } else {
                        me.$Message.error(response.data.message)
                    }
                })
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
        loadSubUser (item, callback) {
            let me = this
            this.$http.get('listSubUserTree', {
                params: {
                    userId: item.value,
                    hideRoot: true
                }
            }).then(function (response) {
                if (response.data.success) {
                    callback(response.data.data)
                } else {
                    me.$Message.error(response.data.message)
                    // FIXME
                    callback()
                }
            })
        },
        doSelectParent () {
            let selected = this.$refs.userTree.getSelectedNodes()
            if (selected[0]) {
                this.formData.parentId = selected[0].value
                this.formData.parentName = selected[0].title
            }
        },
        submit () {
            let me = this
            this.$refs['agentForm'].validate((valid) => {
                if (valid) {
                    let data = this.formData
                    this.$http.post('addAgent', {
                        id: data.id,
                        parentId: data.parentId,
                        name: data.name,
                        loginName: data.loginName,
                        password: data.password,
                        mobile: data.mobile,
                        idCard: data.idCard,
                        feeRate: JSON.stringify(data.feeRate)
                    }).then(function (response) {
                        me.$Message.success('Success!')
                        me.showForm = false
                    })
                } else {
                    me.formLoading = false
                    me.$nextTick(() => { me.formLoading = true })
                    this.$Message.error('注册信息填写有误!')
                }
            })
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
            console.log(id)
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

<style>

</style>
