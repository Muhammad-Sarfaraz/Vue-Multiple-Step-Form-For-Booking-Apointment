<template>
    <div>
        <p class="title">Do you have an Uber Eats account?</p>
        <div class="buniess-types-select">
            <div
             class="buniess-type"
             :class="{active: hasUber}"
             @click="hasUber = true"
            >
                <span>Yes</span>
            </div>
            <div
             class="buniess-type"
             :class="{active: !hasUber}"
             @click="handleNoUber"
            >
                <span>No</span>
            </div>
        </div>
        <div class="mt-2" v-if="hasUber">
            <p class="title">Paste your Uber Eats URL</p>
            <input v-model="linkModel" placeholder="Insert Uber Eats URL" type="text" class="create-form-input">
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        hasUber: false,
        linkModel: ""
    }),
    methods: {
        handleNoUber(){
            this.hasUber = false
            this.$store.state.businessInfo.uberLink = ""
            this.$emit('next')
        }
    },
    watch: {
        linkModel(){
            if(this.hasUber && !this.linkModel.trim()){
                this.$emit('disallowNext')
            }
            if(this.hasUber && this.linkModel.trim()){
                this.$emit('allowNext')
                this.$store.state.businessInfo.uberLink = this.linkModel.trim()
            }
        },
        hasUber(){
            if(this.hasUber && !this.linkModel.trim()){
                this.$emit('disallowNext')
            }
        }
    }
}
</script>
