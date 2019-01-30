<template>
  <div class="col-md-4 col-lg-3 col-xs-11 col-sm-6 " style="min-height:200px;">
    <q-card class="fit no-margin" color="white" text-color="black" inline >
      <q-card-media class="flex flex-center" style="height: 200px">
        <img class="q-pa-md" :src="link.linkLogo?link.linkLogo : 'https://picsum.photos/200/300'" @click="openURL(link.url)">
      </q-card-media>
    <q-card-title style='height: 120px'>
        {{link.name}}
        <p class="q-subheading"><q-icon name="place"/>{{link.linkLocation}}</p>
        <div slot="right" class="row items-center"></div>
    </q-card-title>
    <q-card-separator />
    <q-card-main class="relative-position">
      <q-scroll-area style="width: 100%;height: 100px;">
        {{link.linkAbout}}
      </q-scroll-area>
    </q-card-main>
  </q-card>
  </div>
</template>

<script>
import { openURL } from 'quasar'
export default {
  name: 'Link',
  props: ['link'],
  data () {
    return {
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
