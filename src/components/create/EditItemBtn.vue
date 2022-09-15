<template>
    <div>
        <span class="action-btn edit" @click="showModal = true">
            <i class="bi bi-pencil"></i>
        </span>
        <div class="modal-wrapper" v-if="showModal">
            <div class="modal-content wide">
                <i class="bi bi-x modal-close" @click="showModal = false"></i>
                <p class="modal-title">Add Service</p>
                
                <div class="item-name-price">
                    <div class="input-group">
                        <label>Service Name*</label>
                        <input v-model="item.name" type="text" placeholder="Type the item name" class="create-form-input">
                    </div>
                    <div class="input-group">
                        <label>Price</label>
                        <input v-model="item.price" type="number" min="1"  placeholder="0" class="create-form-input">
                    </div>
                </div>

                <div class="item-name-price">
                    <div class="input-group">
                        <label style="height: 2.5em">Number of Employees Required</label>
                        <input v-model="item.employeesRequired" type="number" min="1" placeholder="0" class="create-form-input">
                    </div>
                    <div class="input-group">
                        <label style="height: 2.5em">Maximum Guests</label>
                        <input v-model="item.maximunGuests" type="number" min="1"  placeholder="0" class="create-form-input">
                    </div>
                </div>
                
                <div class="item-name-price">
                    <div class="input-group">
                        <label>Service Duration(Hour)</label>
                        <input v-model="item.duration" type="number" min="1" placeholder="0" class="create-form-input">
                    </div>
                    <div class="input-group">
                        <label>Service Prep-time(Minute)</label>
                        <input v-model="item.perpTime" type="number" min="0" placeholder="0" class="create-form-input">
                    </div>
                </div>

                <div class="input-group">
                    <label>Opening times timeline</label>
                    <MultiRangeSlider
                     :defaultRanges="item.timeRanges"
                     @timeRangeChanged="timeRanges => item.timeRanges = timeRanges"
                    />
                </div>

                <div class="input-group">
                    <label>Have different schedule on specific days?</label>
                    <AddScheduleBtn
                     @addExtraSchedule="addExtraSchedule"
                    />
                    <div
                     class="extra-schedules"
                     v-if="item.extraSchedules.length"
                    >
                        <div
                         v-for="(schedule, index) in item.extraSchedules"
                         :key="index"
                         class="extra-schedule-item"
                        >
                            <p>
                                <b>Days:</b>
                                <span>{{schedule.appliedDays.join(", ")}}</span>
                                <span>
                                    <i @click="deleteExtraSchedule(index)" class="bi bi-trash text-danger cursor-pointer"></i>
                                    <EditScheduleBtn
                                     :schedule="schedule"
                                    />
                                </span>
                            </p>
                            <p>
                                <b>Time ranges:</b>
                                <span>{{schedule.timeRanges.map(r => r.join('-')).join(', ')}}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="input-group">
                    <label style="margin-top: 4em">
                        <span>This service require an intake form: &nbsp; &nbsp;</span>
                        <input v-model="item.intakeFormRequired" type="checkbox">
                    </label>
                    <ImgUpload
                     type="pdf"
                     v-if="item.intakeFormRequired"
                     @result="file => item.intakeForm = file"
                    />
                </div>

                <div class="input-group">
                    <label>Description</label>
                    <textarea v-model="item.description" placeholder="Type the item description" class="create-form-input"></textarea>
                </div>

                <div class="input-group">
                    <label>Item Image</label>
                    <ImgUpload
                     @result="handleImg"
                    />
                </div>

                <div class="input-group">
                    <label>Customize Item</label>
                    <div class="input-w-button">
                        <input
                         type="text"
                         placeholder="Type a customization"
                         class="create-form-input"
                         v-model="customizedItemModel"
                        >
                        <button class="btn" @click="addCustomizedItem">Add</button>
                    </div>
                    <div class="item-options-preview" v-if="item.customizedItems.length">
                        <draggable
                            v-model="item.customizedItems"
                            handle=".handle"
                            itemKey="title"
                        >
                            <template #item="{element: itm, index}">
                                <div
                                >
                                    <p class="item-options-preview-item">
                                        <span>
                                            {{itm.title}}
                                        </span>
                                        <span class="nav">
                                            <CustomizedItemEditBtn
                                            :title="itm.title"
                                            :items="itm.items"
                                            :currencySymbol="currencySymbol"
                                            :range="itm.selectRange"
                                            @updateTitle="title => itm.title = title"
                                            @selectRangeChanged="selectRange => itm.selectRange = selectRange"
                                            @save="items => itm.items = items"
                                            />
                                            <span class="delete" @click="deleteCustomizedItem(index)">Delete</span>
                                            <svg class="handle" width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_6_2)">
                                                <rect width="16" height="20" fill="white"/>
                                                <path d="M5 5.25C5.41421 5.25 5.75 4.91421 5.75 4.5C5.75 4.08579 5.41421 3.75 5 3.75C4.58579 3.75 4.25 4.08579 4.25 4.5C4.25 4.91421 4.58579 5.25 5 5.25Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M5 10.75C5.41421 10.75 5.75 10.4142 5.75 10C5.75 9.58579 5.41421 9.25 5 9.25C4.58579 9.25 4.25 9.58579 4.25 10C4.25 10.4142 4.58579 10.75 5 10.75Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M5 16.25C5.41421 16.25 5.75 15.9142 5.75 15.5C5.75 15.0858 5.41421 14.75 5 14.75C4.58579 14.75 4.25 15.0858 4.25 15.5C4.25 15.9142 4.58579 16.25 5 16.25Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M11 5.25C11.4142 5.25 11.75 4.91421 11.75 4.5C11.75 4.08579 11.4142 3.75 11 3.75C10.5858 3.75 10.25 4.08579 10.25 4.5C10.25 4.91421 10.5858 5.25 11 5.25Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M11 10.75C11.4142 10.75 11.75 10.4142 11.75 10C11.75 9.58579 11.4142 9.25 11 9.25C10.5858 9.25 10.25 9.58579 10.25 10C10.25 10.4142 10.5858 10.75 11 10.75Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M11 16.25C11.4142 16.25 11.75 15.9142 11.75 15.5C11.75 15.0858 11.4142 14.75 11 14.75C10.5858 14.75 10.25 15.0858 10.25 15.5C10.25 15.9142 10.5858 16.25 11 16.25Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_6_2">
                                                <rect width="16" height="20" fill="white"/>
                                                </clipPath>
                                                </defs>
                                            </svg>
                                        </span>
                                    </p>

                                    <div>
                                        <div
                                        class="item-options-preview-item sub"
                                        v-for="(element, key) in itm.items"
                                        :key="key"
                                        >
                                            <span>
                                                {{element.title}}
                                            </span>
                                            <span class="nav">
                                                <span v-if="element.price">{{element.price > 0 ? '+' : '-'}}{{currencySymbol}}{{Math.abs(element.price)}}</span>
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </template>
                        </draggable>  
                    </div>
                </div>

                <div class="modal-footer">
                    <button class="btn txt" @click="showModal = false">Cancel</button>
                    <button class="btn" @click="handleClick" :disabled="!item.name.trim()">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import ImgUpload from '@/components/ImgUpload'
import CustomizedItemEditBtn from '@/components/create/CustomizedItemEditBtn'
import MultiRangeSlider from '@/components/MultiRangeSlider'
import AddScheduleBtn from './AddScheduleBtn.vue'
import EditScheduleBtn from './EditScheduleBtn.vue'

const defaultItem = {
        name: '',
        price: null,
        description: '',
        image: '',
        tags: [],
        selectRange: [0, 1],
        timeRanges: [[0, 12], [13, 24]],
        customizedItems: [],
        intakeFormRequired: false,
        intakeForm: null,
        perpTime: 0,
        extraSchedules: []
    }

export default {
    props: [
        'currencySymbol',
        'category',
        'itemId'
    ],
    components: {
        ImgUpload,
        CustomizedItemEditBtn,
        draggable,
        MultiRangeSlider,
        AddScheduleBtn,
        EditScheduleBtn
    },
    data() {
        let itemData = this.$store.state.businessInfo.items[this.category][this.itemId]
        if(itemData){
            itemData = JSON.parse(JSON.stringify(itemData))
        }

        itemData = {...defaultItem, ...itemData}

        let oldName = itemData ? itemData.name : ''
        return {
            showModal: false,
            item: itemData || {...defaultItem},
            oldName,
            customizedItemModel: "",
            
        }
    },
    watch: {
        'item.price': function(){
            let price = parseFloat(this.item.price)
            if(price > 0) return
            this.item.price = null
        }
    },
    methods: {
        handleImg(img){
            if(img){
                this.item.image = img
            }else{
                this.item.image = ''
            }
        },
        handleClick(){
            let data = {...this.item}
            this.$emit('add', data)
            this.item = {...defaultItem}
            this.item.options = []
            this.item.additions = []
            this.item.tags = []
            this.item.customizedItems = []
            this.item.extraSchedules = []
            this.showModal = false
        },
        addCustomizedItem(){
            if(!this.customizedItemModel.trim()) return
            this.item.customizedItems.push({
                title: this.customizedItemModel.trim(),
                items: [],
                selectCount: 'all'
            })
            this.customizedItemModel = ""
        },
        deleteCustomizedItem(index){
            this.item.customizedItems.splice(index, 1)
        },
        deleteCustomizedSubItem(index, subindex){
            this.item.customizedItems[index].items.splice(subindex, 1)
        },
        addExtraSchedule(schedule){
            this.item.extraSchedules.push(schedule)
        },
        deleteExtraSchedule(index){
            this.item.extraSchedules.splice(index, 1)
        }
    }
}
</script>