<template>
    <PhoneMockUp>
        <div class="phone-screen-main">
            <div class="phone-navbar">
                <img :src="$store.state.businessInfo.logo" alt="" class="logo">
                <i class="bi bi-list"></i>
            </div>
            <div class="phone-banner">
                <img :src="$store.state.businessInfo.banner" alt="">
            </div>
            <p class="brand-name-preview">{{ $store.state.businessInfo.name }}</p>
            <div class="phone-container">
                <div class="phone-info">
                    <p v-if="$store.state.businessInfo.socials.website">
                        <i class="bi bi-globe"></i> 
                        {{ $store.state.businessInfo.socials.website }}
                    </p>
                    <br>
                    <p v-if="$store.state.businessInfo.socials.instagram">
                        <i class="bi bi-instagram"></i> 
                        {{ $store.state.businessInfo.socials.instagram }}
                    </p>
                    <br>
                    <p v-if="$store.state.businessInfo.socials.facebook">
                        <i class="bi bi-facebook"></i> 
                        {{ $store.state.businessInfo.socials.facebook }}
                    </p>
                    <br>
                    <p v-if="$store.state.businessInfo.socials.youtube">
                        <i class="bi bi-youtube"></i> 
                        {{ $store.state.businessInfo.socials.youtube }}
                    </p>
                    <br>
                    <br>


                    <p v-if="$store.state.businessInfo.uberLink">
                        <i class="bi bi-truck"></i> 
                        {{ $store.state.businessInfo.uberLink }}
                    </p>
                    <br>
                    <!-- <p>
                        <i class="bi bi-geo-alt"></i> 
                        {{ $store.state.businessInfo.info.address }} 
                        {{ $store.state.businessInfo.info.city }} 
                        {{ $store.state.businessInfo.info.country }} 
                        {{ $store.state.businessInfo.info.state }} 
                        {{ $store.state.businessInfo.info.zipcode }}
                    </p>
                    <br>
                    <p v-if="$store.state.businessInfo.info.phone">
                        <i class="bi bi-telephone-fill"></i> 
                        {{ $store.state.businessInfo.info.phone }}
                    </p> -->
                </div>
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

<style>
.phone-container{
    padding: 1em;
}
</style>