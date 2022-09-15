import { createStore } from 'vuex'

const STORAGE_KEY = 'v2store_business-info'

export default createStore({
    state: {
        businessInfo: {
            type: "",
            name: "",
            currency: "",
            info: {},
            logoSize: "2.5em",
            uberLink: "",
            logo: "/appointment/img/logo.png",
            banner: "/appointment/img/banner.jpg",
            bannerIdx: 0,
            categories: [],
            categoriesData: {},
            employees: [],
            items: {},
            socials: {},
            fonts: '',
            color: '',
            formIdx: [0, 0]
        }
    },
    getters: {
        getBusinessInfo(state) {
            return state.businessInfo
        }
    },
    mutations: {
        updateType(state, payload) {
            state.businessInfo.type = payload
        },
        updateName(state, payload) {
            state.businessInfo.name = payload
        },
        updateLogo(state, payload) {
            state.businessInfo.logo = payload
        },
        updateBanner(state, payload) {
            state.businessInfo.banner = payload
        },
        updateLogoSize(state, payload) {
            state.businessInfo.logoSize = payload
        },
        updateBannerSize(state, payload) {
            state.businessInfo.bannerSize = payload
        },
        updateFont(state, payload) {
            state.businessInfo.fonts = payload
        },
        updateCategories(state, payload) {
            state.businessInfo.categories = payload
        },
        updateItems(state, payload) {
            state.businessInfo.items[payload.category].push(payload.item)
        },
        deleteItem(state, payload) {
            state.businessInfo.items[payload.category].splice(payload.idx, 1)
        },
        updateCurrency(state, payload) {
            state.businessInfo.currency = payload
        },
        updateSocials(state, payload) {
            state.businessInfo.socials = payload
        },
        saveBusinessInfo(state) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.businessInfo))
        },
        loadBusinessInfo(state) {
            const data = JSON.parse(localStorage.getItem(STORAGE_KEY))
            if (!data) return
            state.businessInfo = data
        }
    },
    actions: {


    },
    modules: {

    }
})