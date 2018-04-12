<template>
    <Tree :data="treeData" :load-data="loadSubUser" @on-select-change="onSelectChange"></Tree>
</template>

<script>
export default {
    name: 'userTree',
    data () {
        return {
            treeData: []
        }
    },
    methods: {
        loadSubUser (item, callback) {
            this.$http.get('/api/user/findUsersByParentId', {
                params: {
                    id: item.value
                }
            }).then(function (response) {
                callback(response.data)
            })
        }
    },
    mounted: function () {
        let me = this
        this.$http.get('/api/user/getUserTreeRoot').then(function (response) {
            me.treeData.push(response.data)
        })
    },
    props: {
        onSelectChange: {
            type: Function
        }
    }
}
</script>

<style>

</style>
