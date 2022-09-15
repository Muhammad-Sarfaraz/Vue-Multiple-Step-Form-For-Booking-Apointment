<template>
  <div class="app">
    <Navbar />
    <div class="main-content">
      <MenuCreateForm />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import MenuCreateForm from '@/components/MenuCreateForm'
import fonts from '@/shared/fonts.json'

export default {
  components: {
    Navbar,
    MenuCreateForm
  },
  created() {
    this.$store.commit('loadBusinessInfo')
  },
  mounted(){
    const data = this.$store.state.businessInfo.fonts
    if(!data) return
    const font = fonts.find(item => item.fonts[1] == data)
    if(!font) return
    document.documentElement.style.setProperty('--preview-font', font.fonts[0])
  },
  watch: {
    '$store.state.businessInfo': {
      handler(){
        this.$store.commit('saveBusinessInfo')
      },
      deep: true
    }
  }
}
</script>

<style>
.app{
  height: 100%;
}
.app .main-content{
  height: calc(100% - var(--navbar-height));
  overflow: auto;
  padding: 2em var(--container-px);

}
</style>