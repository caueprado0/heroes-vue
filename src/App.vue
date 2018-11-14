<template>
  <div>
    <TopNavBar></TopNavBar>
    <router-view></router-view>
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

<style>

</style>
