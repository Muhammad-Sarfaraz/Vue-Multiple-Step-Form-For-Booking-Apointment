<template>
    <div class="phone-mockup-container">
        <div class="phone-mockup-phone">
            <div class="phone-mockup-content">
                <slot></slot>
            </div>
            <img src="@/assets/mockup-phone.png" alt="" class="phone-mockup-phone-img">
        </div>
    </div>
</template>

<style>
.phone-mockup-container{
    flex-grow: 1;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: greens;
    font-family: var(--preview-font);
}
.phone-mockup-container .phone-mockup-phone{
    width: 100%;
    max-width: 280px;
    height: 75vw;
    overflow: auto;
    max-height: 600px;
    position: relative;
}
.phone-mockup-phone-img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 99;
}

.phone-mockup-content{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 34px);
    background-color: #fff;
    padding: 0 18px;
    margin: 18px 0;
    overflow: auto;
}
.phone-mockup-content::-webkit-scrollbar{
    width: 0;
}

.phone-container{
    padding: 0 1em;
}
</style>