<template>
    <div>
        <Card style="width:500px">
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                Classic film
            </p>
            <Form>
                <FormItem>
                    <Button @click="initChannel" type="info">初始化通道数据</Button>
                </FormItem>
                <FormItem>
                    <Button @click="initUserFee" type="info">初始化用户费率</Button>
                </FormItem>
                <FormItem>
                    <Button @click="initRole" type="info">初始化角色</Button>
                </FormItem>
                <FormItem>
                    <Button @click="initUserRole" type="info">初始化用户角色</Button>
                </FormItem>
                <FormItem>
                    <Button @click="initUserPassword" type="info">初始化用户密码</Button>
                </FormItem>
                <FormItem>
                    <Button @click="initPlatformUserFee" type="info">初始化平台用户费率</Button>
                </FormItem>
                <FormItem>
                    <Button @click="doCreateMerchant" type="info">老用户商户开通</Button>
                </FormItem>
                <FormItem>
                    <Input v-model="money" placeholder="Enter something..."></Input>
                    <Button @click="addRechargeRecord" type="info">充值</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            money: 0
        }
    },
    methods: {
        initChannel () {
            this.$http.post('/api/init/initChannel')
                .then((response) => {

                })
        },
        initUserFee () {
            this.$http.post('/api/init/initUserFee')
                .then((response) => {

                })
        },
        initRole () {
            this.$http.post('/api/init/initRole')
                .then((response) => {

                })
        },
        initUserRole () {
            this.$http.post('/api/init/initUserRole')
                .then((response) => {

                })
        },
        initUserPassword () {
            this.$http.post('/api/init/initUserPassword')
                .then((response) => {

                })
        },
        initPlatformUserFee () {
            this.$http.post('/api/init/initPlatformUserFee')
                .then((response) => {

                })
        },
        doCreateMerchant () {
            this.$http.post('/api/init/doCreateMerchant')
                .then((response) => {

                })
        },
        addRechargeRecord () {
            this.$http.post('/api/recharge/addRechargeRecord', { money: this.money })
                .then((response) => {

                })
        }
    }
}
</script>

<style>

</style>
