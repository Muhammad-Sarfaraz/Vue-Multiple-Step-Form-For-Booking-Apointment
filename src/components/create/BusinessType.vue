<template>
    <div>
        <p class="title">Select your business type</p>
        <div class="buniess-types-select">
            <div
             class="buniess-type"
             v-for="(type, index) in businessTypes"
             :key="index"
             :class="{ active: activeIdx == index }"
             @click="handleItemClick(index)"
            >
                {{ type }}
            </div>
            <div
             class="buniess-type"
             :class="{ active: activeIdx == businessTypes.length }"
            >
                <span>Other: </span>
                <input type="text" v-model="otherModel">
            </div>
        </div>
    </div>
</template>

<script>
// import defautCategories from '@/shared/defaultCategories.json' 

export default {
    data(){
        const businessType = this.$store.state.businessInfo.type
        const businessTypes = [
                "Salon",
                "Gym/PT",
                "B&B",
                "Spa/Masseuse",
                "Doctors Surgery",
            ]
        let activeIdx = -1
        let otherModel = ""
        if(businessType){
            const i = businessTypes.indexOf(businessType)
            if(i > -1){
                activeIdx = i
            }else{
                activeIdx = businessTypes.length
                otherModel = businessType
            }
        }else{
            this.$emit('disallowNext')
        }
        return {
            businessTypes,
            activeIdx,
            otherModel, 
        }
    },
    methods: {
        handleItemClick(index) {
            this.activeIdx = index
            this.$store.commit("updateType", this.businessTypes[index]);            
            this.$emit('allowNext')
        }
    },
    watch: {
        otherModel() {
            if(this.otherModel.trim()){
                this.activeIdx = this.businessTypes.length
                this.$store.commit("updateType", this.otherModel.trim());
                this.$emit('allowNext')
            }else{
                this.activeIdx = -1
                this.$emit('disallowNext')
            }
            this.$store.state.businessInfo.type = this.otherModel.trim()
        }
    }
}
</script>

<style>
.buniess-types-select{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2em;
}
.buniess-types-select .buniess-type{
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    padding: 2em 1em;
    border-radius: 10px;
    font-weight: 500;
    cursor: pointer;
    color: rgb(46, 46, 46);
    border: 3px solid #fff;
    transition: border .5s;
    display: flex;
    align-items: center;
    justify-content: center;
}
.buniess-types-select .buniess-type:hover{
    border: 3px solid #fff !important;
}
.buniess-types-select .buniess-type.active,
.buniess-types-select .buniess-type.active:hover{
    border: 3px solid var(--primary-color) !important;
}
.buniess-types-select .buniess-type:last-child input{
    width: 100%;
    flex-grow: 1;
    margin-left: .5em;
    border: none;
    border-bottom: 2px solid rgb(96, 96, 96);
    box-shadow: none;
}

@media(max-width: 768px){
    .buniess-types-select{
        grid-template-columns: 1fr;
    }
}
</style>