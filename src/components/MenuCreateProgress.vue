<template>
    <div class="menu-create-progress">
        <div class="progress-bar">
            <div class="progress" :style="{width: progress + '%'}"></div>
        </div>
        <div class="progress-stops">
            <div class="progress-stop"
             v-for="(stop, index) in progressStops"
             :key="index"
             :class="{active: index <= currentStep}"
            >
                <div class="sl">
                    <span>{{index + 1}}</span>
                    <div class="text">
                        {{stop}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['progress', 'currentStep'],
    data: () => ({
        progressStops: ['Info', 'Design', 'Content', 'Social']
    })
}
</script>

<style>
.menu-create-progress{
    height: var(--progress-height);
    position: relative;
}
.progress-bar{
    height: 10px;
    background-color: #c0c0c0;
    border-radius: 10px;
    position: absolute;
    width: 100%;
    top: 20px;
    transform: translateY(-50%);
    left: 0;
}
.progress-bar .progress{
    height: 100%;
    width: 0;
    background-color: var(--primary-color);
    border-radius: 10px;
    transition: width 0.5s;
}
.progress-stops{
    display: flex;
    justify-content: space-between;
}
.progress-stop .sl{
    height: 40px;
    width: 40px;
    font-size: 23px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #c0c0cc;
    border-radius: 50%;
    color: #fff;
    position: relative;
}
.progress-stop .sl .text{
    text-align: center;
    color: #000;
    font-size: 12px;
    font-weight: 600;
    position: absolute;
    top: 45px;
    left: 50%;
    transform: translateX(-50%);
}
.progress-stop .sl:first-child .text{
    /* left: 60%; */
}
.progress-stop.active .sl{
    background-color: var(--primary-color);
}

@media(max-width: 768px){
    .progress-stop .sl{
        display: none;
    }
    .progress-bar{
        top: 0;
        transform: translateY(0);
    }
}
</style>