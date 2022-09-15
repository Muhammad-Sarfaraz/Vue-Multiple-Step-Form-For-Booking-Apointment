<template>
    <span class="cursor-pointer" @click="showModal = true">
        <i class="bi bi-pencil" style="color: var(--primary-color)"></i>
    </span>
    <div class="modal-wrapper" v-if="showModal">
        <div class="modal-content wide">
            <i class="bi bi-x modal-close" @click="showModal = false"></i>
            <p class="modal-title">Add New Schedule</p>
            
            <div class="input-group">
                <label>Days the schedule is applicabale for:</label>
                <div class="available-services">
                    <div
                        v-for="(day, index) in weekDays"
                        :key="index"
                        class="available-services-item"
                        :class="{'active': day.selected}"
                        @click="day.selected = !day.selected"
                    >
                        {{day.day}}
                    </div>
                </div>
            </div> 

            <div class="input-group">
                <label>Opening Times of selected days:</label>
                <MultiRangeSlider
                    :defaultRanges="schedule.timeRanges"
                    @timeRangeChanged="timeRanges => schedule.timeRanges = timeRanges"
                />
            </div>

            <p class="text-danger mt-2" v-if="err">{{err}}</p>

            <div class="modal-footer" style="margin-top: 6em">
                    <button class="btn txt" @click="showModal = false">Cancel</button>
                    <button class="btn" @click="handleClick">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
import MultiRangeSlider from '@/components/MultiRangeSlider'

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => ({
                day,
                selected: false
            }))

export default {
    components: {
        MultiRangeSlider
    },
    emits: ['addExtraSchedule'],
    props: ['schedule'],
    data() {
        return {
            showModal: false,
            weekDays: weekDays.map(day => ({
                ...day,
                selected: this.schedule.appliedDays.includes(day.day)
            })),
            err: ""
        }
    },
    methods: {
        handleClick(){
            this.err = ""

            this.schedule.appliedDays = this.weekDays
                                        .filter(day => day.selected)
                                        .map(day => day.day)
            if(this.schedule.appliedDays.length == 0){
                this.err = "Please select at least one day"
                return
            }
            this.$emit('addExtraSchedule', this.schedule)
            this.showModal = false

        }
    }
}
</script>