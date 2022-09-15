<template>
    <span class="cursor-pointer ml-05" @click="showModal = true">
        <i class="bi bi-pencil" style="color: var(--primary-color)"></i>
    </span>
    <div class="modal-wrapper" v-if="showModal">
        <div class="modal-content wide">
            <i class="bi bi-x modal-close" @click="showModal = false"></i>
            <p class="modal-title">Edit Employee</p>

            

            <div class="input-group">
                <label>Employee Name</label>
                <input v-model="employee.name" type="text" placeholder="Enter employee name" class="create-form-input">
            </div>
            <div class="input-group">
                <label>Availability</label>
                <MultiRangeSlider
                    :defaultRanges="[...employee.availability]"
                    @timeRangeChanged="timeRanges => employee.availability = timeRanges"
                />
            </div>
            <div class="input-group">
                <label>Services</label>
                <div class="available-services">
                    <div
                     v-for="(service, index) in availableServices"
                     :key="index"
                     class="available-services-item"
                     :class="{'active': service.selected}"
                     @click="service.selected = !service.selected"
                    >
                        {{ service.name }}
                    </div>
                </div>
            </div>

            <div class="input-group">
                <label>Have different schedule on specific days?</label>
                <AddScheduleBtn
                    @addExtraSchedule="addExtraSchedule"
                />
                <div
                    class="extra-schedules"
                    v-if="employee.extraSchedules.length"
                >
                    <div
                        v-for="(schedule, index) in employee.extraSchedules"
                        :key="index"
                        class="extra-schedule-item"
                    >
                        <p>
                            <b>Days:</b>
                            <span>{{schedule.appliedDays.join(", ")}}</span>
                            <span>
                                <span>
                                    <i @click="deleteExtraSchedule(index)" class="bi bi-trash text-danger cursor-pointer"></i>
                                    <EditScheduleBtn
                                     :schedule="schedule"
                                    />
                                </span>
                            </span>
                        </p>
                        <p>
                            <b>Time ranges:</b>
                            <span>{{schedule.timeRanges.map(r => r.join('-')).join(', ')}}</span>
                        </p>
                    </div>
                </div>
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
import AddScheduleBtn from './AddScheduleBtn.vue'
import EditScheduleBtn from './EditScheduleBtn.vue'

export default {
    components: {
        MultiRangeSlider,
        AddScheduleBtn,
        EditScheduleBtn
    },
    props: ['employee', 'availableServices'],
    data() {
        return {
            showModal: false,
            err: "",
        }
    },
    created(){
        this.availableServices.forEach(s => {
            s.selected = this.employee.services.includes(s.name)
        })
    },
    methods: {
        handleClick(){
            this.err = ""
            if(!this.employee.name.trim()){
                this.err = 'Please enter employee name'
                return
            }
            this.employee.services = this.availableServices
                                        .filter(service => service.selected)
                                        .map(service => service.name)
            if(!this.employee.services.length){
                this.err = 'Please select at least one service'
                return
            }
            this.$emit('updateEmployee', this.employee)
            this.showModal = false
        },
        addExtraSchedule(schedule){
            this.employee.extraSchedules.push(schedule)
        },
        deleteExtraSchedule(index){
            this.employee.extraSchedules.splice(index, 1)
        }
    }
}
</script>