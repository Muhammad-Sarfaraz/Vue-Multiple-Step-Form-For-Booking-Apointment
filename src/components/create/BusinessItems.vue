<template>
  <div class="form">
    <p class="title">
      <span>Add services</span>
      <BusinessCurrency />
    </p>
    <p class="subtitle">
      Add at least one menu item to each category. You can add more or make
      edits later.
    </p>
    <div>
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="add-category-items"
      >
        <p class="category-title">{{ category }}</p>
        <div
          v-if="
            $store.state.businessInfo.items[category] &&
            $store.state.businessInfo.items[category].length
          "
          class="add-category-items__items-container"
        >
          <div
            class="item-preview"
            v-for="(item, idx) in $store.state.businessInfo.items[category]"
            :key="idx"
          >
            <div class="info">
              <p class="name">{{ item.name }}</p>
              <p class="description">{{item.description.length > 40 ? item.description.substr(0, 37) + '...' : item.description}}</p>
              <p class="price" v-if="item.price">
                {{ currencySymbol }}{{ item.price }}
              </p>
              <div class="actions">
                <EditItemBtn
                 :category="category"
                 :itemId="idx"
                 :currencySymbol="currencySymbol"
                />
                <span class="action-btn delete" @click="deleteItem(category, idx)">
                  <i class="bi bi-trash"></i>
                </span>
              </div>
            </div>
            <div class="img" v-if="item.image">
              <img :src="item.image" alt="" />
            </div>
          </div>
        </div>
        <AddItemBtn
          :key="index"
          @add="(data) => addItem(data, category)"
          :currencySymbol="currencySymbol"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BusinessCurrency from "@/components/create/BusinessCurrency";
import AddItemBtn from "@/components/create/AddItemBtn";
import EditItemBtn from "@/components/create/EditItemBtn";

export default {
  components: {
    AddItemBtn,
    BusinessCurrency,
    EditItemBtn
  },
  computed: {
    categories() {
      return this.$store.state.businessInfo.categories;
    },
    allowNext() {
      let items = this.$store.state.businessInfo.items;
      let categories = this.$store.state.businessInfo.categories;
      for (let category of categories) {
        if (!items[category] || !items[category].length) {
          return false;
        }
      }
      return true;
    },
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
    },
  },
  watch: {
    allowNext() {
      if (this.allowNext) {
        this.$emit("allowNext");
      } else {
        this.$emit("disallowNext");
      }
    },
  },
  methods: {
    addItem(item, category) {
      if (!this.$store.state.businessInfo.items[category]) {
        this.$store.state.businessInfo.items[category] = [];
      }
      var data = {
        category: category,
        item: item,
      };
      this.$store.commit("updateItems", data);
    },
    deleteItem(category, idx) {
      this.$store.commit("deleteItem", { category, idx });
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
  gap: 0.5em;
  flex-wrap: wrap;
  justify-content: space-between;
}
.title select {
  padding: 0.25em;
  height: auto;
  width: auto;
  flex-grow: 0;
  flex-shrink: 1;
  font-size: 0.8em;
}

.add-category-items__items-container{
  background-color: transparent;
}
</style>

<style>
.add-category-items {
  padding: 1.5em;
  background-color: rgb(239, 239, 239);
  margin-bottom: 2em;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.add-category-items .category-title {
  font-size: 1.5em;
  color: rgb(56, 56, 56);
  font-weight: 500;
  margin-bottom: 1em;
}
.add-category-items .btn {
  border-radius: 5px;
  font-size: 1em;
}

.item-preview {
  display: flex;
  min-height: 100px;
  border: 1px solid #000;
  background-color: #fff;
  overflow: hidden;
}
.add-category-items__items-container .item-preview:not(:last-child) {
  margin-bottom: 1.5em;
}
.item-preview .img {
  width: 40%;
  overflow: hidden;
}
.item-preview .img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.item-preview .info {
  padding: 1em;
  flex-grow: 1;
  position: relative;
}
.item-preview .info .name {
  font-weight: 500;
}
.item-preview .info .description {
  color: rgb(131, 131, 131);
  font-size: 0.9em;
  margin: 0.25em 0;
}
.item-preview .info .actions{
  position: absolute;
  bottom: 0;
  left: 0;
  padding: .5em;
  display: flex;
  gap: .5em;
}
.item-preview .info .action-btn {
  width: 2.5em;
  height: 2.5em;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: rgb(243, 13, 13);
  z-index: 2;
}
.item-preview .info .action-btn:hover {
  background-color: #f7f6f6;
}
.item-preview .info .action-btn.edit{
  color: var(--primary-color);
}
.item-preview:hover .info .action-btn {
  display: inline-flex;
}
.add-category-items__items-container{
  background: #fff;
  padding: .5em !important;
  margin-bottom: 1.5em;
}
</style>