<template>
    <div>
        <p class="title">Add Employees</p>
        <div class="add-employee-form" :key="employees.length">
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
            <button class="btn block mt-2" @click="handleClick">Add Employee</button>
        </div>
        <p v-if="!employees.length" class="text-center text-grey mt-2">No employees added yet...</p>
        <div v-else class="employees-container">
            <p class="title">Employees</p>
            <div
                v-for="(e, index) in employees"
                :key="index"
                class="employee-item"
            >
                <p class="employee-item-title">
                    <span>{{e.name}}</span>
                    <span>
                        <i class="bi bi-trash text-danger cursor-pointer" @click="deleteEmployee(index)"></i>
                        <EditEmployee
                         :employee="e"
                         :availableServices="availableServices"
                         @updateEmployee="v => employees[index] = v"
                        />
                    </span>
                </p>
                <p class="employee-item-services">
                    {{e.services.join(', ')}}
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import MultiRangeSlider from '@/components/MultiRangeSlider'
import AddScheduleBtn from './AddScheduleBtn.vue'
import EditScheduleBtn from './EditScheduleBtn.vue'
import EditEmployee from './EditEmployee.vue'

const employeeModel = {
    name: '',
    availability: [[0, 24]],
    services: [],
    extraSchedules: []
}

export default {
    components: {
        MultiRangeSlider,
        AddScheduleBtn,
        EditScheduleBtn,
        EditEmployee
    },
    data(){
        const employees = this.$store.state.businessInfo.employees || []
        if(!employees.length){
            this.$emit('disallowNext')
        }
        return {
            employee: {...employeeModel},
            employees,
            availableServices: [],
            err: ''
        }
    },
    created(){
        this.loadAvailableServices()
    },
    watch: {
        employees: {
            handler(){
                if(this.employees.length){
                    this.$emit('allowNext')
                }else{
                    this.$emit('disallowNext')
                }
                this.$store.state.businessInfo.employees = this.employees
            },
            deep: true
        },
        '$store.state.businessInfo.items': {
            handler(){
                this.loadAvailableServices()
            },
            deep: true
        }
    },
    methods: {
        loadAvailableServices(){
            const items = this.$store.state.businessInfo.items
            const services = Object.keys(items)
                                .map(key => items[key].map(i => ({
                                    name: i.name,
                                    selected: false
                                })))
                                .flat()
            this.availableServices = services
        },
        handleClick(){
            this.err = ''
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
            this.employees.push(this.employee)
            this.employee = {...employeeModel}
            this.employee.extraSchedules = []
            this.availableServices.forEach(service => service.selected = false)
        },
        deleteEmployee(index){
            this.employees.splice(index, 1)
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

<style>
.add-employee-form{
    padding: 2em;
    /* border-radius: 3px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1), 0 0 3px rgba(0,0,0,0.1);
    background: rgb(252, 253, 255);
    border-left: 10px solid var(--primary-color); */
    border: 2px solid var(--primary-color);
    border-radius: 10px;
    background: rgb(252, 253, 255);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1), 0 0 3px rgba(0,0,0,0.1);
    margin-top: -1.5em;
}


.available-services{
    display: flex;
    gap: 1em;
    flex-wrap: wrap;
    margin-top: .5em;
}
.available-services-item{
    border-radius: 50px;
    padding: .65em 1em;
    box-shadow: 0 5px 10px rgba(0,0,0,0.1), 0 0 3px rgba(0,0,0,0.05);
    cursor: pointer;
    font-weight: 700;
    border: 2px solid transparent;
    user-select: none;
    transition: all .1s ease-in-out;
}
.available-services-item.active{
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    box-shadow: 0 7px 12px rgba(0,0,0,0.1), 0 0 3px rgba(0,0,0,0.05);
}

.employees-container{
    margin-top: 3em;
}
.employees-container .title{
    margin-bottom: 1em !important;
}
.employee-item{
    padding: 1.25em;
    border-radius: 7px;
    margin-bottom: 1.5em;
    box-shadow: 0 7px 12px rgba(0,0,0,0.1), 0 0 3px rgba(0,0,0,0.1);
}
.employee-item-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: .5em;
    font-size: 1.2em;
}
.employee-item-services{
    color: rgb(170, 170, 170);
}
</style>