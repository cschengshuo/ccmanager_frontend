<template>
    <div>
        <Card style="width: 50%">
            <p slot="title">
                <Icon type="person-add"></Icon>
                个人收益详情
            </p>
            <Row :gutter="5">
                <Col :xs="24" :sm="12" :md="12" :style="{marginBottom: '10px'}">
                <infor-card id-name="preSettlement" :end-val="preSettlement" icon-type="social-bitcoin" color="#2d8cf0" intro-text="可提现金额"></infor-card>
                </Col>
                <Col :xs="24" :sm="12" :md="12" :style="{marginBottom: '10px'}">
                <infor-card id-name="balance" :end-val="balance" icon-type="social-bitcoin" color="#64d572" intro-text="已提现金额"></infor-card>
                </Col>
            </Row>
            <Button @click="withdraw" type="success" long>提现</Button>
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
            preSettlement: 0,
            balance: 0
        }
    },
    methods: {
        loadData () {
            const me = this
            const userId = this.$store.state.user.id
            this.$http.get('/api/user_account/findByUserId', { params: { userId: userId } }).then(function (response) {
                me.preSettlement = response.data.preSettlement
                me.balance = response.data.balance
            })
        },
        withdraw () {
            this.$Message.warning('提现暂未开放')
        }
    },
    mounted () {
        this.loadData()
    }
}
</script>

<style>

</style>
