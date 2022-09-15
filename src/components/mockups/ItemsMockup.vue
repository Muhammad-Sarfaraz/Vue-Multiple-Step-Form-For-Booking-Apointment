<template>
    <PhoneMockUp>
        <div ref="content" class="phone-screen-main items-mockup">
            <div class="phone-navbar">
                <img :src="$store.state.businessInfo.logo" alt="" class="logo">
            </div>
            <div class="phone-banner">
                <img :src="$store.state.businessInfo.banner" alt="">
            </div>
            <p class="brand-name-preview">{{ $store.state.businessInfo.name }}</p>
            <div class="phone-container">

                <div
                v-for="(category, index) in categories"
                :key="index"
                class="phone-items"
                >
                    <p class="category-title">{{ category }}</p>
                    <div v-if="$store.state.businessInfo.categoriesData[category]">
                        <p class="category-description">{{ $store.state.businessInfo.categoriesData[category].description }}</p>
                        <img class="category-banner" v-if="$store.state.businessInfo.categoriesData[category].img" :src="$store.state.businessInfo.categoriesData[category].img" alt="">
                    </div>

                    <div v-if="$store.state.businessInfo.items[category] && $store.state.businessInfo.items[category].length" class="preview-menu-items">
                        <MenuItem
                         v-for="(item, idx) in $store.state.businessInfo.items[category]"
                         :key="idx"
                         :item="item"
                        />
                    </div>
                </div>
            </div>
            <div class="phone-footer" :style="{backgroundColor: $store.state.businessInfo.color}">
                <p v-if="$store.state.businessInfo.socials.website">
                    <i class="bi bi-globe"></i> 
                    {{ $store.state.businessInfo.socials.website }}
                </p>
                <p v-if="$store.state.businessInfo.socials.instagram">
                    <i class="bi bi-instagram"></i> 
                    {{ $store.state.businessInfo.socials.instagram }}
                </p>
                <p v-if="$store.state.businessInfo.socials.facebook">
                    <i class="bi bi-facebook"></i>
                    {{ $store.state.businessInfo.socials.facebook }}
                </p>
                <p v-if="$store.state.businessInfo.socials.youtube">
                    <i class="bi bi-youtube"></i> 
                    {{ $store.state.businessInfo.socials.youtube }}
                </p>
            </div>
        </div>
    </PhoneMockUp>
</template>
<script>
import PhoneMockUp from '@/components/PhoneMockUp'
import MenuItem from '@/components/mockups/MenuItem'

export default {
    components: {
        PhoneMockUp,
        MenuItem
    },
    computed: {
        categories(){
            return this.$store.state.businessInfo.categories
        }
    },
    watch: {
        '$store.state.businessInfo': {
            handler(items){
                this.scrollToBottom()
            },
            deep: true
        }
    },
    methods: {
        scrollToBottom(){
            const el = this.$refs.content
            el.parentElement.scrollTop = el.parentElement.scrollHeight
        }
    }
}
</script>

<style>
.phone-items{
    margin-bottom: 1em
}
.phone-items .category-title{
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: .5em
}

.preview-menu-items > div:not(:last-child){
    margin-bottom: 1em;
}

.category-description{
    margin-top: -.5em;
    color: rgb(155, 154, 154);
    font-weight: light;
    margin-bottom: .75em;
}
.category-banner{
    width: 100%;
    height: 115px;
    aspect-ratio: 16/9;
    object-fit: cover;
    margin-bottom: 1em;
}
</style>