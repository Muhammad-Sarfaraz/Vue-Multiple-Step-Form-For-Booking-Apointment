<template>
    <PhoneMockUp>
        <div class="phone-screen-main">
            <div class="phone-navbar">
                <img :src="$store.state.businessInfo.logo" alt="" class="logo">
            </div>
            <div class="phone-banner">
                <img :src="$store.state.businessInfo.banner" alt="">
            </div>
            <p class="brand-name-preview">{{ $store.state.businessInfo.name }}</p>
            
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

export default {
    components: {
        PhoneMockUp
    }
}
</script>