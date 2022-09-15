<template>
    <span>
        <i class="bi bi-pencil" @click="showModal = true"></i>
        <div class="modal-wrapper" v-if="showModal">
            <div class="modal-content">
                <i class="bi bi-x modal-close" @click="showModal = false"></i>
                <p class="modal-title">Add options to the group</p>
                
                <div>
                    <div
                     v-for="(item, index) in items"
                     :key="index"
                     class="options-group-item"
                    >
                        <input
                         type="checkbox"
                         name="inputs-options-group"
                         :value="item"
                         v-model="itemsModel"
                        >
                        <span>{{item}}</span>
                    </div>
                </div>

                <div class="modal-footer">
                    <button class="btn txt" @click="showModal = false">Cancel</button>
                    <button class="btn" @click="handleSave">Save</button>
                </div>
            </div>
        </div>
    </span>
</template>

<script>
export default {
    props: ['options', 'model'],
    data(){
        return {
            showModal: false,
            items: this.options.map(o => o.title),
            itemsModel: this.model.map(o => o.title)
        }
    },
    methods: {
        handleSave(){
            const items = this.options.filter(o => this.itemsModel.includes(o.title))
            this.$emit('itemsUpdate', items)
            this.showModal = false
        }
    }
}
</script>

<style>
.options-group-item{
    margin-bottom: .5em;
}
.options-group-item input{
    margin-right: 1em;
}
</style>