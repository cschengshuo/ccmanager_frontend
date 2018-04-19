<template>
    <div>
        <Card style="width:500px">
            <p slot="title">
                <Icon type="person"></Icon>
                个人信息
            </p>
            <div>
                <Form ref="userForm" :model="userForm" :label-width="100" label-position="right" :rules="infoValidate">
                    <FormItem label="登录名：">
                        <span>{{ userForm.username }}</span>
                    </FormItem>
                    <FormItem label="用户姓名：" prop="name">
                        <Input v-model="userForm.name"></Input>
                    </FormItem>
                    <FormItem label="手机号：" prop="phone">
                        <Input v-model="userForm.phone"></Input>
                    </FormItem>
                    <FormItem label="身份证：" required prop="idCard">
                        <Input v-model="userForm.idCard"></Input>
                    </FormItem>
                    <FormItem label="邀请码：">
                        <span>{{ userForm.inviteCode }}</span>
                    </FormItem>
                    <FormItem label="登录密码：">
                        <Button type="text" size="small" @click="showEditPassword">修改密码</Button>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" :loading="save_loading" @click="saveEdit">保存</Button>
                        <Button type="text" @click="cancelEditUserInfor">取消</Button>
                    </FormItem>
                </Form>
            </div>
        </Card>
        <Modal v-model="editPasswordModal" title="修改密码" :closable='false' :mask-closable=false :width="500">
            <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right" :rules="passwordValidate">
                <FormItem label="原密码" prop="oldPass">
                    <Input v-model="editPasswordForm.oldPass" placeholder="请输入现在使用的密码"></Input>
                </FormItem>
                <FormItem label="新密码" prop="password">
                    <Input v-model="editPasswordForm.password" placeholder="请输入新密码，至少6位字符"></Input>
                </FormItem>
                <FormItem label="确认新密码" prop="pwdRepeat">
                    <Input v-model="editPasswordForm.pwdRepeat" placeholder="请再次输入新密码"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancelEditPass">取消</Button>
                <Button type="primary" :loading="savePassLoading" @click="saveEditPass">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import util from '../../libs/util'
export default {
    name: 'ownspace_index',
    data () {
        return {
            userForm: {
                id: '',
                username: '',
                name: '',
                idCard: '',
                inviteCode: '',
                phone: ''
            },
            save_loading: false,
            editPasswordModal: false,
            savePassLoading: false,
            infoValidate: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { type: 'string', max: 10, message: '姓名不能超过10个字符', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, message: '请输入正确的手机号', trigger: 'blur' }
                ],
                idCard: [
                    { validator: this.validateIdCard, trigger: 'blur' }
                ]
            },
            editPasswordForm: {
                oldPass: '',
                password: '',
                pwdRepeat: ''
            },
            passwordValidate: {
                oldPass: [
                    { required: true, message: '请输入原密码', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, max: 20, message: '长度只能在6-20个字符之间', trigger: 'blur' }
                ],
                pwdRepeat: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: this.validatePwdRepeat, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        showEditPassword () {
            this.editPasswordModal = true
        },
        cancelEditUserInfor () {
            this.$router.push({
                path: '/'
            })
        },
        saveEdit () {
            this.$refs.userForm.validate((valid) => {
                if (valid) {
                    if (this.phoneHasChanged && this.userForm.cellphone !== this.initPhone) { // 手机号码修改过了而且修改之后的手机号和原来的不一样
                        if (this.hasGetIdentifyCode) { // 判断是否点了获取验证码
                            if (this.identifyCodeRight) { // 判断验证码是否正确
                                this.saveInfoAjax()
                            } else {
                                this.$Message.error('验证码错误，请重新输入')
                            }
                        } else {
                            this.$Message.warning('请先点击获取验证码')
                        }
                    } else {
                        this.saveInfoAjax()
                    }
                }
            })
        },
        cancelEditPass () {
            this.editPasswordModal = false
        },
        saveEditPass () {
            this.$refs.editPasswordForm.validate((valid) => {
                if (valid) {
                    this.savePassLoading = true
                    // you can write ajax request here
                }
            })
        },
        init () {
            const me = this
            this.$http.get('/api/user/getCurrentUserInfo')
                .then(function (response) {
                    const data = response.data
                    me.userForm.id = data.id
                    me.userForm.username = data.username
                    me.userForm.name = data.name
                    me.userForm.idCard = data.identityCard
                    me.userForm.phone = data.phone
                    me.userForm.inviteCode = data.inviteCode
                })
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
        validatePwdRepeat (rule, value, callback) {
            if (value !== this.editPasswordForm.password) {
                callback(new Error('两次密码输入不一致'))
            } else {
                callback()
            }
        }
    },
    mounted () {
        this.init()
    }
}
</script>

<style lang="less">
.own-space {
  &-btn-box {
    margin-bottom: 10px;
    button {
      padding-left: 0;
      span {
        color: #2d8cf0;
        transition: all 0.2s;
      }
      span:hover {
        color: #0c25f1;
        transition: all 0.2s;
      }
    }
  }
  &-tra {
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
    position: absolute;
    top: 50%;
    margin-top: -6px;
    left: -3px;
    box-shadow: 0 0 2px 3px rgba(0, 0, 0, 0.1);
    background-color: white;
    z-index: 100;
  }
  &-input-identifycode-con {
    position: absolute;
    width: 200px;
    height: 100px;
    right: -220px;
    top: 50%;
    margin-top: -50px;
    border-radius: 4px;
    box-shadow: 0 0 2px 3px rgba(0, 0, 0, 0.1);
  }
}
</style>
