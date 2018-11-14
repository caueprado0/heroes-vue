<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
  <b-navbar-brand href="">Heroes VUE</b-navbar-brand>
  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-collapse is-nav id="nav_collapse">
    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-item href="#">Login</b-nav-item>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
</template>

<script>
import 'font-awesome/css/font-awesome.css'

export default {
  name: 'TopNavBar'
}
</script>

<style>

</style>
