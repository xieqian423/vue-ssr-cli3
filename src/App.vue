<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
import titleMixin from './title-mixin'
export default {
  name: 'App',
  mixins: [titleMixin],
   data () {
    return {
      title: 'item title'
    }
  },
  title () {
    // return (this.item && this.item.title) ? this.item.title : 'not found title'
    return 'item-title1'
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
