<template>
  <q-page padding>
    <!-- content -->
    <div class="col-xs-12 col-sm-12 col-md-9">
    <q-tabs v-model="selectedTab" position="top" inverted>
      <q-tab slot="title" color="secondary" name="Items" icon="bookmark" label="Items" @click="getItems"/>
      <q-tab slot="title" color="secondary" name="Links" icon="link" label="Links" @click="getLinks"/>
      <!-- Item Tab -->
      <q-tab-pane name="Items" :v-show="selectedTab == 'Items'">
        <h5>Items List</h5>
        <q-list  v-for="(item,$index) in items" :key="$index">
          <q-collapsible group="itemsGroup" icon="play_arrow" :label="item.name">
            <item-form :item="item" :id="$index" :isAdd="false" @ok="getItems"></item-form>
          </q-collapsible>
        </q-list>
        <q-inner-loading :visible="loading">
          <q-spinner-gears size="50px" color="red"></q-spinner-gears>
        </q-inner-loading>
      </q-tab-pane>
      <q-tab-pane name="Links" :v-show="selectedTab == 'Links'">
        <h5>Links List</h5>
        <q-list  v-for="(link,$index) in links" :key="$index">
          <q-collapsible group="linksGroup" icon="play_arrow" :label="link.name">
            <link-form :link="link" :id="$index" :isAdd="false" @ok="getLinks"></link-form>
          </q-collapsible>
        </q-list>
        <q-inner-loading :visible="loading">
          <q-spinner-gears size="50px" color="red"></q-spinner-gears>
        </q-inner-loading>
      </q-tab-pane>
    </q-tabs>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
import itemForm from '../components/itemForm.vue'
import linkForm from '../components/linkForm.vue'
import Links from '../statics/Links.json'
import Items from '../statics/Items.json'
export default {
  components: { itemForm, linkForm },
  data () {
    return {
      selectedTab: 'Items',
      loading: false,
      items: [],
      links: []
    }
  },
  methods: {
    getItems () {
      this.loading = true
    
      setTimeout(()=>{
        this.items = this.$store.getters['bookmark/items'];
        this.loading = false
      },0)

      // const url;
      // axios.get(url)
      //   .catch(error => {
      //     if (error.response) {
      //       this.$q.notify('Error' + error.response)
      //     }
      //   }).then((response) => {
      //     this.items = response.data
      //     this.loading = false
      //   })
    },
    getLinks () {
      this.loading = true
      setTimeout(()=>{
        this.links = this.$store.getters['bookmark/links']
        this.loading = false
      },0)
      // const url;
      // axios.get(url)
      //   .catch(error => {
      //     if (error.response) {
      //       this.$q.notify('Error' + error.response)
      //     }
      //   }).then((response) => {
      //     this.links = response.data
      //     this.loading = false
      //   })
    }
  },
  mounted () {
    this.getItems()
  }
}
</script>

<style>
</style>
