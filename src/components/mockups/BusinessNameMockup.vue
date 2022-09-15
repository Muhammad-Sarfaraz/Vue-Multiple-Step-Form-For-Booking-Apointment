<template>
    <PhoneMockUp>
        <div class="phone-screen-main">
            <div class="phone-navbar">
                <img :src="$store.state.businessInfo.logo" alt="" class="logo">
            </div>
            <p class="brand-name-preview">{{ $store.state.businessInfo.name }}</p>
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