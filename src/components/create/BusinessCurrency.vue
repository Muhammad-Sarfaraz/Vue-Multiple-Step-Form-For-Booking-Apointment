<template>
        <select v-model="currencyModel" class="create-form-input">
            <option value="">Select currency</option>
            <option
             v-for="(currency, index) in currencies"
             :key="index"
             :value="currency"
            >
                {{ currency.toUpperCase() }}
            </option>
        </select>
</template>

<script>
export default {
    data: () => ({
        currencies: ["usd", "eur", "gbp", "cad", "aud", "nzd"],
        currencyModel: "",
    }),
    mounted() {
        this.currencyModel = "gbp"
    },
    watch: {
        currencyModel(){
            this.$store.state.businessInfo.currency = this.currencyModel
        }
    }
}
</script>