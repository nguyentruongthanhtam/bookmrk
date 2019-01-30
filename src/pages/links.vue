<template>
  <q-page class="justify-center flex column items-center">
    <h4 class="text-primary row justify-center">Stores Links</h4>
    <transition-group
        appear
        tag="div"
        enter-active-class="animated animate-pop"
        leave-active-class="animated fadeOut"
        class="gutter-md row q-pa-sm flex-center "
        style="max-width: 1400px"
      >
      <Link v-for="(link,$index) in linksArray" :key="$index" :style="{animationDelay: ($index*100)+'ms'} "
          :link="link" />
    </transition-group>
    <q-inner-loading :visible="loading">
      <q-spinner-gears size="50px" color="yellow"></q-spinner-gears>
    </q-inner-loading>
  </q-page>
</template>

<style>
</style>

<script>
import Link from '../components/link.vue'
import axios from 'axios'
import Links from '../statics/Links.json'
export default {
  components: {Link},
  data () {
    return {
      titleName: 'Links Page',
      linksArray: [],
      loading: false
    }
  },
  methods: {
    getLinks () {
      let url;
      const ReceivedLinksArray = Links;
      this.loading = true
      // Fake loading effect when fetching data
      setTimeout(()=>{
        this.linksArray = ReceivedLinksArray;
        this.loading = false;
      },1000)
      // axios.get(url).then(response => {
      //   this.linksArray = response.data
      //   this.loading = false
      // }).catch(function (e) {
      //   console.log(e)
      // })
    }
  },
  mounted () {
    this.getLinks()
  }
}
</script>
