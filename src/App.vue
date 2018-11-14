<template>
  <div id="main">
    <TopNavBar></TopNavBar>
    <b-container>
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import TopNavBar from './components/Layout/TopNavBar.vue'

export default {
  name: 'App',
  components: {
    TopNavBar
  }
}
</script>

<style scoped>
#main {
  height: 100vh;
}
.container {
  min-height: 100%;
  height: 100%;
}
</style>
