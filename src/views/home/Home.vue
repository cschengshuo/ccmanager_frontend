<template>
    <div>
        <Card style="width: 50%">
            <p slot="title">
                <Icon type="person-add"></Icon>
                平台用户发展
            </p>
            <Row :gutter="5">
                <Col :xs="24" :sm="12" :md="8" :style="{marginBottom: '10px'}">
                <infor-card id-name="user_created_count" :end-val="count.createUser" icon-type="person-add" color="#2d8cf0" intro-text="今日新增用户"></infor-card>
                </Col>
                <Col :xs="24" :sm="12" :md="8" :style="{marginBottom: '10px'}">
                <infor-card id-name="user_approved_count" :end-val="count.approveUser" icon-type="person-stalker" color="#64d572" :icon-size="50" intro-text="今日认证用户"></infor-card>
                </Col>
                <Col :xs="24" :sm="12" :md="8" :style="{marginBottom: '10px'}">
                <infor-card id-name="senior_user_count" :end-val="count.seniorUser" icon-type="planet" color="#ffd572" intro-text="今日新增高级用户"></infor-card>
                </Col>
            </Row>
        </Card>
    </div>
</template>

<script>
import inforCard from '@/components/inforCard.vue'
export default {
    components: {
        inforCard
    },
    data () {
        return {
            count: {
                createUser: 3,
                approveUser: 2,
                seniorUser: 3
            }
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
