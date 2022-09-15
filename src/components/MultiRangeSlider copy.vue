<template>
    <div class="multi-range-slider">
        <div
         class="multi-range-slider-item"
         v-for="(slider, index) in sliders"
         :key="index"
         :style="{
            'grid-column': slider.span
         }"
        >
            <Slider
                v-model="slider.value"
                :min="slider.range[0]"
                :max="slider.range[1]"
            />
        </div>
        <i v-if="sliders.length === 1" class="bi bi-pause split-btn" @click="addSlider"></i>
        <i v-else class="bi bi-dash split-btn minus" :style="{left: splitBtnLeft + '%'}" @click="removeSlider"></i>
    </div>
</template>

<script>
import Slider from '@vueform/slider'
import '@vueform/slider/themes/default.css'

export default {
    components: {
        Slider
    },
    props: {
        defaultRanges: {
            type: Array,
            default: () => [[0, 24]]
        }
    },
    data: () => ({
        // selectRange: [0, 100]
        sliders: [
            {
                value: [0, 24],
                range: [0, 24],
                span: '1 / 48'
            }
        ],
        oldVals: [[0, 24]],
        splitBtnLeft: 50
    }),
    mounted(){
        if(this.defaultRanges.length === 1){
            this.sliders = [
                {
                    value: this.defaultRanges[0],
                    range: [0, 24],
                    span: '1 / 48'
                }
            ]
            this.oldVals = this.defaultRanges
            return
        }
        let rangeLeft = 11
        let rightRange = 12
        if(this.defaultRanges[0][1] > 11){
            rangeLeft = this.defaultRanges[0][1]
            rightRange = this.defaultRanges[0][1] + 1
        }
        if(this.defaultRanges[1][0] < 12){
            rightRange = this.defaultRanges[1][0]
        }

        this.sliders = [
            {
                value: this.defaultRanges[0],
                range: [0, rangeLeft],
                span: `1 / ${rangeLeft * 2 - 2}`
            },
            {
                value: this.defaultRanges[1],
                range: [rightRange, 24],
                span: `${rangeLeft * 2} / 48`
            }
        ]
        this.oldVals = this.defaultRanges
    },
    watch: {
        emitRanges(){
            const timeRanges = this.sliders.map(slider => slider.value)
            this.$emit('timeRangeChanged', timeRanges)
        },
        sliders: {
            handler(newVal, oldVal){
                this.emitRanges()

                if(newVal.length === 1 || oldVal.length === 1) return

                const prevA1 = this.oldVals[0][1]
                const prevB0 = this.oldVals[1][0]

                const newA1 = newVal[0].value[1]
                const newB0 = newVal[1].value[0]

                if(prevA1 !== newA1){
                    this.sliders[0].span = `1 / ${newA1 * 2}`
                    this.sliders[0].range = [0, newA1]

                    this.sliders[1].span = `${(newA1 * 2) + 2} / 48`
                    this.sliders[1].range = [newA1 + 1, 24]
                }

                if(prevB0 !== newB0){
                    this.sliders[0].span = `1 / ${(newB0 * 2) - 2}`
                    this.sliders[0].range = [0, newB0 - 1]

                    this.sliders[1].span = `${newB0 * 2} / 48`
                    this.sliders[1].range = [newB0, 24]
                }

                this.oldVals = [
                    newVal[0].value,
                    newVal[1].value
                ]

                const avg = (newA1 + newB0) / 2
                this.splitBtnLeft = avg * 100 / 24
            },
            deep: true
        }
    },
    methods: {
        addSlider(){
            this.sliders = [
                {
                    value: [0, 11],
                    range: [0, 11],
                    span: '1 / 22'
                },
                {
                    value: [12, 24],
                    range: [12, 24],
                    span: '24 / 48'
                }
            ]
            this.oldVals = [
                [0, 11],
                [13, 24]
            ]
        },
        removeSlider(){
            this.sliders = [
                {
                    value: [
                        this.sliders[0].value[0],
                        this.sliders[1].value[1]
                    ],
                    range: [0, 24],
                    span: '1 / 48'
                }
            ]
            this.oldVals = [
                [0, 24]
            ]
        }
    }
}
</script>


<style>
.slider-target{
    margin-top: 3em;
}

.multi-range-slider{
    display: grid;
    grid-template-columns: repeat(48, 1fr);
    /* background: cyan; */
    position: relative;
    margin-bottom: 2em;

}
.multi-range-slider .split-btn{
    position: absolute;
    bottom: -.5em;
    left: 50%;
    z-index: 2;
    transform: translateX(-50%);
    width: 1.5em;
    height: 1.5em;
    text-align: center;
    line-height: 1.5em;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 3px 5px rgba(0,0,0,.3);
    cursor: pointer;
}
.multi-range-slider .split-btn.minus{
    bottom: -2em;
}
.multi-range-slider-item{
    grid-column: 1 / 48;
}
</style>