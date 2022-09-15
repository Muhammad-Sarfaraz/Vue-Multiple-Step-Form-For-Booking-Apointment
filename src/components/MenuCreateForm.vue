<template>
    <div class="menu-create-form">
        <div class="form">
            <MenuCreateProgress
             :progress="progress"
             :currentStep="formIdx[0]"
            />
            <div class="form-content">
                <keep-alive>

                    <component
                    :is="formComponent"
                    @next="nextSlide"
                    @allowNext="allowNext = true"
                    @disallowNext="allowNext = false"
                    @skipToSignup="skipToSignup"
                    />
                </keep-alive>
            </div>
            <div class="form-footer">
                <button class="btn txt" v-if="formIdx[0] > 0 || formIdx[1] > 0" @click="prevSlide">
                    <i class="bi bi-arrow-left"></i>
                    <span>Back</span>
                </button>
                <button :disabled="!allowNext" class="btn" @click="nextSlide">
                    <span>Next</span>
                </button>
            </div>
        </div>
        <div class="preview">
            <component :is="mockupComponent" />
        </div>
    </div>
    <div class="form-complete" v-if="formComplete">
        <FinishMockup
         @signup="handleSignup"
         @back="handleBack"
        />
        <SignupForm
         v-if="showSignupFrom"
         @close="showSignupFrom = false"
        />
    </div>
</template>

<script>
import MenuCreateProgress from '@/components/MenuCreateProgress'
import SignupForm from '@/components/SignupForm'

import BusinessType from '@/components/create/BusinessType'
import BusinessName from '@/components/create/BusinessName'
// import BusinessInfo from '@/components/create/BusinessInfo'
import BusinessLogo from '@/components/create/BusinessLogo'
import BusinessBanner from '@/components/create/BusinessBanner'
// import BusinessUber from '@/components/create/BusinessUber'
import BusinessCategories from '@/components/create/BusinessCategories'
import BusinessItems from '@/components/create/BusinessItems'
import BusinessSocials from '@/components/create/BusinessSocials'
import BusinessFonts from '@/components/create/BusinessFonts'
import BusinessEmployees from '@/components/create/BusinessEmployees'

import LogoMockup from '@/components/mockups/LogoMockup'
import MenuMockup from '@/components/mockups/MenuMockup'
import FontsMockup from '@/components/mockups/FontsMockup'
import BannerMockup from '@/components/mockups/BannerMockup'
import ItemsMockup from '@/components/mockups/ItemsMockup'
import FinishMockup from '@/components/mockups/FinishMockup'
import SocialMockup from '@/components/mockups/SocialMockup'
import BusinessNameMockup from '@/components/mockups/BusinessNameMockup'

function map(val, in_min, in_max, out_min, out_max) {
    return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

export default {
    components: {
        MenuCreateProgress,
        FinishMockup,
        SignupForm
    },
    data(){
        const formIdx = this.$store.state.businessInfo.formIdx
        return {
            showSignupFrom: false,
            forms: [
                [
                    BusinessType,
                    BusinessName
                ],
                [
                    BusinessLogo,
                    BusinessBanner,
                    BusinessFonts
                ],
                [
                    BusinessCategories,
                    BusinessItems,
                    BusinessEmployees
                ],
                [
                    BusinessSocials
                ]
            ],
            mockups: [
                [
                    LogoMockup,
                    BusinessNameMockup
                ],
                [
                    BannerMockup,
                    BannerMockup,
                    FontsMockup
                ],
                [
                    ItemsMockup,
                    ItemsMockup,
                    ItemsMockup
                ],
                [
                    SocialMockup
                ]
            ],
            formIdx: formIdx || [0, 0],
            allowNext: true,
            formComplete: false
        }
    },
    watch: {
        formIdx: {
            handler(val) {
                this.$store.state.businessInfo.formIdx = val
            },
            deep: true
        },
    },
    methods: {
        nextSlide(){
            let i = this.formIdx[0]
            let j = this.formIdx[1]
            if(j < this.forms[i].length - 1){
                this.formIdx[1]++
            }else{
                if(i < this.forms.length - 1){
                    this.formIdx[0]++
                    this.formIdx[1] = 0
                }else{
                    this.formComplete = true
                    console.log(this.$store.state.businessInfo);
                }
            }
        },
        prevSlide(){
            this.allowNext = true
            let i = this.formIdx[0]
            let j = this.formIdx[1]
            if(j > 0){
                this.formIdx[1]--
            }else{
                if(i > 0){
                    this.formIdx[0]--
                    this.formIdx[1] = this.forms[i - 1].length - 1
                }
            }
        },
        skipToSignup(){
            this.formComplete = true
        },
        handleSignup(){
            this.showSignupFrom = true
        },
        handleBack(){
            this.formComplete = false
            // this.formIdx = [0, 0]
        }
    },
    computed: {
        progress(){
            let i = this.formIdx[0]
            let j = this.formIdx[1]

            if(i == this.forms.length - 1 && j == this.forms[i].length - 1){
                return 100
            }

            let a = i * 33.33
            let b = map(j, 0, this.forms[i].length - 1, 0, 33.33)

            return a + b
        },
        formComponent(){
            return this.forms[this.formIdx[0]][this.formIdx[1]]
        },
        mockupComponent(){
            return this.mockups[this.formIdx[0]][this.formIdx[1]]
        }
    }
}
</script>

<style>
.menu-create-form{
    display: flex;
    flex-wrap: wrap;
    gap: 4em;
    --progress-height: 100px;
    --form-footer-height: 60px;
}
.menu-create-form > div{
    flex: 1;
}
.menu-create-form .form-content{
    height: calc(100% - (var(--progress-height) + var(--form-footer-height)));
    overflow: auto;
    padding-bottom: 2em;
}
.menu-create-form .form-content::-webkit-scrollbar {
    width: 10px;
}
.menu-create-form .form-content::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.menu-create-form .form-content::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--primary-color); 
}

.menu-create-form, .menu-create-form > div{
    height: 100%;
    overflow: auto;
}
.menu-create-form .preview{
    display: flex;
    flex-direction: column;
}
.preview-text{
    font-size: 1.1em;
    color: rgb(131, 131, 131);
    font-weight: 500;
}


.form-content{
    padding: 0 1em;
}
.form-content .title{
    font-size: 1.5em;
    color: rgb(56, 56, 56);
    font-weight: 500;
    margin-bottom: 2em;
}

.form-footer{
    height: var(--form-footer-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
}
.form-footer .btn:last-child{
    margin-left: auto;
}


.create-form-input{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    
    display: block;
    width: 100%;
    background-color: rgb(236, 235, 235);
    padding: .75em;
    border-radius: 5px;
    border: 3px solid rgb(236, 235, 235);
    transition: border .5s;
    font-size: 1.1em;
}
.create-form-input:focus{
    border: 3px solid var(--primary-color);
}




.form-complete .text{
    text-align: center;
    margin-top: .5em;
}
.form-complete .phone-mockup-container,
.form-complete .phone-mockup-container > div{
    min-height: 600px;
}



@media(max-width: 768px){
    .menu-create-form{
        --progress-height: 50px;
    }
    .menu-create-form .preview{
        display: none;
    }
}
</style>