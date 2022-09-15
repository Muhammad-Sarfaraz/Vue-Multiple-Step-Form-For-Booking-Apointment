<template>
    <div class="add-category-items__items-container">
        <input type="text" placeholder="Enter category name" class="create-form-input mb-1" v-model="categoryModel">
        <textarea class="create-form-input" placeholder="Enter category description" v-model="description"></textarea>
        <ImgUpload
         @result="handleImg"
         :defaultImg="img"
        />
        <p class="save-btn" @click="saveCategoryInfo">
            <button class="btn">Save</button>
        </p>
    </div>
</template>

<script>
import ImgUpload from '@/components/ImgUpload'

export default {
    props: ['category'],
    data(){
        console.log();
        let data = this.$store.state.businessInfo.categoriesData[this.category] || {}
        return {
            description: '',
            img: null,
            ...data,
            oldCategory: this.category,
            categoryModel: this.category
        }
    },
    computed: {
        hasData() {
            return this.$store.state.businessInfo.categoriesData[this.category]
        }
    },
    components: {
        ImgUpload
    }, 
    methods: {
        handleImg(img) {
            this.img = img;
        },
        saveCategoryInfo(){
            if(!this.categoryModel.trim()) return
            
            this.$store.state.businessInfo.categoriesData[this.categoryModel] = {
                description: this.description,
                img: this.img,
            }

            console.log(this.oldCategory, this.categoryModel);
            if(this.oldCategory.trim() != this.categoryModel.trim()){
                delete this.$store.state.businessInfo.categoriesData[this.oldCategory]
            }
            
            this.$toast.success('Category info saved')
            this.$emit('save', this.categoryModel)
        }
    },
}
</script>

<style scoped>
.mb-1{
    margin-bottom: 1em;
}

textarea{
    margin-bottom: 1em;
    resize: vertical;
}
textarea::placeholder{
    color: rgb(153, 153, 153);
    padding: 0;
}
.save-btn{
    margin-top: 1em;
    text-align: right;
}
</style>