<template>
    <div>
        <p class="title" style="margin-bottom: .5em">Select your brand color</p>
        <div>
            <CustomColorPicker />
        </div>

        <p class="title mt-2">Select your fonts style</p>
        <div class="buniess-types-select">
            <div
             class="buniess-type"
             v-for="(font, index) in businessFonts"
             :key="index"
             :class="{ active: activeIdx == index }"
             @click="handleItemClick(index)"
             style="flex-direction: column; text-align: center"
            >
                <p class="preview-font-title" :style="{fontFamily: font.fonts[0]}" style="margin-bottom: .25em">{{font.titles[0]}} Title</p>
                <p class="preview-font-body" :style="{fontFamily: font.fonts[1]}">{{font.titles[1]}} Body</p>
            </div>
        </div>
    </div>
</template>

<script>
import CustomColorPicker from '@/components/CustomColorPicker'
import fonts from '@/shared/fonts.json'

export default {
    components: {
        CustomColorPicker
    },
    data(){
        const font = this.$store.state.businessInfo.fonts
        const businessFonts = fonts
        let activeIdx = -1

        if(font){
            const idx = businessFonts.findIndex(item => item.fonts[1] == font)
            activeIdx = idx
        }else{
            this.$emit('disallowNext')
        }

        return {
            color: '#59c7f9',
            businessFonts,
            activeIdx
        }
    },
    methods: {
        handleItemClick(index) {
            this.activeIdx = index
            this.$store.commit('updateFont',this.businessFonts[index].fonts[1]);
            document.documentElement.style.setProperty('--preview-font', this.businessFonts[index].fonts[0])
            this.$emit('allowNext')
        }
    }
}
</script>

<style>
.buniess-types-select{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2em;
}
.buniess-types-select .buniess-type{
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    padding: 2em 1em;
    border-radius: 10px;
    font-weight: 500;
    cursor: pointer;
    color: rgb(46, 46, 46);
    border: 3px solid #fff;
    transition: border .5s;
    display: flex;
    align-items: center;
    justify-content: center;
}
.buniess-types-select .buniess-type:hover,
.buniess-types-select .buniess-type.active{
    border: 3px solid var(--primary-color);
}
.buniess-types-select .buniess-type:last-child input{
    width: 100%;
    flex-grow: 1;
    margin-left: .5em;
    border: none;
    border-bottom: 2px solid rgb(96, 96, 96);
}
.preview-font-title{
    font-weight: 500;
}
.preview-font-body{
    font-weight: 400;
    font-size: .9em;
    color: rgb(97, 97, 97);
}
@media(max-width: 768px){
    .buniess-types-select{
        grid-template-columns: 1fr;
    }
}
</style>