<template>
    <div class="multi-range-slider">
        <div
         class="multi-range-slider-item"
        >
            <Slider
                v-model="testModel"
                :options="opts"
                :lazy="false"
            />
        </div>
        <span
            class="split-btns"
            :style="{
                left: slider.posLeft + '%'
            }"
            v-for="(slider, index) in sliders"
            :key="index"
        >
            <i
                class="bi bi-pause split-btn"
                @click="splitSlider(index)"
                v-if="slider.showSplitBtn"
            ></i>
            <i
                class="bi bi-dash split-btn"
                @click="removeSlider(index)"
                v-if="sliders.length > 1"
            ></i>
            <!-- <span>{{slider}}</span> -->
        </span>
    </div>
</template>

<script>
import Slider from '@vueform/slider'
import '@vueform/slider/themes/default.css'


const map = (val, inMin, inMax, outMin, outMax) => {
    return (val - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
}

const getBtnPosLeft = slider => {
    const left = slider.value[0]
    const right = slider.value[1]

    const v1 = map(left, 0, 48, 0, 100)
    const v2 = map(right, 0, 48, 0, 100)
    
    return (v1 + v2) / 2
}
export default {
    components: {
        Slider
    },
    props: {
        defaultRanges: {
            type: Array,
            default: () => []
        }
    },
    data: () => ({
        testModel: [0, 48],
        sliders: [
            {
                value: [0, 48],
                posLeft: 50,
                showSplitBtn: true
            }
        ],
        opts: {
            start: [0, 48],
            connect: [false, true, false],
            range: {
                'min': 0,
                'max': 48
            },
            tooltips: [
                { to: (value) => Math.floor(value) / 2},
                { to: (value) => Math.floor(value) / 2}
            ],
            format: {
                from: v => v,
                to: v => Math.floor(v),
            },
            margin: 1
        }
    }),
    mounted(){
        if(!this.defaultRanges.length) return
        const sliders = this.defaultRanges.map(range => {
            return {
                value: [range[0] * 2, range[1] * 2],
                posLeft: 50,
                showSplitBtn: true
            }
        })
        this.sliders = sliders
        this.updateOpts()
    },
    watch: {
        testModel: {
            handler(){
                this.updateSliders()
            },
            deep: true
        }
    },
    methods: {
        splitSlider(index){
            const val = this.sliders[index]
            const left = val.value[0]
            const right = val.value[1]
            const mid = Math.floor((left + right) / 2)
            const midLeft = mid
            const midRight = mid + 1
            const s1 = {
                value: [left, midLeft],
                posLeft: getBtnPosLeft({value: [left, midLeft]}),
                showSplitBtn: true
            }
            const s2 = {
                value: [midRight, right],
                posLeft: getBtnPosLeft({value: [midRight + .5, right]}),
                showSplitBtn: true
            }

            this.sliders.splice(index, 1)
            this.sliders = [
                ...this.sliders.slice(0, index),
                s1, s2,
                ...this.sliders.slice(index)
            ]
    
            
            this.updateOpts()
            this.emitChnages()
        },
        removeSlider(index){
            this.sliders.splice(index, 1)
            this.updateOpts()
            this.emitChnages()
        },
        updateSliders(){
            this.sliders.forEach((slider, index) => {
                slider.value = [this.testModel[index * 2], this.testModel[index * 2 + 1]]
                slider.posLeft = getBtnPosLeft(slider),
                slider.showSplitBtn = slider.value[1] - slider.value[0] > 1.5
            })
            this.emitChnages()
        },
        updateOpts(){
            let start = []
            const connect = [false]
            this.sliders.forEach(s => {
                start = [...start, s.value[0], s.value[1]]
                connect.push(true)
                connect.push(false)
                s.posLeft = getBtnPosLeft(s)
            })
            this.opts.start = start
            this.opts.connect = connect
            this.opts.tooltips = new Array(this.sliders.length * 2).fill({ to: (value) => Math.floor(value) / 2})
        },
        emitChnages(){
            this.$emit(
                'timeRangeChanged',
                this.sliders.map(s => [s.value[0] / 2, s.value[1] / 2])
            )
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
    margin-bottom: 2em;
    position: relative;
}
.multi-range-slider-item{
    grid-column: 1 / 48;
}
.multi-range-slider .split-btns{
    bottom: -2em;
    position: absolute;
    bottom: -.5em;
    left: 50%;
    z-index: 2;
    transform: translateX(-50%);
    display: inline-flex;
    gap: .5em;
}
.multi-range-slider .split-btn{
    width: 1.5em;
    height: 1.5em;
    text-align: center;
    line-height: 1.5em;
    background: #fff;
    border-radius: 5px;
    display: inline-block;
    box-shadow: 0 3px 5px rgba(0,0,0,.3);
    cursor: pointer;
}
</style>