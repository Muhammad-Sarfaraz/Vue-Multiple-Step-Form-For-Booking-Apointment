<template>
    <PhoneMockUp>
        <div class="logo-mockup">
            <img src="@/assets/logo.png" alt="">
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
.logo-mockup{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.logo-mockup img{
    width: 45%;
}
</style>