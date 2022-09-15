<template>
    <div>
        <p class="title">Type your business name</p>
        <input v-model="nameModel" type="text" placeholder="Type business name" class="create-form-input">
    </div>
</template>
<script>
export default {
    data(){
        const businessName = this.$store.state.businessInfo.name
        if(!businessName || !businessName.trim()){
            this.$emit('disallowNext')
        }
        return {
            nameModel: businessName || ""
        }
    },
    watch: {
        nameModel() {
            if(this.nameModel.trim()){
                this.$emit('allowNext')
            }else{
                this.$emit('disallowNext')
            }
            this.$store.commit("updateName", this.nameModel.trim()); 
        }
    }
}
</script>