<template>
    <div>
        <p :class="className" :style="{textAlign: 'center', color: color, fontSize: countSize, fontWeight: countWeight}">
            <span v-cloak :id="idName">{{ startVal }}</span>
            <span>{{ unit }}</span>
        </p>
        <slot name="intro"></slot>
    </div>
</template>

<script>
import CountUp from 'countup'

export default {
    data () {
        return {
            unit: '',
            demo: {}
        }
    },
    name: 'countUp',
    props: {
        idName: String,
        className: String,
        startVal: {
            type: Number,
            default: 0
        },
        endVal: {
            type: Number,
            required: true
        },
        decimals: {
            type: Number,
            default: 0
        },
        duration: {
            type: Number,
            default: 2
        },
        delay: {
            type: Number,
            default: 500
        },
        options: {
            type: Object,
            default: () => {
                return {
                    useEasing: true,
                    useGrouping: true,
                    separator: ',',
                    decimal: '.'
                }
            }
        },
        color: String,
        countSize: {
            type: String,
            default: '30px'
        },
        countWeight: {
            type: Number,
            default: 700
        },
        introText: [String, Number]
    },
    mounted () {
        this.$nextTick(() => {
            setTimeout(() => {
                let demo = new CountUp(this.idName, this.startVal, this.endVal, this.decimals, this.duration, this.options)
                if (!demo.error) {
                    demo.start()
                } else {
                    console.error(demo.error)
                }

                this.demo = demo
            }, this.delay)
        })
    },
    watch: {
        endVal (val) {
            let endVal = val
            if (this.demo) {
                this.demo.update(endVal)
            }
        }
    }
}
</script>
