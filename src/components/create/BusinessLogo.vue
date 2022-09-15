<template>
    <div>
        <!-- <p class="skip-text">
            <span>Skip to <u @click="$emit('skipToSignup')">sign up</u> and create menu later</span>
        </p> -->
        <p class="title">Upload your logo</p>
        <div>
            <ImgUpload
             @result="handleResult"
             :defaultImg="logoImg"
            />
        </div>
        <div class="mt-2">
            <p class="title">Choose logo size</p>
            <div class="buniess-types-select">
                <div
                 class="buniess-type"
                 v-for="(type, index) in alignments"
                 :key="index"
                 :class="{active: alignIdx == index}"
                 @click="handleClick(type.value, index)"
                >
                    {{ type.title }}
                </div>
            </div>
        </div>
        <BusinessBannerImg
         :key="$store.state.businessInfo.type"
        />
    </div>
</template>


<script>
import ImgUpload from '@/components/ImgUpload.vue'
import BusinessBannerImg from '@/components/create/BusinessBannerImg.vue'

export default {
    components: {
        ImgUpload,
        BusinessBannerImg
    },
    data(){
        const alignments = [
                {
                    title: "small",
                    value: "2.5em"
                },
                {
                    title: "medium",
                    value: "3em"
                },
                {
                    title: "large",
                    value: "3.5em"
                }
            ]
        let alignIdx = 0
        let logoImg = ""

        const logo = this.$store.state.businessInfo.logo
        if(logo && logo != "/create/img/logo.png"){
            logoImg = logo
        }

        const logoSize = this.$store.state.businessInfo.logoSize
        if(logoSize){
            alignIdx = alignments.findIndex(item => item.value == logoSize)
        }

        return {
            alignments,
            alignIdx,
            logoImg
        }
    },
    methods: {
        handleResult(result){
            if(result){
                this.$store.commit("updateLogo", result);  
            }else{
                //  base64 data image
                this.$store.commit("updateLogo", "/create/img/logo.png");  
            }
        },
        handleClick(val, index){
            this.alignIdx = index
            this.$store.commit("updateLogoSize", val);
            document.documentElement.style.setProperty('--mockup-logo-size', val)
        }
    }
}
</script>

<style scoped>
.skip-text{
    margin-bottom: 1em;
    text-align: right;
}
.skip-text span u{
    
    color: var(--primary-color);
    cursor: pointer;
}
</style>