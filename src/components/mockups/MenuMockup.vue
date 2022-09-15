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
            <div class="phone-menus">
                <div
                 v-for="(menu, index) in $store.state.businessInfo.categories"
                 :key="index"
                >
                    {{ menu }}
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
.phone-screen-main{
    padding-top: 20px;
}
.phone-screen-main .phone-navbar{
    z-index: 9;
    /* height: 40px; */
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .25em 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    position: relative;
}
.phone-navbar .logo{
    max-width: 95%;
    max-height: var(--mockup-logo-size);
    /* position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 5px */
}

.phone-banner{
    height: 150px;
    position: relative;
}
.phone-banner p{
    position: absolute;
    bottom: 0;
    left: 0;
    top: 50%;
    transform: translateY(-20%);
    width: 100%;
    color: white;
    font-size: 1.5em;
    padding: 0 1em;
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
}
.phone-banner img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.phone-menus > div{
    padding: 1.5em 1em;
    font-weight: 500;
}
.phone-menus > div:not(:last-child){
    border-bottom: 1px solid rgb(54, 54, 54);
}

.brand-name-preview{
    padding: .5em;
    font-size: 1.5em;
    font-weight: 600;
}
</style>