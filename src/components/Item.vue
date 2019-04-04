<template>
  <div>
    <div>
      <span>{{ title }}11 33 44</span>
    </div>
  </div>
</template>

<script>
import titleMixin from '../title-mixin'
export default {
  mixins: [titleMixin],
  name:'item',
  data () {
    return {
      title: 'item title'
    }
  },
  title () {
    // return (this.item && this.item.title) ? this.item.title : 'not found title'
    return 'item-title'
  },

  asyncData ({ store, route }) {
    return store.dispatch('fetchItem', route.params.id)
  },
  computed: {
    item () {
      return this.$store.state.items[this.$route.params.id]
        // return {title: 'ssr item test'}
    }
  }
}
</script>

<style>

</style>