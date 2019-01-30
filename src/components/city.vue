<template>
  <div class="col-11 col-md-5 col-lg-4">
    <q-card class="no-margin"
    inline style="min-height: 500px;" >
      <q-card-media>
        <img :src="city.image" style="height: 300px">
        <h4 class="text-weight-bold text-white absolute-top-right q-px-lg">{{city.name}}</h4>
      </q-card-media>
      <q-card-title>
        <h2 class="text-weight-bold">{{city.temp}}°C</h2> 
      </q-card-title>
      <q-card-main>
        <p class="text-faded q-subheading">Highest Temperature: {{city.hTemp}}°C</p>
        <p class="text-faded q-subheading">Lowest Temperature: {{city.lTemp}}°C</p>
      </q-card-main>
      <q-card-separator />
      <q-card-actions>
        <q-btn flat color="secondary" label="Refresh" @click="update()" />
        <div class="row items-center">
          <q-icon name="refresh" /> {{city.lastUpdate}}
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'city',
  props: ['city'],
  methods: {
    update (event) {
      this.$emit('updated')
    }
  }
}
</script>
