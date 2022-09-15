<template>
    <div>
        <p class="title">Provide business information</p>
        <table class="business-info-form-table">
            <tr>
                <td>Address</td>
                <td>
                    <input placeholder="Address" class="create-form-input" v-model="info.address" />
                </td>
            </tr>
            <tr>
                <td>City</td>
                <td>
                    <input placeholder="City" class="create-form-input" v-model="info.city" />
                </td>
            </tr>
            <tr>
                <td>Country</td>
                <td>
                    <input placeholder="Country" class="create-form-input" v-model="info.country" />
                </td>
            </tr>
            <tr>
                <td>State</td>
                <td>
                    <input placeholder="State" class="create-form-input" v-model="info.state" />
                </td>
            </tr>
            <tr>
                <td>Zipcode</td>
                <td>
                    <input placeholder="Zipcode" class="create-form-input" v-model="info.zipcode" />
                </td>
            </tr>
            <tr>
                <td>
                    Phone Number
                </td>
                <td>
                    <input placeholder="Phone Number" class="create-form-input" v-model="info.phone" />
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    data: () => ({
        info: {
            address: "",
            city: "",
            country: "",
            state: "",
            zipcode: "",
            phone: ""
        }
    }),
    watch: {
        info: {
            handler(){
                this.$store.state.businessInfo.info = this.info
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