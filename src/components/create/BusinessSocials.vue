<template>
    <div>
        <p class="title">Add Social Links</p>
        <table class="business-info-form-table">
            <tr>
                <td>Website</td>
                <td>
                    <input placeholder="menulab.com" class="create-form-input" v-model="socials.website" />
                </td>
            </tr>
            <tr>
                <td>Instagram</td>
                <td>
                    <input placeholder="instagram.com/menulab" class="create-form-input" v-model="socials.instagram" />
                </td>
            </tr>
            <tr>
                <td>Facebook</td>
                <td>
                    <input placeholder="facebook.com/menulab" class="create-form-input" v-model="socials.facebook" />
                </td>
            </tr>
            <tr>
                <td>YouTube</td>
                <td>
                    <input placeholder="youtube.com/c/menulab" class="create-form-input" v-model="socials.youtube" />
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    data(){
        let socials = {
            website: "",
            instagram: "",
            facebook: "",
            youtube: ""
        }
        const saved = this.$store.state.businessInfo.socials
        if(saved){
            socials = saved
        }

        return {
            socials
        }
    },

    watch: {
        socials: {
            handler(){ 
                this.$store.commit("updateSocials", this.socials)
            },
            deep: true
        }
    }
}
</script>

<style>
.business-info-form-table, .business-info-form-table > *{
    display: block;
    width: 100%;
}
.business-info-form-table tr{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
}
.business-info-form-table tr:not(:last-child){
    margin-bottom: 1em;
}
.business-info-form-table tr td:first-child{
    min-width: 100px;
    margin-right: 1em;
    text-align: right;
}
.business-info-form-table tr td:last-child{
    flex-grow: 1;
}
.business-info-form-table .required-indicator{
    color: rgb(226, 8, 8);
}
</style>