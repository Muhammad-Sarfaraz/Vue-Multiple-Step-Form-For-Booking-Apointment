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
                    <span>{{ $store.state.businessInfo.socials.website }}</span>
                </p>
                <p v-if="$store.state.businessInfo.socials.instagram">
                    <i class="bi bi-instagram"></i> 
                    <span>{{ $store.state.businessInfo.socials.instagram }}</span>
                </p>
                <p v-if="$store.state.businessInfo.socials.facebook">
                    <i class="bi bi-facebook"></i>
                    <span>{{ $store.state.businessInfo.socials.facebook }}</span>
                </p>
                <p v-if="$store.state.businessInfo.socials.youtube">
                    <i class="bi bi-youtube"></i> 
                    <span>{{ $store.state.businessInfo.socials.youtube }}</span>
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
        '$store.state.businessInfo.socials': {
            handler(items){
                const el = this.$refs.content
                el.parentElement.scrollTop = el.parentElement.scrollHeight
                // el.parentElement.scroll({ top: 99999, behavior: 'smooth' })
            },
            deep: true
        }
    }
}
</script>

<style>
.phone-screen-main{
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>

<style>
.phone-footer{
    background-color: var(--primary-color);
    color: #fff;
    padding: 2em 1em;
    margin-top: auto;
}
.phone-footer p{
    display: flex;
    gap: 1em;
}
.phone-footer p:not(:last-child){
    margin-bottom: 1em;
}

.phone-categories{
    padding: 1em;
    display: flex;
    gap: .75em;
}
.phone-categories > span{
    display: inline-block;
    position: relative;
}
.phone-categories > span::after{
    content: '';
    display: block;
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 3px;
    background: var(--primary-color);
    transition: opacity .5s;
    opacity: 0;
}
.phone-categories > span.active::after{
    opacity: 1;
}
</style>