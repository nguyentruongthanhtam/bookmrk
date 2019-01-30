<template>
  <q-page padding class="flex flex-center">
    <!-- content -->
    <div class="col-12 col-md-8 col-lg-6">
    <q-tabs v-model="selectedTab" position="top" inverted>
      <q-tab slot="title" name="Item" icon="bookmark" label="Item"/>
      <q-tab slot="title" name="Link" icon="link" label="Link"/>
      <!-- Item Tab -->
      <q-tab-pane name="Item">
        <item-form :isAdd="true" :item="item" ></item-form>
      </q-tab-pane>
      <!-- Link Tab -->
      <q-tab-pane name="Link">
        <link-form :isAdd="true" :link="link" ></link-form>
      </q-tab-pane>
    </q-tabs>
  </div>
  </q-page>
</template>

<script>
import itemForm from '../components/itemForm.vue'
import linkForm from '../components/linkForm.vue'
export default {
  // name: 'PageName',
  components: { itemForm, linkForm },
  data () {
    return {
      loading: false,
      selectedTab: 'Item',
      item: {
        name: '',
        itemType: '',
        brand: '',
        itemURL: '',
        itemDescription: '',
        imgURL: '',
        price: '',
        sale: ''
      },
      link: {
        name: '',
        linkType: '',
        url: '',
        linkAbout: '',
        linkLogo: '',
        linkLocation: ''
      }
      // Item Page Variables
    }
  },
  methods:
  {
  }
}
</script>

<style>
</style>
