<template>
    <div>
        <div class="menu-item">
            <div class="menu-content d-flex align-left flex-column">
                <div class="menu-item__title font-libre">
                    {{item.name}}    
                </div>
                <p class="menu-item__info">{{item.description.length > 40 ? item.description.substr(0, 37) + '...' : item.description}}</p>
                <div class="menu-item__meta">
                    <p class="menu-item__icons d-flex flex-wrap">
                        <span
                        data-toggle="tooltip"
                        data-placement="top"
                        v-for="(icon, index) in item.tags"
                        :key="index"
                        :title="svgIcons[icon] ? svgIcons[icon].text : ''"
                        v-html="svgIcons[icon] ? svgIcons[icon].icon : ''"
                        >
                        </span>
                    </p>
                    <p class="menu-item__price">{{currencySymbol}}{{(item.price || 0).toFixed(2)}}</p>
                </div>
            </div>
            <div class="menu-img" v-if="item.image">
                <img :src="item.image" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import svgIcons from '@/shared/svgIcons'

export default {
    props: ['item'],
    data: () => ({
        svgIcons
    }),
    computed: {
        currencySymbol() {
            const currencySymbols = {
                usd: "$",
                eur: "€",
                gbp: "£",
                cad: "$",
                aud: "$",
                nzd: "$",
            };
            const cur = this.$store.state.businessInfo.currency
            // this.$store.commit("updateCurrency", currencySymbols[cur] || "$");
            return currencySymbols[cur] || "$";
        }
    }
}
</script>

<style>
.menu-item{
    /* border: 1px solid rgb(145, 145, 145); */
    border-radius: 10px;
    /* overflow: hidden; */
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

    height: 140px;
    display: flex;
    position: relative;
}
.menu-item:hover,
.menu-item.active{
    background-color: rgba(0, 0, 0, 0.05);
    cursor: pointer;
}
.menu-content{
    padding: 1em;
    width: 60%;
    flex-grow: 1;
}
.menu-img{
    width: 40%;
    height: 100%;
    overflow: hidden;
}
.menu-img img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 0 10px 10px 0;
}


.menu-item__title{
    font-size: .9em;
}
.menu-item__info{
    font-size: .8em;
    line-height: 1.1;
    color: rgb(114, 114, 114);
    margin: .5em 0
}

.menu-item__meta{
    margin-top: auto;
}
.menu-item__meta p{
    margin: 0;
}
.menu-item__meta .menu-item__price{
    font-size: .95em;
    color: rgb(114, 114, 114);
    margin-top: 0;
}
.menu-item__meta .menu-item__icons{
    margin-top: 0;
    gap: .2em;
}
.menu-item__meta .menu-item__icons svg{
    height: 22px;
    width: 22px;
}
.menu-item__special-badge{
    background-color: var(--primary-color);
    color: #fff;
    height: 22px;
    line-height: 22px;
    padding: 0 .75em;
    padding-right: .9em;
    border-radius: 20px;
    font-size: .8em;
    display: inline-block;
    width: fit-content;
    margin-top: .25em;
}
</style>