<template>
    <div>
        <Button @click="initChannel" type="info">初始化通道数据</Button>
        <Button @click="initUserFee" type="info">初始化用户费率</Button>
        <Button @click="initRole" type="info">初始化角色</Button>
        <Button @click="initUserRole" type="info">初始化用户角色</Button>
        <Button @click="initUserPassword" type="info">初始化用户密码</Button>
    </div>
</template>

<script>
export default {
    data () {
        return {

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
        }
    }
}
</script>

<style>

</style>
