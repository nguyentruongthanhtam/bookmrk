<template>
  <q-page class="justify-center flex column items-center">
    <h4 class="text-primary row justify-center">Feature Products Bookmarked</h4>
    <transition-group
          appear
          tag="div"
          enter-active-class="animated animate-scale"
          leave-active-class="animated fadeOut"
          class="gutter-sm row q-pa-sm flex-center"
          style="max-width: 1400px"
        >
      <Item :item="item" v-for="(item,$index) in itemsArray" :key="$index" :style="{animationDelay: ($index*100)+'ms'} "></Item>
    </transition-group>
    <q-inner-loading :visible="loading">
      <q-spinner-gears size="50px" color="red"></q-spinner-gears>
    </q-inner-loading>
  </q-page>
</template>

<style>
</style>

<script>
import Item from '../components/Item.vue'
import axios from 'axios'
import Items from '../statics/Items.json'
export default {
  name: 'Items',
  components: {Item},
  data () {
    return {
      loading: false,
      titleName: 'Items Page',
      itemsArray: []
    }
  },
  methods: {
    getItems () {
      let url;
      const receivedArray = Items;
      this.loading = true
      // Fake loading effect when fetching data
      setTimeout(()=>{
        this.itemsArray = receivedArray;
        this.loading = false;
      },1000)
      // this.loading = true
      // axios.get(url).then(response => {
      //   this.itemsArray = response.data
      //   this.loading = false
      // }).catch(function (e) {
      //   console.log(e)
      // })
    }
  },
  mounted () {
    this.getItems()
  }
}
</script>
<style scoped>

</style>
