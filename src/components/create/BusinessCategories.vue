<template>
    <div class="business-categories-form form">
        <p class="title">Select your categories</p>
        <p class="subtitle">Select or add categories</p>
        <form @submit.prevent="handleSubmit" class="category-input">
            <input placeholder="Type a category name" type="text" class="create-form-input" v-model="catrgoryInput">
            <button class="btn" type="submit">
                Add
            </button>
        </form>
        <div class="categories-container">
            <draggable
             v-model="categories"
             handle=".handle"
            >
                <template #item="{element, index}">
                    <div
                    class="category"
                    >
                        
                        <span class="d-flex">
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
                            <span class="form">
                                <input type="checkbox" name="categoris-cb" v-model="element.selected" :value="element.title">
                                <div>
                                    <p class="text">{{ element.title }}</p>
                                    <CategoryEditBtn
                                        :category="element.title"
                                        @update="val => updateCategory(val, index)"
                                    >
                                        <p class="category-add-info"><u>Add</u> category photo & description</p>
                                    </CategoryEditBtn>
                                </div>
                            </span>
                        </span>
                        <span class="d-flex">
                            <CategoryEditBtn
                                :category="element.title"
                                @update="val => updateCategory(val, index)"
                            >
                                <span class="action edit">Edit</span>
                            </CategoryEditBtn>
                            <span class="action delete" @click="deleteItem(index)">
                                <i class="bi bi-x-circle-fill"></i>
                            </span>
                        </span>
                    </div>
                </template>
            </draggable>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import defautCategories from '@/shared/defaultCategories.json'
import CategoryEditBtn from './CategoryEditBtn.vue'

export default {
    components: {
    draggable,
    CategoryEditBtn
},
    data(){
        const saved = this.$store.state.businessInfo.categories
        const cat = this.$store.state.businessInfo.type 

        if(saved && saved.length > 0 && cat){
            let categories = defautCategories[cat]
                                .filter(el => saved.includes(el))
                                .map(c => ({
                                    title: c,
                                    selected: true
                                }))
            return {
                categories,
                catrgoryInput: ""
            }
        }else{
            this.$emit('disallowNext')
        }
        
        let categories = [
            {
                title: "Heath & Beauty",
                selected: true
            },
            {
                title: "Massage",
                selected: true
            },
            {
                title: "Spa",
                selected: true
            }
        ]

        if(defautCategories[cat]){
            categories = defautCategories[cat].map(c => ({
                title: c,
                selected: true
            }))
        }

        return {
            categories,
            catrgoryInput: ""
        }
    },
    methods: {
        handleSubmit() {
            if(!this.catrgoryInput.trim()) return
            this.categories.push({
                title: this.catrgoryInput,
                selected: true
            })
            this.catrgoryInput = ""
        },
        deleteItem(index) {
            delete this.$store.state.businessInfo.categoriesData[this.categories[index]]
            this.categories.splice(index, 1)
        },
        initEdit(index) {
            this.editIdx = index
            this.editModel = this.categories[index].title
        },
        updateCategory(val, idx){
            this.categories[idx].title = val
        },
        populateCategories() {
            let selected = this.categories.filter(cat => cat.selected).map(cat => cat.title)
            if(!selected.length){
                this.$emit('disallowNext')
            }else{

                this.$emit('allowNext')
            } 
            this.$store.commit('updateCategories', selected)
        }
    },
    created(){
        this.populateCategories()
    },
    watch: {
        categories: {
            handler(){
                this.populateCategories()
            },
            deep: true
        }
    }
}
</script>

<style>
.form .subtitle{
    margin-top: -2em;
    margin-bottom: 1.5em;
}
.category-input{
    display: flex;
}
.category-input .btn{
    min-width: auto;
    border-radius: 0 5px 5px 0;
}
.category-input .create-form-input{
    border-radius: 5px 0 0 5px;
    max-width: 250px;
}

.categories-container{
    border: 1px solid rgb(101, 101, 101);
    border-radius: 5px;
    margin-top: 2em;
}
.categories-container .category{
    padding: 1em;
    display: flex;
    gap: 1em;
    align-items: center;
    justify-content: space-between;
}
.categories-container .category .handle{
    cursor: move;
    margin-right: .75em;
}
.categories-container .category:not(:last-child){
    border-bottom: 1px solid rgb(101, 101, 101);
}
.categories-container .category input[type="checkbox"]{
    margin-right: .5em;
    accent-color: var(--primary-color);
}
.categories-container .category .action{
    font-size: 1.2em;
    opacity: 0;
    transition: opacity .3s;
}
.categories-container .category:hover .action{
    cursor: pointer;
    opacity: 1;
}
.categories-container .category .action.edit{
    color: var(--primary-color);
}
.categories-container .category .action.delete{
    color: rgb(223, 7, 7);
    margin-left: .5em;
}

.categories-container .category .form{
    display: flex;
    align-items: center;
}
.categories-container .category .form .text{
    font-size: 1.25em;
}
.category-add-info{
    font-size: .8em;
    color: rgb(101, 101, 101);
}
.category-add-info u{
    cursor: pointer;
}
</style>