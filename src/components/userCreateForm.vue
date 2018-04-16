<template>
    <div>
        <Modal v-model="isOpen" class-name="vertical-center-modal" :loading="loading" :mask-closable="false" title="新增代理" @on-ok="submit" @on-visible-change="onVisibleChange" :transfer="false">
            <Form ref="createForm" :model="formData" :rules="ruleValidate" :label-width="80">
                <FormItem label="上级代理" prop="parentName">
                    <Input readonly v-model="formData.parentName" placeholder="点击按钮选择上级代理，未选择时默认为当前用户">
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
                <FormItem label="手机号" prop="phone">
                    <Input v-model="formData.phone" placeholder="">
                    <span slot="prepend">中国 +86</span>
                    </Input>
                </FormItem>
                <FormItem label="身份证号" required prop="idCard">
                    <Input v-model="formData.idCard" placeholder="请输入18位身份证号"></Input>
                </FormItem>
                <FormItem label="费率" required prop="feeRateStr">
                    <Input readonly v-model="formData.feeRateStr" placeholder="点击按钮设置费率">
                    <Button slot="append" @click="showSetFeeRateModal" icon="arrow-down-b"></Button>
                    </Input>
                </FormItem>
                <FormItem label="代理区域" required prop="areaName">
                    <Input readonly v-model="formData.areaName" placeholder="点击按钮设置代理区域">
                    <Button slot="append" @click="showAgentAreaModal" icon="arrow-down-b"></Button>
                    </Input>
                </FormItem>
            </Form>
        </Modal>
        <user-tree-modal :open.sync="showSelectParent" :parentId="formData.parentId" @submit="setParent"></user-tree-modal>
        <fee-rate-modal :open.sync="showSetFeeRate" :feeRate="formData.feeRate" :parentId="formData.parentId" @submit="setFeeRate"></fee-rate-modal>
        <area-modal :open.sync="showAgentArea" :area="formData.areaCode" @submit="setAgentArea"></area-modal>
    </div>
</template>

<script>
import util from '../libs/util'
import userTreeModal from '@/components/userTreeModal.vue'
import feeRateModal from '@/components/feeRateModal.vue'
import areaModal from '@/components/areaModal.vue'

export default {
    name: 'userCreateForm',
    props: {
        open: {
            type: Boolean
        }
    },
    components: {
        userTreeModal,
        feeRateModal,
        areaModal
    },
    data () {
        return {
            isOpen: this.open,
            showSelectParent: false,
            showSetFeeRate: false,
            showAgentArea: false,
            loading: true,
            formData: {
                id: '',
                parentName: '',
                parentId: '',
                name: '',
                loginName: '',
                password: '',
                pwdRepeat: '',
                phone: '',
                idCard: '',
                feeRateStr: '',
                feeRate: {},
                areaName: '',
                areaCode: ''
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
                    { validator: this.validateLoginName, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, max: 20, message: '长度只能在6-20个字符之间', trigger: 'blur' }
                ],
                pwdRepeat: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: this.validatePwdRepeat, trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, message: '请输入正确的手机号', trigger: 'blur' }
                ],
                idCard: [
                    { validator: this.validateIdCard, trigger: 'blur' }
                ],
                feeRateStr: [
                    { validator: this.validateFeeRate, trigger: 'blur' }
                ],
                areaName: [
                    { validator: this.validateAgentArea, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submit () {
            let me = this
            this.$refs.createForm.validate((valid) => {
                if (valid) {
                    this.$http.post('/api/user/createUser', {
                        parentId: this.formData.parentId,
                        name: this.formData.name,
                        loginName: this.formData.loginName,
                        password: this.formData.password,
                        phone: this.formData.phone,
                        idCard: this.formData.idCard,
                        feeRate: this.formData.feeRate,
                        areaCode: this.formData.areaCode
                    }).then(function (response) {
                        me.$Message.success('新增代理成功!')
                        me.loading = false
                        me.$nextTick(() => { me.loading = true })
                        me.isOpen = false
                        me.$emit('success')
                    }).catch(function () {
                        me.loading = false
                        me.$nextTick(() => { me.loading = true })
                        this.$Message.error(arguments)
                    })
                } else {
                    me.loading = false
                    me.$nextTick(() => { me.loading = true })
                    this.$Message.error('注册信息填写有误!')
                }
            })
        },
        setParent (selected) {
            if (selected) {
                this.formData.parentId = selected.value
                this.formData.parentName = selected.title
                this.formData.feeRateStr = ''
                this.formData.feeRate = {}
            }
        },
        setFeeRate (data) {
            this.formData.feeRateStr = ''
            let desc = []
            Object.values(data).forEach((value) => {
                let text = ''
                text += value.label + ': '
                if (value.feeRate) {
                    text += util.strip(value.value * 1000) + '‰'
                } else {
                    text += value.value + '元'
                }
                desc.push(text)
            })
            this.formData.feeRateStr = desc.join('，')
            this.formData.feeRate = data
        },
        setAgentArea (select) {
            this.formData.areaName = ''
            select.forEach((value) => {
                this.formData.areaName += value.name
                this.formData.areaCode = value.code
            })
        },
        reset () {
            this.$refs.createForm.resetFields()
            this.formData.feeRate = {}
            this.formData.parentId = ''
            this.formData.areaCode = ''
        },
        onVisibleChange () {
            this.reset()
            this.$emit('update:open', this.isOpen)
        },
        showSelectParentModal () {
            this.showSelectParent = true
        },
        showSetFeeRateModal () {
            this.showSetFeeRate = true
        },
        showAgentAreaModal () {
            this.showAgentArea = true
        },
        validateLoginName (rule, value, callback) {
            this.$http.get('/api/user/checkLoginNameExist', {
                params: {
                    username: value
                }
            }).then(function (response) {
                if (response.data) {
                    callback(new Error('用户登录名已存在'))
                } else {
                    callback()
                }
            })
        },
        validateFeeRate (rule, value, callback) {
            if (!value) {
                callback(new Error('请设置费率'))
            } else {
                callback()
            }
        },
        validatePwdRepeat (rule, value, callback) {
            if (value !== this.formData.password) {
                callback(new Error('两次密码输入不一致'))
            } else {
                callback()
            }
        },
        validateIdCard (rule, value, callback) {
            if (!value) {
                callback(new Error('请输入身份证号'))
            }
            let result = util.checkCard(value)
            if (!result.pass) {
                callback(new Error(result.tip))
            } else {
                callback()
            }
        },
        validateAgentArea (rule, value, callback) {
            if (!value) {
                callback(new Error('请设置代理区域'))
            } else {
                callback()
            }
        }

    },
    watch: {
        open () { this.isOpen = this.open }
    }

}
</script>

<style lang="less">
@import "./styles/modal.less";
</style>
