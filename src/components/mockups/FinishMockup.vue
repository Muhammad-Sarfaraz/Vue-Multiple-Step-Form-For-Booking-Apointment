<template>
<div class="finished-mockup-wrapper">
  <PhoneMockUp>
    <div class="phone-screen-main finished-mockup">
      <div class="phone-navbar">
        <img :src="$store.state.businessInfo.logo" alt="" class="logo" />
        <i class="bi bi-list"></i>
      </div>
      <div class="phone-banner">
        <img :src="$store.state.businessInfo.banner" alt="" />
        <p>{{ $store.state.businessInfo.name }}</p>
      </div>
      <div class="phone-container">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="phone-items"
        >
          <p class="category-title">{{ category }}</p>
          <div
            v-if="
              $store.state.businessInfo.items[category] &&
              $store.state.businessInfo.items[category].length
            "
          >
            <div
              class="item-preview"
              v-for="(item, idx) in $store.state.businessInfo.items[category]"
              :key="idx"
            >
              <div class="info">
                <p class="name">{{ item.name }}</p>
                <p class="description">{{ item.description }}</p>
                <p class="price" v-if="item.price">${{ item.price }}</p>
              </div>
              <div class="img" v-if="item.image">
                <img :src="item.image" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="finished-cta-wrapper">
        <div>
          <h2>Your menu is ready!</h2>
          <p>Sign up to start using it</p>
          <p>
            <button @click="handleClick" v-if="signup" class="btn">Sign Up</button>
            <button @click="submitData" v-if="auth" class="btn">Submit</button>

          </p>
          <p class="mt-1">or</p>
          <p>
            <button @click="handleBack" class="btn bg-none pt-0"><u>Back to edit</u></button>
          </p>
        </div>
      </div>
    </div>
  </PhoneMockUp>
</div>
</template>
<script>
import PhoneMockUp from "@/components/PhoneMockUp"; 
export default {
  components: {
    PhoneMockUp,
  },
  data() {
    return {
       auth: false,
       signup: true,
       user:'',
    };
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get("auth")){
      this.auth = true;
      this.signup = false;
      this.user = JSON.parse(urlParams.get("user"));
    }
    
  }, 
  computed: {
    categories() {
      return this.$store.state.businessInfo.categories;
    },
    businessInfo() {
      return this.$store.state.businessInfo;
    },
  },
  methods: {
    handleClick() {
      this.$emit("signup")
    },
    handleBack() {
      this.$emit("back")
    },
    submitData(){
      this.axios.post('http://menulab-1.test/api/v1/signup?auth=true', { 
                user: this.user,
                data: this.businessInfo,
            })
            .then(response => {
                if(response.data.status === 'success') {
                    this.$toast.success('Data store successful'); 
                    this.$store.dispatch('removeBusinessInfo');
                    localStorage.removeItem('v2store_business-info');
                    window.location.href = 'http://menulab-1.test/';
                }
            }) 
    }
     
  },
};
</script>

<style>
.finished-mockup-wrapper{
  background: #fff;
  position: fixed;
  width: 100%;
  height: calc(100% - var(--navbar-height));
  top: var(--navbar-height);
  left: 0;
  z-index: 999;
}


.finished-mockup {
  position: relative;
  height: 100%;
  overflow: hidden;
  font-family: "Questrial", sans-serif;
}
.finished-cta-wrapper {
  z-index: 98;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(15px);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.finished-cta-wrapper > div {
  padding: 1em;
  text-align: center;
}
.finished-cta-wrapper > div h2 {
  margin-bottom: 0.5em;
}
.finished-cta-wrapper > div .btn {
  margin-top: 1em;
}
</style>