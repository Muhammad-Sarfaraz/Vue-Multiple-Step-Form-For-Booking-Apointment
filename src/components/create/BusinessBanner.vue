<template>
    <div>
        <p class="title">Upload your banner</p>
        <div>
            <ImgUpload
             @result="handleResult"
             :defaultImg="banner"
            />
        </div>
        <div v-if="bannerImgs.length" class="mt-2">
            <p class="title">Or choose a banner</p>
            <div class="buniess-types-select banner-select">
                <div
                class="buniess-type banner-select-item"
                v-for="(banner, index) in bannerImgs"
                :key="index"
                :class="{ active: activeIdx == index }"
                @click="handleItemClick(banner, index)"
                >
                    <img :src="banner" alt="">
                </div>
            </div>
        </div>
        <div class="mt-2" v-if="uploadedBanners.length">
            <p class="title">Uploaded banners</p>
            <div class="buniess-types-select banner-select">
                <div
                class="buniess-type banner-select-item"
                v-for="(banner, index) in uploadedBanners"
                :key="index"
                :class="{ active: activeUploadedIdx == index }"
                @click="handleUploadedItemClick(banner, index)"
                >
                    <img :src="banner" alt="">
                </div>
            </div>
        </div>
        <BusinessBannerImg
         :key="$store.state.businessInfo.type"
         @bannerImgs="handleBannerImgs"
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
        const bannerImg = this.$store.state.businessInfo.banner || ""
        const bannerIdx = this.$store.state.businessInfo.bannerIdx
        let banner = ""
        let activeIdx = 0

        if(bannerImg && bannerIdx == -1){
            banner = bannerImg
        }

        return {
            activeIdx,
            activeUploadedIdx: -1,
            bannerImgs: [],
            banner,
            uploadedBanners: []
        }
    },
    methods: {
        handleResult(result){
            if(result){ 
                this.$store.commit("updateBanner", result);
                this.activeIdx = -1
                this.$store.state.businessInfo.bannerIdx = -1 
                this.uploadedBanners.push(result)
            }else{
                this.$store.commit("updateBanner", '/create/img/banner.jpg');
                this.activeIdx = 0
                this.$store.state.businessInfo.bannerIdx = 0 
            }
        },
        handleItemClick(img, index){
            this.$store.state.businessInfo.bannerIdx = index
            this.$store.commit("updateBanner", img);  
            this.activeIdx = index
            this.activeUploadedIdx = -1
        },
        handleUploadedItemClick(img, index){
            this.$store.state.businessInfo.bannerIdx = index
            this.$store.commit("updateBanner", img);  
            this.activeIdx = -1
            this.activeUploadedIdx = index
        },
        handleBannerImgs({img, idx}){
            this.activeIdx = idx
            this.bannerImgs = img
        }
    }
    
}
</script>

<style>
.banner-select-item{
    padding: .25em !important;
    height: 100px;
    overflow: hidden;
}
.banner-select-item img{
    width: 100%;
    display: block;
    height: 100%;
    object-fit: cover;
    border-radius: 3px;
}
</style>