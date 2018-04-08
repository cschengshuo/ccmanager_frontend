<template>
    <div>
        <a>欢迎你 {{ userName }}</a>
        <Button type="primary" @click="initRole">初始化角色</Button>
        <Button type="primary" @click="initUserRole">初始化用户角色</Button>
    </div>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    methods: {
        initRole () {
            this.$http.post('/api/user/initRole')
        },
        initUserRole () {
            this.$http.post('/api/user/initUserRole')
        }
    },
    mounted () {
    },
    computed: {
        userName () {
            if (this.$store.state.user) {
                return this.$store.state.user.name
            }
        }
    }
}
</script>

<style>

</style>
