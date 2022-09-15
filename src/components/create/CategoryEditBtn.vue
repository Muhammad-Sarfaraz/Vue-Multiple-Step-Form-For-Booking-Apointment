<template>
    <!-- <span class="action edit" @click="showModal = true">Edit</span> -->
    <span @click="showModal = true">
        <slot></slot>
    </span>
    <div class="modal-wrapper" v-if="showModal">
        <div class="modal-content">
            <i class="bi bi-x modal-close" @click="showModal = false"></i>
            <p class="modal-title">Edit Category</p>
            <CategoryInfoForm
             :category="category"
             @save="handleSave"
            />
        </div>
    </div>
</template>

<script>
import CategoryInfoForm from './CategoryInfoForm.vue';
export default {
    props: ['category'],
    components: { CategoryInfoForm },
    data: () => ({
        showModal: false
    }),
    methods: {
        handleSave(val){
            this.$emit('update', val)
            this.showModal = false
        }
    }
}
</script>