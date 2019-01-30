<template>
  <div class="col-md-5 col-lg-4 col-xl-3 col-sm-11 full-width" style="min-height:300px; ">
    <q-card inline class="fit no-margin">
      <q-card-media class="flex flex-center" style="height:280px;">
        <span class="text-primary absolute-top-left q-pa-md text-weight-bold">{{item.brand}}</span>
        <img class="q-pa-xs" :src="item.imgURL" @click="openURL(item.itemURL)" >
      </q-card-media>
      <q-card-title style='height: 180px width: 100%'>
          <span class="subheading text-weight-bold text-secondary" slot="subtitle">{{item.name}}</span>
          <div slot="right" class="row items-center">
          <q-icon name="attach_money" /> <span class="q-headline" text-color="red">{{item.price}}</span>
          </div>
      </q-card-title>
    <q-card-separator />
    <q-card-main class="relative-position">
      <q-scroll-area style="width: auto; height: 100px;">
        {{item.itemDescription}}
      </q-scroll-area>
    </q-card-main>
  </q-card>
  </div>
</template>

<style>
</style>

<script>
import { openURL } from 'quasar'

export default {
  name: 'Item',
  props: ['item'],
  data () {
    return {
    }
  },
  methods: {
    openURL
  }
}
</script>
