<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.$q.addressbarColor.set('#F2C037')
  }
}
</script>

<style>
</style>
