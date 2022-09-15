<template>
    <span>
        <span class="edit" @click="showModal = true">Edit</span>
        <div class="modal-wrapper" v-if="showModal">
            <div class="modal-content">
                <i class="bi bi-x modal-close" @click="showModal = false"></i>
                <p class="modal-title" v-if="!editingTitle">
                    <span>{{title}}</span>
                    <i class="bi bi-pencil ml-2 cursor-pointer" @click="editingTitle = true"></i>
                </p>
                <div class="input-group mt-2" v-else>
                    <div class="input-w-button">
                        <input v-model="titleModel" type="text" placeholder="Type a customization" class="create-form-input">
                        <button class="btn" @click="saveTitle" :disabled="!titleModel.trim()">Done</button>
                    </div>
                </div>
                
                <div class="input-group">
                    <div class="input-w-button">
                        <input v-model="subItemModel" type="text" placeholder="Type a sub-customization" class="create-form-input">
                        <input v-model="subItemPriceModel" type="number" placeholder="0" class="create-form-input num">
                        <button class="btn" @click="saveSubItem">Add</button>
                    </div>

                    <div
                     class="item-options-preview"
                     v-if="items.length > 0"
                    >
                        <!-- <div
                            class="item-options-preview-item"
                            v-for="(itm, index) in items"
                            :key="index"
                        >
                            <span>
                                {{itm.title}}
                            </span>
                            <span>
                                <span v-if="itm.price">{{itm.price > 0 ? '+' : '-'}}{{currencySymbol}}{{Math.abs(itm.price)}}</span>
                                <span class="delete" @click="handleDelete(index)">Delete</span>
                            </span>
                        </div> -->
                        <draggable
                            v-model="items"
                            handle=".handle"
                            @change="handleChange"
                            item-key="title"
                        >
                            <template #item="{element, index}">
                                <div
                                class="item-options-preview-item"
                                >
                                    <span>
                                        {{element.title}}
                                    </span>
                                    <span class="nav">
                                        <span v-if="element.price">{{element.price > 0 ? '+' : '-'}}{{currencySymbol}}{{Math.abs(element.price)}}</span>
                                        <span class="delete" @click="handleDelete(index)">Delete</span>
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
                                </div>
                            </template>
                        </draggable>
                    </div>

                </div>

                <div class="input-group">
                    <label>How many of the above can be selected?*</label>
                    <p class="select-range-info">
                        Use this slider to control the number of sub-customisations your customers can select.
                        <br><br>
                        Drag the left slider to set the minimum number the user can select.
                        *E.g. if at least one must be selected, drag the slider to 1.*
                        <br><br>
                        Drag the right slider to set the maximum number the user can select.
                        *E.g. if all can be selected at once, drag the slider to the farthest right.*
                    </p>
                    <div class="slider-container">
                        <Slider
                         v-model="selectRange"
                         :min="selectMin"
                         :max="selectMax"
                        />
                    </div>
                </div>

                <div class="modal-footer">
                    <button class="btn txt" @click="showModal = false">Close</button>
                    <button class="btn" @click="handleSave">Save</button>
                </div>
            </div>
        </div>
    </span>
</template>

<script>
import draggable from 'vuedraggable'
import Slider from '@vueform/slider'
export default {
    props: ['title', 'items', 'currencySymbol', 'range'],
    components: {
        draggable,
        Slider
    },
    data(){
        return {
            titleModel: new String(this.title),
            showModal: false,
            subItemModel: '',
            subItemPriceModel: null,
            editingTitle: false,
            selectRange: this.range || [0, 1],
            selectMin: 0,
            selectMax: this.items.length || 1
        }
    },
    watch: {
        selectCount(){
            this.$emit('selectCountChanged', this.selectCount)
        },
        items: {
            handler(){
                this.selectMax = this.items.length || 1
                if(this.selectRange[1] > this.selectMax){
                    this.selectRange[1] = this.selectMax
                }
                if(this.selectRange[0] >= this.selectMax){
                    this.selectRange[0] = Math.max(0, this.selectMax - 1)
                }
            },
            deep: true
        },
        selectRange: {
            handler(){
                if(this.selectRange[1] < 1){
                    this.selectRange[1] = 1
                }
                this.$emit('selectRangeChanged', this.selectRange)
            },
            deep: true
        }
    },
    methods: {
        handleSave(){
            this.showModal = false
        },
        saveSubItem(){
            if(!this.subItemModel.trim()) return
            this.items.push({
                title: this.subItemModel.trim(),
                price: this.subItemPriceModel || 0
            })
            this.subItemModel = ""
            this.subItemPriceModel = null
        },
        handleDelete(index){
            this.items.splice(index, 1) 
        },
        saveTitle(){
            if(!this.titleModel.trim()) return
            this.$emit('updateTitle', this.titleModel.trim())
            this.editingTitle = false
        },
        handleChange(){
            this.$emit('save', this.items)
        }
    }
}
</script>

<style>
.selection-counts{
    display: flex;
    gap: 1em;
    flex-wrap: wrap;
}
.selection-items{
    height: 3.5em;
    width: 3.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    background-color: transparent;
    text-transform: uppercase;
}
.selection-items:hover{
    background-color: #ccd1fd;
    color: #5261f5
}
.selection-items.active{
    background-color: #ccd1fd;
    color: #5261f5;
    border-color: #5261f5;
}
</style>

<style scoped>
.select-range-info{
    font-size: .8em;
    color: #999;
}
</style>