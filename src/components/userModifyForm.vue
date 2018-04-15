<template>
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
</template>

<script>
import util from '../libs/util'

export default {
    name: 'userModifyTree',
    data () {
        return {
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
                    E: 0.0001,
                    F: 0.0001
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
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, message: '请输入正确的手机号', trigger: 'blur' }
                ],
                idCard: [
                    { validator: this.validateIdCard, trigger: 'blur' }
                ],
                feeRate: [
                    { validator: this.validateFeeRate, trigger: 'blur' }
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
            ]
        }
    },
    methods: {
        validateLoginName: (rule, value, callback) => {
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
        },
        validateFeeRate: (rule, value, callback) => {
            if (!value) {
                callback(new Error('请设置费率'))
            } else {
                callback()
            }
        },
        validatePwdRepeat: (rule, value, callback) => {
            if (value !== this.formData.password) {
                callback(new Error('两次密码输入不一致'))
            } else {
                callback()
            }
        },
        validateIdCard: (rule, value, callback) => {
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

    }

}
</script>

<style>

</style>
