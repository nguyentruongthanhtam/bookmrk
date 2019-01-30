<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="warning"
      >
        <q-toolbar-title @click.native="$router.replace('/')" class="text-primary">Bookmrk</q-toolbar-title>
      <q-btn
        flat dense
        label="Logout"
        class="text-negative"
        @click="logout"
        v-show="this.$store.getters['bookmark/isLogged']"
      />
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
      overlay
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Navigation</q-list-header>
        <q-item @click.native="$router.push('/items')">
          <q-item-side icon="bookmark" />
          <q-item-main label="Items" sublabel="show items view" />
        </q-item>
        <q-item @click.native="$router.push('/links')">
          <q-item-side icon="link" />
          <q-item-main label="Links" sublabel="show links view" />
        </q-item>
        <q-item @click.native="$router.push('/weather')">
          <q-item-side icon="wb_sunny" />
          <q-item-main label="Weather" sublabel="5 cities weather" />
        </q-item>
        <q-item @click.native="$router.push('/admin')" class="bg-warning" v-show="this.$store.getters['bookmark/isLogged']">
          <q-item-side icon="link" />
          <q-item-main label="Admin" sublabel="Admin page" />
        </q-item>
        <q-item @click.native="$router.push('/add')" class="bg-warning" v-show="this.$store.getters['bookmark/isLogged']">
          <q-item-side icon="school" />
          <q-item-main label="Add" sublabel="Add new bookmark" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container class="text-tertiary">
      <router-view />
    </q-page-container>
    <q-btn
      round
      color="primary"
      @click="leftDrawerOpen = !leftDrawerOpen"
      icon="menu"
      class="fixed"
      style="right: 18px; bottom: 18px"
    />
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL,
    logout()
    {
      this.$store.dispatch('bookmark/logout').then(result=>{
        if(result){
          this.$router.replace('/');
          this.$q.notify({message: 'See ya!',
                  type: 'warning',
                  color: 'warning',
                  timeout: 2000
                })
        }
      });
    },
  }
}
</script>

<style>
</style>
